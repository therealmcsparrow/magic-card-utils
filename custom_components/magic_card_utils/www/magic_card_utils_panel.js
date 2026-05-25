import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

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

class MagicCardUtilsPanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
      _templates: { type: Array, state: true },
      _error: { type: String, state: true },
      _selectedName: { type: String, state: true },
      _selectedYaml: { type: String, state: true },
      _selectedCardType: { type: String, state: true },
      _previewError: { type: String, state: true },
      _actionMode: { type: String, state: true },
      _actionRow: { type: Object, state: true },
      _editName: { type: String, state: true },
      _editDescription: { type: String, state: true },
      _editCardType: { type: String, state: true },
      _duplicateName: { type: String, state: true },
      _actionError: { type: String, state: true },
      _submitting: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this._templates = [];
    this._error = "";
    this._selectedName = "";
    this._selectedYaml = "";
    this._selectedCardType = "";
    this._selectedConfig = null;
    this._previewEl = null;
    this._previewError = "";
    this._actionMode = "";
    this._actionRow = null;
    this._editName = "";
    this._editDescription = "";
    this._editCardType = "";
    this._duplicateName = "";
    this._actionError = "";
    this._submitting = false;
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

  async _openTemplate(row) {
    const source =
      row.raw && typeof row.raw === "object" && row.raw.config &&
      typeof row.raw.config === "object"
        ? row.raw.config
        : row.raw || {};
    let yaml;
    try {
      yaml = dumpYaml(source);
    } catch (err) {
      console.error("[magic_card_utils] yaml dump failed", err);
      yaml = JSON.stringify(source, null, 2);
    }
    this._selectedName = row.name;
    this._selectedYaml = yaml;
    this._selectedCardType = row.card_type || "";
    this._selectedConfig = source;
    this._previewError = "";
    this._previewEl = null;
    await this.updateComplete;
    this._buildPreview();
  }

  async _buildPreview() {
    const host = this.shadowRoot.querySelector(".preview-host");
    if (!host) return;
    host.innerHTML = "";
    this._previewEl = null;

    const config = this._selectedConfig;
    if (!config || typeof config !== "object") {
      this._previewError = "No config to preview.";
      return;
    }
    const renderConfig =
      config.type
        ? config
        : this._selectedCardType
        ? { type: this._selectedCardType, ...config }
        : null;
    if (!renderConfig) {
      this._previewError =
        "No card type available — neither the config nor the template carries a `type`.";
      return;
    }
    if (typeof window.loadCardHelpers !== "function") {
      this._previewError =
        "Lovelace card helpers are unavailable in this build of Home Assistant.";
      return;
    }
    try {
      const helpers = await window.loadCardHelpers();
      const el = helpers.createCardElement(renderConfig);
      el.hass = this.hass;
      host.appendChild(el);
      this._previewEl = el;
      this._previewError = "";
    } catch (err) {
      console.error("[magic_card_utils] preview failed", err);
      this._previewError =
        (err && (err.message || String(err))) || "Failed to render preview.";
    }
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this._previewEl && this.hass) {
      this._previewEl.hass = this.hass;
    }
  }

  _closeOverlay() {
    this._selectedName = "";
    this._selectedYaml = "";
    this._selectedCardType = "";
    this._selectedConfig = null;
    this._previewEl = null;
    this._previewError = "";
  }

  _onOverlayKeydown(e) {
    if (e.key === "Escape") this._closeOverlay();
  }

  _openEdit(row) {
    this._actionRow = row;
    this._editName = row.name;
    this._editDescription = row.description || "";
    this._editCardType = row.card_type || "";
    this._actionError = "";
    this._actionMode = "edit";
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
    this._editName = "";
    this._editDescription = "";
    this._editCardType = "";
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

  async _submitEdit() {
    if (this._submitting) return;
    const row = this._actionRow;
    if (!row) return;
    const newName = (this._editName || "").trim();
    if (!newName) {
      this._actionError = "Name is required.";
      return;
    }
    if (
      newName !== row.name &&
      this._templates.some((t) => t.name === newName)
    ) {
      this._actionError = `A template named '${newName}' already exists.`;
      return;
    }
    const payload = {
      type: "magic_card_utils/save_template",
      name: newName,
      template: {
        ...(row.raw && typeof row.raw === "object" ? row.raw : {}),
        description: this._editDescription || "",
      },
    };
    if (this._editCardType) payload.card_type = this._editCardType;
    if (newName !== row.name) payload.old_name = row.name;

    this._submitting = true;
    this._actionError = "";
    try {
      await this.hass.callWS(payload);
      this._closeAction();
    } catch (err) {
      console.error("[magic_card_utils] edit failed", err);
      this._actionError =
        (err && (err.message || err.code)) || "Save failed";
      this._submitting = false;
    }
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
                          <button
                            class="name-link"
                            @click=${() => this._openTemplate(row)}
                            title="View YAML"
                          >
                            ${row.name}
                          </button>
                          ${row.card_type
                            ? html`<div class="type-badge">
                                ${row.card_type}
                              </div>`
                            : ""}
                          ${row.description
                            ? html`<div class="secondary">
                                ${row.description}
                              </div>`
                            : ""}
                        </td>
                        <td>${row.linked_cards}</td>
                        <td>${this._formatDate(row.created_at)}</td>
                        <td>${this._formatDate(row.last_updated)}</td>
                        <td class="col-actions">
                          <div class="action-buttons">
                            <button
                              class="action-btn edit"
                              title="Edit"
                              @click=${() => this._openEdit(row)}
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

      ${this._selectedName
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
                aria-label="Template YAML"
                @click=${(e) => e.stopPropagation()}
              >
                <div class="dialog-header">
                  <div class="dialog-title">
                    <span class="dialog-title-name"
                      >${this._selectedName}</span
                    >
                    ${this._selectedCardType
                      ? html`<span class="dialog-title-type"
                          >${this._selectedCardType}</span
                        >`
                      : ""}
                  </div>
                  <button
                    class="close-btn"
                    @click=${this._closeOverlay}
                    title="Close"
                  >
                    &times;
                  </button>
                </div>
                <div class="dialog-body">
                  <div class="pane yaml-pane">
                    <div class="pane-header">YAML</div>
                    <pre class="yaml-body">${this._selectedYaml}</pre>
                  </div>
                  <div class="pane preview-pane">
                    <div class="pane-header">Preview</div>
                    <div class="preview-wrap">
                      ${this._previewError
                        ? html`<div class="preview-error">
                            ${this._previewError}
                          </div>`
                        : ""}
                      <div class="preview-host"></div>
                    </div>
                  </div>
                </div>
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
                ${this._actionMode === "edit"
                  ? "Edit template"
                  : this._actionMode === "duplicate"
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
            ${this._actionMode === "edit" ? this._renderEditForm() : ""}
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
            ${this._actionMode === "edit"
              ? html`<button
                  class="btn primary"
                  @click=${this._submitEdit}
                  ?disabled=${this._submitting}
                >
                  ${this._submitting ? "Saving…" : "Save"}
                </button>`
              : ""}
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

  _renderEditForm() {
    return html`
      <label class="field">
        <span class="field-label">Name</span>
        <input
          class="field-input"
          type="text"
          .value=${this._editName}
          @input=${(e) => (this._editName = e.target.value)}
          ?disabled=${this._submitting}
        />
      </label>
      <label class="field">
        <span class="field-label">Description</span>
        <textarea
          class="field-input"
          rows="3"
          .value=${this._editDescription}
          @input=${(e) => (this._editDescription = e.target.value)}
          ?disabled=${this._submitting}
        ></textarea>
      </label>
      <label class="field">
        <span class="field-label">Card type</span>
        <input
          class="field-input mono"
          type="text"
          placeholder="e.g. custom:magic-card"
          .value=${this._editCardType}
          @input=${(e) => (this._editCardType = e.target.value)}
          ?disabled=${this._submitting}
        />
      </label>
      <div class="field-hint">
        The YAML config itself is edited in your magic-card editor; re-save the
        card from there to update this template's body.
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
        color: var(--primary-text-color);
        background: var(--primary-background-color);
        min-height: 100vh;
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
        vertical-align: top;
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
      .action-btn.edit {
        color: var(--info-color, #2196f3);
      }
      .action-btn.duplicate {
        color: var(--success-color, #43a047);
      }
      .action-btn.danger {
        color: var(--error-color, #db4437);
      }
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
      .name-link {
        font: inherit;
        font-weight: 500;
        color: var(--primary-color);
        background: none;
        border: 0;
        padding: 0;
        margin: 0;
        cursor: pointer;
        text-align: left;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
      .name-link:hover {
        text-decoration: underline;
      }
      .secondary {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 2px;
        white-space: normal;
      }
      .type-badge {
        display: inline-block;
        margin-top: 4px;
        padding: 1px 6px;
        font-family: var(--code-font-family, monospace);
        font-size: 11px;
        color: var(--secondary-text-color);
        background: var(--divider-color);
        border-radius: 4px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
