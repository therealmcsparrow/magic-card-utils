import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit@3.3.3/index.js?module";

function _padStr(n) {
  return " ".repeat(n);
}

function _dumpScalar(v, indent) {
  if (v === null || v === undefined) return "null";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number")
    return Number.isFinite(v) ? String(v) : JSON.stringify(String(v));
  if (typeof v === "string") {
    if (v === "") return '""';
    if (v.includes("\n")) {
      const trailing = v.endsWith("\n");
      const lines = (trailing ? v.slice(0, -1) : v).split("\n");
      const body = lines.map((l) => _padStr(indent + 2) + l).join("\n");
      return (trailing ? "|" : "|-") + "\n" + body;
    }
    const needsQuote =
      /^[\s'"&*!|>%@`#,?:{}\[\]]/.test(v) ||
      /[:#]\s/.test(v) ||
      /\s$/.test(v) ||
      /^(true|false|null|yes|no|on|off|~)$/i.test(v) ||
      /^-?\d+(\.\d+)?([eE][+-]?\d+)?$/.test(v);
    return needsQuote ? JSON.stringify(v) : v;
  }
  return JSON.stringify(v);
}

function _isComplex(v) {
  if (v === null || typeof v !== "object") return false;
  if (Array.isArray(v)) return v.length > 0;
  return Object.keys(v).length > 0;
}

function dumpYaml(value, indent = 0) {
  if (
    value === null ||
    value === undefined ||
    typeof value !== "object"
  ) {
    return _dumpScalar(value, indent);
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return value
      .map((item) => {
        if (item !== null && typeof item === "object" && !Array.isArray(item)) {
          const keys = Object.keys(item);
          if (keys.length === 0) return _padStr(indent) + "- {}";
          const parts = [];
          keys.forEach((k, i) => {
            const v = item[k];
            const prefix = i === 0 ? _padStr(indent) + "- " : _padStr(indent + 2);
            if (_isComplex(v)) {
              parts.push(prefix + k + ":");
              parts.push(dumpYaml(v, indent + 4));
            } else {
              parts.push(prefix + k + ": " + _dumpScalar(v, indent + 2));
            }
          });
          return parts.join("\n");
        }
        if (Array.isArray(item)) {
          if (item.length === 0) return _padStr(indent) + "- []";
          return _padStr(indent) + "-\n" + dumpYaml(item, indent + 2);
        }
        return _padStr(indent) + "- " + _dumpScalar(item, indent);
      })
      .join("\n");
  }
  const keys = Object.keys(value);
  if (keys.length === 0) return "{}";
  return keys
    .map((k) => {
      const v = value[k];
      if (_isComplex(v)) {
        return _padStr(indent) + k + ":\n" + dumpYaml(v, indent + 2);
      }
      return _padStr(indent) + k + ": " + _dumpScalar(v, indent);
    })
    .join("\n");
}

const CARD_TAG = "magic-card";
// Oldest `window.MagicCard.apiVersion` this panel works with. Magic Card versions without
// `window.MagicCard` predate the contract and are used as-is (feature-detected).
const MIN_MAGIC_CARD_API = 1;
const STUDIO_FILE = "magic-card-animation-studio.js";
const STUDIO_TAG = "magic-card-animation-studio";
const ANIMATION_ID_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;

/** The deep-linked animation (`?animation=<id>`), if the id is well formed. */
function _animationFromUrl() {
  try {
    const id = new URLSearchParams(window.location.search).get("animation");
    return id && ANIMATION_ID_RE.test(id) ? id : null;
  } catch (_err) {
    return null;
  }
}

/** The studio next to a magic-card.js URL (same directory and query), or null. */
function _studioUrlFor(cardUrl) {
  if (!cardUrl) return null;
  const m = /^(.*\/)magic-card\.js(\?.*)?$/.exec(cardUrl);
  return m ? `${m[1]}${STUDIO_FILE}${m[2] || ""}` : null;
}

class MagicCardUtilsPanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
      _templates: { type: Array, state: true },
      _error: { type: String, state: true },
      // template detail overlay
      _viewRow: { type: Object, state: true },
      _viewMode: { type: String, state: true }, // 'yaml' | 'edit'
      _previewError: { type: String, state: true },
      // edit mode state
      _editConfig: { type: Object, state: true },
      _editMeta: { type: Object, state: true }, // { name, description, card_type }
      // action dialog (edit/duplicate/delete)
      _actionMode: { type: String, state: true },
      _actionRow: { type: Object, state: true },
      _duplicateName: { type: String, state: true },
      _actionError: { type: String, state: true },
      _submitting: { type: Boolean, state: true },
      // animations tab
      _tab: { type: String, state: true }, // 'templates' | 'animations'
      _animStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _animMessage: { type: String, state: true },
      _animError: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this._templates = [];
    this._error = "";
    this._viewRow = null;
    this._viewMode = "yaml";
    this._previewEl = null;
    this._previewError = "";
    // edit mode
    this._editConfig = null;
    this._editMeta = { name: "", description: "", card_type: "" };
    // action dialog
    this._actionMode = "";
    this._actionRow = null;
    this._duplicateName = "";
    this._actionError = "";
    this._submitting = false;
    // animations tab
    this._selectedAnimation = _animationFromUrl();
    this._tab = this._selectedAnimation ? "animations" : "templates";
    this._animations = {};
    this._animStatus = "";
    this._animMessage = "";
    this._animError = "";
    this._studioEl = null;
  }

  _processTemplates(templates) {
    if (!templates) return [];
    return Object.entries(templates).map(([name, template]) => {
      const t = template && typeof template === "object" ? template : {};
      const description =
        typeof t.description === "string"
          ? t.description
          : t.description != null
          ? JSON.stringify(t.description)
          : "";
      const linked_cards =
        typeof t.linked_cards === "number" ? t.linked_cards : 0;
      const cfg =
        t.config && typeof t.config === "object" ? t.config : null;
      const card_type =
        typeof t.card_type === "string" && t.card_type
          ? t.card_type
          : cfg && typeof cfg.type === "string"
          ? cfg.type
          : "";
      return {
        name: String(name),
        description,
        linked_cards,
        card_type,
        created_at: typeof t.created_at === "string" ? t.created_at : "",
        last_updated:
          typeof t.last_updated === "string" ? t.last_updated : "",
        raw: t,
      };
    });
  }

  _openTemplate(row) {
    // updated() builds the preview once the overlay has rendered.
    this._viewRow = row;
    this._viewMode = "yaml";
    this._previewError = "";
    this._previewEl = null;
  }

  _openEditTemplate(row) {
    const source =
      row.raw && typeof row.raw === "object" && row.raw.config &&
      typeof row.raw.config === "object"
        ? JSON.parse(JSON.stringify(row.raw.config))
        : JSON.parse(JSON.stringify(row.raw || {}));
    this._viewRow = row;
    this._viewMode = "edit";
    this._editConfig = source;
    this._editMeta = {
      name: row.name,
      description: row.description || "",
      card_type: row.card_type || "",
    };
    this._previewError = "";
    this._previewEl = null;
  }

  _openStudio(row) {
    this._openEditTemplate(row);
    this._studioOnMount = true;
  }

  _getEditorConfig() {
    const cardType = this._viewRow?.card_type || this._editMeta.card_type;
    return {
      type: cardType || "custom:magic-card",
      ...(this._editConfig || {}),
    };
  }

  _onEditorConfigChanged(e) {
    // The editor already holds this config; don't remount it (that would close the studio).
    this._configFromEditor = true;
    this._editConfig = { ...e.detail.config };
  }

  async _buildPreview() {
    const host = this.shadowRoot.querySelector(".preview-host");
    if (!host) return;
    // A newer build may start while this one awaits the card; only the latest may render.
    const build = (this._previewBuild = (this._previewBuild || 0) + 1);
    host.innerHTML = "";
    this._previewEl = null;

    // In edit mode, the preview is the Magic Card editor itself
    if (this._viewMode === "edit") return;

    const config = this._viewRow?.raw?.config || this._viewRow?.raw || null;
    if (!config || typeof config !== "object") {
      this._previewError = "No config to preview.";
      return;
    }
    const card_type = this._viewRow?.card_type || "";
    const renderConfig =
      config.type
        ? config
        : card_type
        ? { type: card_type, ...config }
        : null;
    if (!renderConfig) {
      this._previewError =
        "No card type available — neither the config nor the template carries a `type`.";
      return;
    }
    // Card helpers only exist once a dashboard has loaded; magic-card can be built directly.
    const isMagicCard = renderConfig.type === "custom:magic-card";
    if (!isMagicCard && typeof window.loadCardHelpers !== "function") {
      this._previewError =
        "Lovelace card helpers are unavailable until a dashboard has been opened.";
      return;
    }
    try {
      let el;
      if (isMagicCard) {
        const status = await this._ensureMagicCard();
        if (!status.ok) throw new Error(status.message);
        el = document.createElement(CARD_TAG);
        el.setConfig(renderConfig);
      } else {
        const helpers = await window.loadCardHelpers();
        el = helpers.createCardElement(renderConfig);
      }
      if (build !== this._previewBuild) return;
      el.hass = this.hass;
      host.appendChild(el);
      this._previewEl = el;
      this._previewError = "";
    } catch (err) {
      if (build !== this._previewBuild) return;
      console.error("[magic_card_utils] preview failed", err);
      this._previewError =
        (err && (err.message || String(err))) || "Failed to render preview.";
    }
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this._previewEl && this.hass) {
      this._previewEl.hass = this.hass;
    }
    if (changedProps.has("hass") && this._studioEl && this.hass) {
      this._studioEl.hass = this.hass;
    }
    if (this._tab === "animations" && this.hass && !this._studioEl && this._animStatus === "") {
      this._mountAnimationStudio();
    }
    if (changedProps.has("_viewMode") || changedProps.has("_editConfig") || changedProps.has("_viewRow")) {
      const fromEditor =
        this._configFromEditor && !changedProps.has("_viewMode") && !changedProps.has("_viewRow");
      this._configFromEditor = false;
      if (this._viewMode === "edit") {
        if (!fromEditor) this.updateComplete.then(() => this._mountEditor());
      } else {
        this._unmountEditor();
        if (this._viewRow) {
          this.updateComplete.then(() => this._buildPreview());
        }
      }
    }
  }

  /**
   * Make sure the installed Magic Card is loaded and compatible.
   * Resolves to `{ ok: true }` or `{ ok: false, message }` with a message for the user.
   */
  async _ensureMagicCard() {
    if (!this._cardLoad) this._cardLoad = this._loadMagicCard();
    await this._cardLoad;
    if (!customElements.get(CARD_TAG)) {
      this._cardLoad = undefined; // allow a retry
      return {
        ok: false,
        message: this._magicCardUrl
          ? `Magic Card could not be loaded from ${this._magicCardUrl}.`
          : "Magic Card isn't installed. Install it from HACS and add it as a dashboard resource.",
      };
    }
    const api = window.MagicCard;
    if (api && !(Number(api.apiVersion) >= MIN_MAGIC_CARD_API)) {
      return {
        ok: false,
        message:
          `Magic Card ${api.version || ""} is too old for Magic Card Utils ` +
          `(needs API version ${MIN_MAGIC_CARD_API} or newer). Update Magic Card.`,
      };
    }
    return { ok: true };
  }

  async _loadMagicCard() {
    // Dashboard resources aren't loaded on custom panels, so load the installed Magic Card
    // from its dashboard resource URL. Importing that same URL shares the module with
    // dashboards (a second copy would collide on customElements.define).
    try {
      const resources = await this.hass.callWS({ type: "lovelace/resources" });
      const res = (resources || []).find((r) => /\/magic-card\.js(\?|$)/.test(r.url));
      this._magicCardUrl = res ? res.url : null;
    } catch (_err) {
      this._magicCardUrl = null;
    }
    if (customElements.get(CARD_TAG) || !this._magicCardUrl) return;
    try {
      await import(this._magicCardUrl);
    } catch (err) {
      console.error("[magic_card_utils] failed to load magic-card", this._magicCardUrl, err);
    }
  }

  async _mountEditor() {
    if (!this.shadowRoot.querySelector(".editor-host")) return;
    const status = await this._ensureMagicCard();
    let el = null;
    let message = status.message;
    if (status.ok) {
      try {
        // The card's own hook, so a lazily loaded editor works too.
        el = await customElements.get(CARD_TAG).getConfigElement();
      } catch (err) {
        console.error("[magic_card_utils] failed to create the Magic Card editor", err);
        message = "The Magic Card editor could not be loaded.";
      }
    }
    const host = this.shadowRoot.querySelector(".editor-host");
    if (!host || this._viewMode !== "edit") return;
    if (!el) {
      host.textContent = message;
      return;
    }
    el.hass = this.hass;
    const config = this._getEditorConfig();
    el.setConfig(config);
    el.addEventListener("config-changed", (e) => {
      this._onEditorConfigChanged(e);
    });
    host.innerHTML = "";
    host.appendChild(el);
    this._previewEl = el;
    if (this._studioOnMount) {
      this._studioOnMount = false;
      await el.updateComplete;
      if (typeof el.openStudio === "function") el.openStudio();
    }
  }

  _unmountEditor() {
    const host = this.shadowRoot.querySelector(".editor-host");
    if (host) host.innerHTML = "";
    this._previewEl = null;
  }

  _closeOverlay() {
    this._studioOnMount = false;
    this._viewRow = null;
    this._viewMode = "yaml";
    this._editConfig = null;
    this._editMeta = { name: "", description: "", card_type: "" };
    this._previewEl = null;
    this._previewError = "";
  }

  _onOverlayKeydown(e) {
    if (e.key === "Escape") this._closeOverlay();
  }

  async _saveEditedTemplate() {
    if (this._submitting) return;
    const meta = this._editMeta;
    const name = (meta.name || "").trim();
    if (!name) return;
    const payload = {
      type: "magic_card_utils/save_template",
      name,
      template: {
        config: this._editConfig,
        description: meta.description || "",
      },
    };
    if (meta.card_type) payload.card_type = meta.card_type;
    if (this._viewRow && name !== this._viewRow.name) payload.old_name = this._viewRow.name;
    this._submitting = true;
    try {
      await this.hass.callWS(payload);
      this._closeOverlay();
    } catch (err) {
      console.error("[magic_card_utils] save failed", err);
      this._actionError = (err && (err.message || err.code)) || "Save failed";
      this._submitting = false;
    }
  }

  _openDuplicate(row) {
    this._actionRow = row;
    this._duplicateName = this._uniqueCopyName(row.name);
    this._actionError = "";
    this._actionMode = "duplicate";
  }

  _openDelete(row) {
    this._actionRow = row;
    this._actionError = "";
    this._actionMode = "delete";
  }

  _closeAction() {
    this._actionMode = "";
    this._actionRow = null;
    this._duplicateName = "";
    this._actionError = "";
    this._submitting = false;
  }

  _uniqueCopyName(base) {
    const existing = new Set(this._templates.map((t) => t.name));
    let candidate = `${base} (copy)`;
    let i = 2;
    while (existing.has(candidate)) {
      candidate = `${base} (copy ${i})`;
      i += 1;
    }
    return candidate;
  }

  _onActionOverlayKeydown(e) {
    if (e.key === "Escape" && !this._submitting) this._closeAction();
  }

  async _submitDuplicate() {
    if (this._submitting) return;
    const row = this._actionRow;
    if (!row) return;
    const newName = (this._duplicateName || "").trim();
    if (!newName) {
      this._actionError = "Name is required.";
      return;
    }
    if (this._templates.some((t) => t.name === newName)) {
      this._actionError = `A template named '${newName}' already exists.`;
      return;
    }
    const raw = row.raw && typeof row.raw === "object" ? row.raw : {};
    const payload = {
      type: "magic_card_utils/save_template",
      name: newName,
      template: {
        config: raw.config,
        description: raw.description || "",
      },
    };
    if (row.card_type) payload.card_type = row.card_type;

    this._submitting = true;
    this._actionError = "";
    try {
      await this.hass.callWS(payload);
      this._closeAction();
    } catch (err) {
      console.error("[magic_card_utils] duplicate failed", err);
      this._actionError =
        (err && (err.message || err.code)) || "Duplicate failed";
      this._submitting = false;
    }
  }

  async _submitDelete() {
    if (this._submitting) return;
    const row = this._actionRow;
    if (!row) return;
    if (row.linked_cards > 0) {
      this._actionError = `Cannot delete — still linked to ${row.linked_cards} card(s).`;
      return;
    }
    this._submitting = true;
    this._actionError = "";
    try {
      await this.hass.callWS({
        type: "magic_card_utils/delete_template",
        name: row.name,
      });
      this._closeAction();
    } catch (err) {
      console.error("[magic_card_utils] delete failed", err);
      this._actionError =
        (err && (err.message || err.code)) || "Delete failed";
      this._submitting = false;
    }
  }

  firstUpdated() {
    this._subscribe();
  }

  // ---- Animations tab ----------------------------------------------------

  _setTab(tab) {
    if (this._tab === tab) return;
    this._tab = tab;
  }

  _onTabKeydown(e) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = this._tab === "templates" ? "animations" : "templates";
    this._setTab(next);
    this.updateComplete.then(() => {
      const btn = this.shadowRoot.querySelector(`.tab[data-tab="${next}"]`);
      if (btn) btn.focus();
    });
  }

  /**
   * Load Magic Card (for the live preview), then the studio from the same folder.
   * Resolves to `{ ok: true }` or `{ ok: false, message }`.
   */
  async _ensureAnimationStudio() {
    const status = await this._ensureMagicCard();
    if (!status.ok) return status;
    if (customElements.get(STUDIO_TAG)) return { ok: true };
    if (!this._studioLoad) {
      this._studioLoad = (async () => {
        const url = _studioUrlFor(this._magicCardUrl);
        if (!url) return;
        try {
          await import(url);
        } catch (err) {
          console.warn("[magic_card_utils] animation studio not loaded from", url, err);
        }
      })();
    }
    await this._studioLoad;
    if (!customElements.get(STUDIO_TAG)) {
      this._studioLoad = undefined; // allow a retry
      return {
        ok: false,
        message:
          `The animation studio could not be loaded. It ships with Magic Card as ${STUDIO_FILE}: ` +
          "update Magic Card to a version that includes it.",
      };
    }
    return { ok: true };
  }

  async _mountAnimationStudio() {
    if (this._studioEl || this._animStatus === "loading") return;
    this._animStatus = "loading";
    this._animMessage = "";
    try {
      await this._subscribeAnimations();
    } catch (err) {
      console.error("[magic_card_utils] animation library unavailable", err);
      this._animStatus = "error";
      this._animMessage = "The animation library could not be loaded.";
      return;
    }
    const status = await this._ensureAnimationStudio();
    if (!status.ok) {
      this._animStatus = "error";
      this._animMessage = status.message;
      return;
    }
    const el = document.createElement(STUDIO_TAG);
    el.hass = this.hass;
    el.library = { ...this._animations };
    el.selectedId = this._selectedAnimation;
    el.addEventListener("mc-anim-save", (e) => this._onStudioSave(e));
    el.addEventListener("mc-anim-duplicate", (e) => this._onStudioSave(e));
    el.addEventListener("mc-anim-delete", (e) => this._onStudioDelete(e));
    el.addEventListener("mc-anim-select", (e) => this._onStudioSelect(e));
    this._studioEl = el;
    this._animStatus = "ready";
    await this.updateComplete;
    this._attachStudio();
  }

  /** The studio element is kept across tab switches; put it (back) into the tab's host. */
  _attachStudio() {
    const host = this.shadowRoot.querySelector(".studio-host");
    if (!host || !this._studioEl || this._studioEl.parentNode === host) return;
    host.innerHTML = "";
    host.appendChild(this._studioEl);
  }

  /** Subscribe first, then fetch; changes that arrive during the fetch are applied after it. */
  _subscribeAnimations() {
    if (this._animReady) return this._animReady;
    let pending = [];
    const unsubPromise = this.hass.connection.subscribeMessage(
      (m) => (pending ? pending.push(m) : this._applyAnimationChange(m)),
      { type: "magic_card_utils/subscribe_animations" }
    );
    this._animUnsubPromise = unsubPromise;
    this._animReady = (async () => {
      try {
        await unsubPromise;
        const res = await this.hass.callWS({ type: "magic_card_utils/get_animations" });
        this._animations = (res && res.animations) || {};
        const queued = pending;
        pending = null;
        queued.forEach((m) => this._applyAnimationChange(m, false));
        this._pushLibrary();
      } catch (err) {
        pending = null;
        this._animUnsubPromise = undefined;
        this._animReady = undefined; // allow a retry
        Promise.resolve(unsubPromise)
          .then((u) => typeof u === "function" && u())
          .catch(() => {});
        throw err;
      }
    })();
    return this._animReady;
  }

  _applyAnimationChange(m, push = true) {
    if (!m || typeof m !== "object") return;
    if (m.action === "saved" && m.animation && typeof m.animation.id === "string") {
      this._animations = { ...this._animations, [m.animation.id]: m.animation };
    } else if (m.action === "deleted" && typeof m.id === "string") {
      if (!(m.id in this._animations)) return;
      const next = { ...this._animations };
      delete next[m.id];
      this._animations = next;
    } else if (m.action === "reset" && m.animations && typeof m.animations === "object") {
      this._animations = Array.isArray(m.animations)
        ? Object.fromEntries(m.animations.filter((d) => d && d.id).map((d) => [d.id, d]))
        : { ...m.animations };
    } else {
      return;
    }
    if (push) this._pushLibrary();
  }

  _pushLibrary() {
    if (this._studioEl) this._studioEl.library = { ...this._animations };
  }

  _wsErrorMessage(err, fallback) {
    if (!err) return fallback;
    const fields = Array.isArray(err.errors) ? err.errors : [];
    const detail = fields
      .map((f) => (f && f.path ? `${f.path}: ${f.message}` : f && f.message))
      .filter(Boolean)
      .join("; ");
    const base = err.message || err.code || fallback;
    return detail ? `${base} (${detail})` : base;
  }

  /**
   * `mc-anim-save` / `mc-anim-duplicate`, detail `{ animation }`. The WS promise is put on
   * `detail.result` (resolves with the stored document) so the studio can await it.
   */
  _onStudioSave(e) {
    const animation = e.detail && e.detail.animation;
    if (!animation || typeof animation !== "object") return;
    this._animError = "";
    const result = this.hass
      .callWS({ type: "magic_card_utils/save_animation", animation })
      .then((res) => res && res.animation);
    if (e.detail) e.detail.result = result;
    result.catch((err) => {
      console.error("[magic_card_utils] save animation failed", err);
      this._animError = this._wsErrorMessage(err, "The animation could not be saved");
    });
  }

  /** `mc-anim-delete`, detail `{ id }`. The WS promise is put on `detail.result`. */
  _onStudioDelete(e) {
    const id = e.detail && e.detail.id;
    if (typeof id !== "string" || !id) return;
    this._animError = "";
    const result = this.hass.callWS({
      type: "magic_card_utils/delete_animation",
      animation_id: id,
    });
    if (e.detail) e.detail.result = result;
    result.catch((err) => {
      console.error("[magic_card_utils] delete animation failed", err);
      this._animError = this._wsErrorMessage(err, "The animation could not be deleted");
    });
  }

  /** `mc-anim-select`, detail `{ id }` (or null): keeps `?animation=` in the URL in sync. */
  _onStudioSelect(e) {
    const id = e.detail && e.detail.id;
    this._selectedAnimation = typeof id === "string" && ANIMATION_ID_RE.test(id) ? id : null;
    try {
      const url = new URL(window.location.href);
      if (this._selectedAnimation) url.searchParams.set("animation", this._selectedAnimation);
      else url.searchParams.delete("animation");
      window.history.replaceState(window.history.state, "", url);
    } catch (_err) {
      // The deep link just isn't updated.
    }
  }

  _renderAnimationsTab() {
    if (this._animStatus === "ready") this.updateComplete.then(() => this._attachStudio());
    return html`
      ${this._animError
        ? html`<div class="error dismissable" role="alert">
            <span>${this._animError}</span>
            <button class="close-btn" title="Dismiss" @click=${() => (this._animError = "")}>&times;</button>
          </div>`
        : ""}
      ${this._animStatus === "loading" || this._animStatus === ""
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : ""}
      ${this._animStatus === "error"
        ? html`<div class="content">
            <div class="empty studio-message" role="alert">
              <div>${this._animMessage}</div>
              <button class="btn" @click=${() => this._mountAnimationStudio()}>Try again</button>
            </div>
          </div>`
        : ""}
      <div class="studio-host" ?hidden=${this._animStatus !== "ready"}></div>
    `;
  }

  _subscribe() {
    if (this._unsubPromise) return;
    try {
      this._unsubPromise = Promise.resolve(
        this.hass.connection.subscribeMessage(
          (message) => {
            console.debug("[magic_card_utils] templates update", message);
            this._templates = this._processTemplates(
              message && message.templates
            );
            this._error = "";
          },
          { type: "magic_card_utils/subscribe_templates" }
        )
      ).catch((err) => {
        console.error("[magic_card_utils] subscription failed", err);
        this._error =
          (err && (err.message || err.code)) || "Subscription failed";
        return null;
      });
    } catch (err) {
      console.error("[magic_card_utils] subscribeMessage threw", err);
      this._error = String(err);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    const animPending = this._animUnsubPromise;
    this._animUnsubPromise = undefined;
    this._animReady = undefined;
    this._studioEl = null;
    if (this._animStatus !== "error") this._animStatus = "";
    if (animPending) {
      Promise.resolve(animPending)
        .then((unsub) => {
          if (typeof unsub === "function") unsub();
        })
        .catch(() => {});
    }
    const pending = this._unsubPromise;
    this._unsubPromise = undefined;
    if (pending) {
      pending
        .then((unsub) => {
          if (typeof unsub === "function") unsub();
        })
        .catch(() => {});
    }
  }

  render() {
    if (!this.hass) {
      return html`<ha-circular-progress active></ha-circular-progress>`;
    }

    return html`
      <div class="header">
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <div class="title">${this.panel && this.panel.title}</div>
      </div>

      <div class="tabs" role="tablist" aria-label="Magic Card Utils" @keydown=${this._onTabKeydown}>
        ${[
          ["templates", "Templates"],
          ["animations", "Animations"],
        ].map(
          ([tab, label]) => html`<button
            class="tab"
            role="tab"
            data-tab=${tab}
            aria-selected=${this._tab === tab ? "true" : "false"}
            tabindex=${this._tab === tab ? "0" : "-1"}
            @click=${() => this._setTab(tab)}
          >
            ${label}
          </button>`
        )}
      </div>

      ${this._tab === "animations" ? this._renderAnimationsTab() : this._renderTemplatesTab()}
    `;
  }

  _renderTemplatesTab() {
    return html`
      ${this._error
        ? html`<div class="error">${this._error}</div>`
        : ""}

      <div class="content">
        ${this._templates.length === 0
          ? html`<div class="empty">No templates saved yet.</div>`
          : html`
              <table class="templates-table">
                <thead>
                  <tr>
                    <th class="col-name">Name</th>
                    <th class="col-type">Card Type</th>
                    <th class="col-linked">Linked Cards</th>
                    <th class="col-date">Created</th>
                    <th class="col-date">Last Updated</th>
                    <th class="col-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${this._templates.map(
                    (row) => html`
                      <tr>
                        <td class="col-name">
                          <span class="template-name">${row.name}</span>
                          ${row.description
                            ? html`<div class="secondary">
                                ${row.description}
                              </div>`
                            : ""}
                        </td>
                        <td class="col-type">${row.card_type || ""}</td>
                        <td>${row.linked_cards}</td>
                        <td>${this._formatDate(row.created_at)}</td>
                        <td>${this._formatDate(row.last_updated)}</td>
                        <td class="col-actions">
                          <div class="action-buttons">
                            <button
                              class="action-btn studio"
                              title="Open in studio"
                              @click=${() => this._openStudio(row)}
                            >
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"
                                />
                              </svg>
                            </button>
                            <button
                              class="action-btn edit"
                              title="Edit"
                              @click=${() => this._openTemplate(row)}
                            >
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
                                />
                              </svg>
                            </button>
                            <button
                              class="action-btn duplicate"
                              title="Duplicate"
                              @click=${() => this._openDuplicate(row)}
                            >
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
                                />
                              </svg>
                            </button>
                            <button
                              class="action-btn danger"
                              title=${row.linked_cards > 0
                                ? `Cannot delete — ${row.linked_cards} linked card(s)`
                                : "Delete"}
                              ?disabled=${row.linked_cards > 0}
                              @click=${() => this._openDelete(row)}
                            >
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                  d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            `}

      </div>

      ${this._viewRow
        ? html`
            <div
              class="overlay"
              @click=${this._closeOverlay}
              @keydown=${this._onOverlayKeydown}
              tabindex="-1"
            >
              <div
                class="dialog"
                role="dialog"
                aria-label=${this._viewMode === "edit" ? "Edit Template" : "Template Preview"}
                @click=${(e) => e.stopPropagation()}
              >
                <div class="dialog-header">
                  <div class="dialog-title">
                    <span class="dialog-title-name">${this._viewRow.name}</span>
                    ${this._viewRow.card_type
                      ? html`<span class="dialog-title-type">${this._viewRow.card_type}</span>`
                      : ""}
                  </div>
                  <div class="dialog-header-actions">
                    ${this._viewMode === "yaml"
                      ? html`<button class="action-btn" title="Edit" @click=${() => this._openEditTemplate(this._viewRow)}>
                          <svg viewBox="0 0 24 24"><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"/></svg>
                        </button>`
                      : ""}
                    <button class="close-btn" @click=${this._closeOverlay} title="Close">&times;</button>
                  </div>
                </div>
                <div class="dialog-body">
                  ${this._viewMode === "edit"
                    ? html`
                        <div class="pane metadata-pane">
                          <div class="pane-header">Template</div>
                          <div class="meta-body">
                            <label class="field">
                              <span class="field-label">Name</span>
                              <input class="field-input" type="text" .value=${this._editMeta.name}
                                @input=${(e) => (this._editMeta = { ...this._editMeta, name: e.target.value })} />
                            </label>
                            <label class="field">
                              <span class="field-label">Description</span>
                              <input class="field-input" type="text" .value=${this._editMeta.description}
                                @input=${(e) => (this._editMeta = { ...this._editMeta, description: e.target.value })} />
                            </label>
                            <label class="field">
                              <span class="field-label">Card Type</span>
                              <input class="field-input mono" type="text" placeholder="custom:magic-card" .value=${this._editMeta.card_type}
                                @input=${(e) => (this._editMeta = { ...this._editMeta, card_type: e.target.value })} />
                            </label>
                            <div class="meta-hint">Edit the card using the editor on the right. Its changes are captured live.</div>
                          </div>
                        </div>
                      `
                    : html`
                        <div class="pane yaml-pane">
                          <div class="pane-header">YAML</div>
                          <pre class="yaml-body">${dumpYaml(this._viewRow.raw && this._viewRow.raw.config ? this._viewRow.raw.config : this._viewRow.raw || {})}</pre>
                        </div>
                      `}
                  <div class="pane editor-pane">
                    <div class="pane-header">${this._viewMode === "edit" ? "Editor" : "Preview"}</div>
                    ${this._viewMode === "edit"
                      ? html`<div class="editor-host" @config-changed=${this._onEditorConfigChanged}></div>`
                      : html`
                          <div class="preview-wrap">
                            ${this._previewError ? html`<div class="preview-error">${this._previewError}</div>` : ""}
                            <div class="preview-host"></div>
                          </div>
                        `}
                  </div>
                </div>
                ${this._viewMode === "edit" ? html`
                  <div class="dialog-footer">
                    <button class="btn" @click=${this._closeOverlay}>Cancel</button>
                    <button class="btn primary" @click=${this._saveEditedTemplate} ?disabled=${this._submitting}>${this._submitting ? "Saving…" : "Save"}</button>
                  </div>
                ` : ""}
              </div>
            </div>
          `
        : ""}

      ${this._actionMode
        ? this._renderActionDialog()
        : ""}
    `;
  }

  _renderActionDialog() {
    const row = this._actionRow;
    if (!row) return "";
    return html`
      <div
        class="overlay"
        @click=${() => (this._submitting ? null : this._closeAction())}
        @keydown=${this._onActionOverlayKeydown}
        tabindex="-1"
      >
        <div
          class="dialog action-dialog"
          role="dialog"
          @click=${(e) => e.stopPropagation()}
        >
          <div class="dialog-header">
            <div class="dialog-title">
              <span class="dialog-title-name">
                ${this._actionMode === "duplicate"
                  ? "Duplicate template"
                  : "Delete template"}
              </span>
              <span class="dialog-title-type">${row.name}</span>
            </div>
            <button
              class="close-btn"
              @click=${this._closeAction}
              ?disabled=${this._submitting}
              title="Close"
            >
              &times;
            </button>
          </div>
          <div class="action-body">
            ${this._actionMode === "duplicate"
              ? this._renderDuplicateForm()
              : ""}
            ${this._actionMode === "delete"
              ? this._renderDeleteForm(row)
              : ""}
            ${this._actionError
              ? html`<div class="form-error">${this._actionError}</div>`
              : ""}
          </div>
          <div class="action-footer">
            <button
              class="btn"
              @click=${this._closeAction}
              ?disabled=${this._submitting}
            >
              Cancel
            </button>
            ${this._actionMode === "duplicate"
              ? html`<button
                  class="btn primary"
                  @click=${this._submitDuplicate}
                  ?disabled=${this._submitting}
                >
                  ${this._submitting ? "Duplicating…" : "Duplicate"}
                </button>`
              : ""}
            ${this._actionMode === "delete"
              ? html`<button
                  class="btn danger"
                  @click=${this._submitDelete}
                  ?disabled=${this._submitting || row.linked_cards > 0}
                >
                  ${this._submitting ? "Deleting…" : "Delete"}
                </button>`
              : ""}
          </div>
        </div>
      </div>
    `;
  }

  _renderDuplicateForm() {
    return html`
      <label class="field">
        <span class="field-label">New template name</span>
        <input
          class="field-input"
          type="text"
          .value=${this._duplicateName}
          @input=${(e) => (this._duplicateName = e.target.value)}
          ?disabled=${this._submitting}
        />
      </label>
      <div class="field-hint">
        Copies the config, description, and card type. Created and updated
        timestamps reset to now.
      </div>
    `;
  }

  _renderDeleteForm(row) {
    if (row.linked_cards > 0) {
      return html`
        <div class="form-warning">
          This template is still linked to ${row.linked_cards} card(s) and
          cannot be deleted. Remove the bindings first.
        </div>
      `;
    }
    return html`
      <div>
        Delete <strong>${row.name}</strong>? This action cannot be undone.
      </div>
    `;
  }

  _formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleString(this.hass.language, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .header {
        display: flex;
        align-items: center;
        height: 64px;
        padding: 0 16px;
        background-color: var(
          --app-header-background-color,
          var(--primary-color)
        );
        color: var(--app-header-text-color, var(--text-primary-color, #fff));
        box-shadow: var(
          --ha-card-box-shadow,
          0 2px 4px -1px rgba(0, 0, 0, 0.2),
          0 4px 5px 0 rgba(0, 0, 0, 0.14),
          0 1px 10px 0 rgba(0, 0, 0, 0.12)
        );
        position: sticky;
        top: 0;
        z-index: 4;
      }
      .header ha-menu-button {
        --mdc-icon-button-size: 40px;
        color: inherit;
      }
      .title {
        margin-left: 16px;
        font-size: 20px;
        font-weight: 400;
        line-height: 1;
        flex: 1;
      }
      .error {
        padding: 12px 16px;
        background: var(--error-color, #db4437);
        color: #fff;
      }
      .content {
        padding: 16px;
      }
      .tabs {
        display: flex;
        gap: 4px;
        padding: 0 16px;
        background: var(--card-background-color, var(--ha-card-background));
        border-bottom: 1px solid var(--divider-color);
        position: sticky;
        top: 64px;
        z-index: 3;
      }
      .tab {
        height: 48px;
        padding: 0 16px;
        background: none;
        border: 0;
        border-bottom: 2px solid transparent;
        color: var(--secondary-text-color);
        font: inherit;
        font-weight: 500;
        cursor: pointer;
        transition: color 120ms ease, border-color 120ms ease;
      }
      .tab:hover {
        color: var(--primary-text-color);
      }
      .tab[aria-selected="true"] {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
      }
      .tab:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: -4px;
        border-radius: 4px;
      }
      .error.dismissable {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .error.dismissable span {
        flex: 1;
      }
      .error.dismissable .close-btn {
        color: inherit;
      }
      .studio-status {
        display: flex;
        justify-content: center;
        padding: 48px 16px;
      }
      .studio-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }
      .studio-host {
        display: block;
        height: calc(100vh - 64px - 49px);
        min-height: 480px;
      }
      .studio-host[hidden] {
        display: none;
      }
      .empty {
        padding: 24px;
        text-align: center;
        color: var(--secondary-text-color);
        background: var(--card-background-color, var(--ha-card-background));
        border-radius: 8px;
      }
      .templates-table {
        width: 100%;
        border-collapse: collapse;
        background: var(--card-background-color, var(--ha-card-background));
        border-radius: 8px;
        overflow: hidden;
      }
      .templates-table th,
      .templates-table td {
        text-align: left;
        padding: 12px 16px;
        border-bottom: 1px solid var(--divider-color);
        vertical-align: middle;
      }
      .templates-table tbody tr:last-child td {
        border-bottom: none;
      }
      .templates-table th {
        font-weight: 500;
        color: var(--secondary-text-color);
        background: var(--table-header-background-color, transparent);
      }
      .col-name {
        width: 1%;
        white-space: nowrap;
        max-width: 280px;
      }
      .col-type,
      .col-linked,
      .col-date,
      .col-actions {
        width: 1%;
        white-space: nowrap;
      }
      .templates-table th.col-actions,
      .templates-table td.col-actions {
        text-align: right;
      }
      .action-buttons {
        display: flex;
        gap: 4px;
        align-items: center;
        justify-content: flex-end;
      }
      .action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        background: none;
        border: 0;
        border-radius: 4px;
        color: var(--secondary-text-color);
        cursor: pointer;
        transition: background-color 120ms ease, color 120ms ease;
      }
      .action-btn:hover:not([disabled]) {
        background: var(--divider-color);
      }
      .action-btn[disabled] {
        opacity: 0.35;
        cursor: not-allowed;
      }
      .action-btn.studio {
        color: var(--primary-color);
      }
      .action-btn.edit {
        color: var(--info-color, #2196f3);
      }
      .action-btn.duplicate {
        color: var(--success-color, #43a047);
      }
      .action-btn.danger {
        color: var(--error-color, #db4437);
      }
      .action-btn.studio:hover:not([disabled]),
      .action-btn.edit:hover:not([disabled]),
      .action-btn.duplicate:hover:not([disabled]),
      .action-btn.danger:hover:not([disabled]) {
        filter: brightness(1.15);
      }
      .action-btn svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }
      .template-name {
        font-weight: 500;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
      .secondary {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 2px;
        white-space: normal;
      }
      .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
      }
      .dialog {
        background: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        max-width: 1280px;
        width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .dialog-body {
        flex: 1;
        display: flex;
        min-height: 0;
      }
      .pane {
        display: flex;
        flex-direction: column;
        min-width: 0;
        min-height: 0;
        flex: 1 1 50%;
      }
      .pane + .pane {
        border-left: 1px solid var(--divider-color);
      }
      .pane-header {
        padding: 8px 16px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--secondary-text-color);
        border-bottom: 1px solid var(--divider-color);
        background: var(--table-header-background-color, transparent);
      }
      .preview-wrap {
        flex: 1;
        overflow: auto;
        padding: 16px;
        background: var(--primary-background-color);
      }
      .preview-host {
        display: block;
      }
      .preview-error {
        padding: 12px;
        margin-bottom: 12px;
        background: var(--error-color, #db4437);
        color: #fff;
        border-radius: 4px;
        font-size: 13px;
      }
      .editor-host {
        flex: 1;
        overflow: auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .editor-host > * {
        flex: 1;
        align-self: stretch;
      }
      .metadata-pane {
        flex: 0 0 220px;
        border-right: 1px solid var(--divider-color);
      }
      .meta-body {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .meta-hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
      @media (max-width: 720px) {
        .dialog-body {
          flex-direction: column;
        }
        .pane + .pane {
          border-left: 0;
          border-top: 1px solid var(--divider-color);
        }
      }
      .action-dialog {
        max-width: 480px;
      }
      .action-body {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        overflow: auto;
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .field-label {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .field-input {
        font: inherit;
        font-size: 14px;
        padding: 8px 10px;
        background: var(--primary-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        outline: none;
        resize: vertical;
      }
      .field-input:focus {
        border-color: var(--primary-color);
      }
      .field-input.mono {
        font-family: var(--code-font-family, monospace);
        font-size: 13px;
      }
      .field-hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        line-height: 1.4;
      }
      .form-error {
        padding: 8px 12px;
        background: var(--error-color, #db4437);
        color: #fff;
        border-radius: 4px;
        font-size: 13px;
      }
      .form-warning {
        padding: 8px 12px;
        background: var(--warning-color, #ffa600);
        color: #000;
        border-radius: 4px;
        font-size: 13px;
        line-height: 1.4;
      }
      .action-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding: 12px 16px;
        border-top: 1px solid var(--divider-color);
      }
      .btn {
        font: inherit;
        font-size: 14px;
        padding: 8px 16px;
        background: transparent;
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        cursor: pointer;
      }
      .btn:hover:not([disabled]) {
        background: var(--divider-color);
      }
      .btn[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn.primary {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        border-color: var(--primary-color);
      }
      .btn.primary:hover:not([disabled]) {
        filter: brightness(1.1);
        background: var(--primary-color);
      }
      .btn.danger {
        background: var(--error-color, #db4437);
        color: #fff;
        border-color: var(--error-color, #db4437);
      }
      .btn.danger:hover:not([disabled]) {
        filter: brightness(1.1);
        background: var(--error-color, #db4437);
      }
      .dialog-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border-bottom: 1px solid var(--divider-color);
      }
      .dialog-title {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
      }
      .dialog-title-name {
        font-size: 16px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dialog-title-type {
        padding: 2px 8px;
        font-family: var(--code-font-family, monospace);
        font-size: 11px;
        color: var(--secondary-text-color);
        background: var(--divider-color);
        border-radius: 4px;
        white-space: nowrap;
        flex-shrink: 0;
      }
      .close-btn {
        font-size: 22px;
        line-height: 1;
        background: none;
        border: 0;
        color: var(--secondary-text-color);
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
      }
      .close-btn:hover {
        background: var(--divider-color);
        color: var(--primary-text-color);
      }
      .dialog-header-actions {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .dialog-header-actions .action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        background: none;
        border: 0;
        border-radius: 4px;
        color: var(--secondary-text-color);
        cursor: pointer;
      }
      .dialog-header-actions .action-btn svg {
        width: 18px;
        height: 18px;
        fill: currentColor;
      }
      .dialog-header-actions .action-btn:hover {
        background: var(--divider-color);
      }
      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding: 12px 16px;
        border-top: 1px solid var(--divider-color);
      }
      .pane-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--secondary-text-color);
        border-bottom: 1px solid var(--divider-color);
        background: var(--table-header-background-color, transparent);
      }
      .yaml-body {
        margin: 0;
        padding: 16px;
        background: var(--code-editor-background-color, #1e1e1e);
        color: var(--primary-text-color);
        font-family: var(--code-font-family, monospace);
        font-size: 12px;
        line-height: 1.5;
        overflow: auto;
        flex: 1;
        min-height: 0;
        white-space: pre;
      }
    `;
  }
}

if (!customElements.get("magic-card-utils-panel")) {
  customElements.define("magic-card-utils-panel", MagicCardUtilsPanel);
}
