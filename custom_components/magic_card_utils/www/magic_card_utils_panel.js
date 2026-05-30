import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

const _MODULE_PALETTE = [
  { type: "header", label: "Header", defaults: { text: "" } },
  { type: "entities", label: "Entities", defaults: { entities: [] } },
  { type: "sensor", label: "Sensor", defaults: { entity: "" } },
  { type: "climate", label: "Climate", defaults: { entity: "" } },
  { type: "light", label: "Light", defaults: { entity: "" } },
  { type: "switch", label: "Switch", defaults: { entity: "" } },
  { type: "input_boolean", label: "Input Boolean", defaults: { entity: "" } },
  { type: "script", label: "Script", defaults: { entity: "" } },
  { type: "automation", label: "Automation", defaults: { entity: "" } },
  { type: "group", label: "Group", defaults: { entities: [] } },
  { type: "humidity", label: "Humidity", defaults: { entity: "" } },
  { type: "temperature", label: "Temperature", defaults: { entity: "" } },
  { type: "weather", label: "Weather", defaults: { entity: "" } },
  { type: "camera", label: "Camera", defaults: { entity: "" } },
  { type: "picture", label: "Picture", defaults: { entity: "" } },
  { type: "iframe", label: "iFrame", defaults: { url: "" } },
  { type: "markdown", label: "Markdown", defaults: { content: "" } },
  { type: "divider", label: "Divider", defaults: {} },
  { type: "spacer", label: "Spacer", defaults: {} },
];

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
      // template detail overlay
      _viewRow: { type: Object, state: true },
      _viewMode: { type: String, state: true }, // 'yaml' | 'edit'
      _previewError: { type: String, state: true },
      // edit mode state
      _editConfig: { type: Object, state: true },
      _editMeta: { type: Object, state: true }, // { name, description, card_type }
      _paletteOpen: { type: Boolean, state: true },
      _selectedSection: { type: Object, state: true }, // { row, col } for module placement
      // action dialog (edit/duplicate/delete)
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
    this._viewRow = null;
    this._viewMode = "yaml";
    this._previewEl = null;
    this._previewError = "";
    // edit mode
    this._editConfig = null;
    this._editMeta = { name: "", description: "", card_type: "" };
    this._paletteOpen = false;
    this._selectedSection = null;
    // action dialog
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
    this._viewRow = row;
    this._viewMode = "yaml";
    this._previewError = "";
    this._previewEl = null;
    await this.updateComplete;
    this._buildPreview();
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
    this._selectedSection = null;
    this._paletteOpen = false;
    this._previewError = "";
    this._previewEl = null;
  }

  async _buildPreview() {
    const host = this.shadowRoot.querySelector(".preview-host");
    if (!host) return;
    host.innerHTML = "";
    this._previewEl = null;

    const config = this._viewMode === "edit" ? this._editConfig : (this._viewRow && this._viewRow.raw && this._viewRow.raw.config);
    if (!config || typeof config !== "object") {
      this._previewError = "No config to preview.";
      return;
    }
    const card_type = this._viewRow && this._viewRow.card_type || "";
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
    if ((changedProps.has("_editConfig") || changedProps.has("_viewMode")) && this._viewRow) {
      this.updateComplete.then(() => this._buildPreview());
    }
  }

  _closeOverlay() {
    this._viewRow = null;
    this._viewMode = "yaml";
    this._editConfig = null;
    this._editMeta = { name: "", description: "", card_type: "" };
    this._selectedSection = null;
    this._paletteOpen = false;
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

  _addModule(moduleDef) {
    const cfg = this._editConfig;
    const sel = this._selectedSection;
    if (sel && sel.col != null && sel.row != null) {
      const rows = cfg.rows || [];
      if (sel.row < rows.length) {
        const cols = rows[sel.row].columns || [];
        if (sel.col < cols.length) {
          cols[sel.col].modules = cols[sel.col].modules || [];
          cols[sel.col].modules.push({ type: moduleDef.type, ...moduleDef.defaults });
          rows[sel.row].columns = cols;
          cfg.rows = rows;
        }
      }
    } else {
      // Append to first available column in first row
      const rows = cfg.rows || [];
      if (rows.length === 0) {
        cfg.rows = [{ columns: [{ modules: [] }] }];
      }
      const cols = rows[0].columns || [];
      if (cols.length === 0) {
        cols.push({ modules: [] });
      }
      cols[0].modules = cols[0].modules || [];
      cols[0].modules.push({ type: moduleDef.type, ...moduleDef.defaults });
      rows[0].columns = cols;
      cfg.rows = rows;
    }
    this._editConfig = { ...cfg };
    this._paletteOpen = false;
  }

  _removeModule(rowIdx, colIdx, modIdx) {
    const cfg = this._editConfig;
    const rows = cfg.rows || [];
    if (rowIdx < rows.length) {
      const cols = rows[rowIdx].columns || [];
      if (colIdx < cols.length) {
        cols[colIdx].modules = (cols[colIdx].modules || []).filter((_, i) => i !== modIdx);
        rows[rowIdx].columns = cols;
        cfg.rows = rows;
        this._editConfig = { ...cfg };
      }
    }
  }

  _moveModule(rowIdx, colIdx, modIdx, dir) {
    const cfg = this._editConfig;
    const rows = cfg.rows || [];
    if (rowIdx < rows.length) {
      const cols = rows[rowIdx].columns || [];
      if (colIdx < cols.length) {
        const mods = cols[colIdx].modules || [];
        const newIdx = modIdx + dir;
        if (newIdx >= 0 && newIdx < mods.length) {
          [mods[modIdx], mods[newIdx]] = [mods[newIdx], mods[modIdx]];
          cols[colIdx].modules = mods;
          rows[rowIdx].columns = cols;
          cfg.rows = rows;
          this._editConfig = { ...cfg };
        }
      }
    }
  }

  _addRow() {
    const cfg = this._editConfig;
    cfg.rows = cfg.rows || [];
    cfg.rows.push({ columns: [{ modules: [] }] });
    this._editConfig = { ...cfg };
  }

  _removeRow(rowIdx) {
    const cfg = this._editConfig;
    if ((cfg.rows || []).length > 1) {
      cfg.rows = cfg.rows.filter((_, i) => i !== rowIdx);
      this._editConfig = { ...cfg };
    }
  }

  _moveRow(rowIdx, dir) {
    const cfg = this._editConfig;
    const rows = cfg.rows || [];
    const newIdx = rowIdx + dir;
    if (newIdx >= 0 && newIdx < rows.length) {
      [rows[rowIdx], rows[newIdx]] = [rows[newIdx], rows[rowIdx]];
      cfg.rows = [...rows];
      this._editConfig = { ...cfg };
    }
  }

  _addColumn(rowIdx) {
    const cfg = this._editConfig;
    const rows = cfg.rows || [];
    if (rowIdx < rows.length) {
      rows[rowIdx].columns = rows[rowIdx].columns || [];
      rows[rowIdx].columns.push({ modules: [] });
      cfg.rows = [...rows];
      this._editConfig = { ...cfg };
    }
  }

  _removeColumn(rowIdx, colIdx) {
    const cfg = this._editConfig;
    const rows = cfg.rows || [];
    if (rowIdx < rows.length) {
      const cols = rows[rowIdx].columns || [];
      if (cols.length > 1) {
        rows[rowIdx].columns = cols.filter((_, i) => i !== colIdx);
        cfg.rows = [...rows];
        this._editConfig = { ...cfg };
      }
    }
  }

  _moveColumn(rowIdx, colIdx, dir) {
    const cfg = this._editConfig;
    const rows = cfg.rows || [];
    if (rowIdx < rows.length) {
      const cols = rows[rowIdx].columns || [];
      const newIdx = colIdx + dir;
      if (newIdx >= 0 && newIdx < cols.length) {
        [cols[colIdx], cols[newIdx]] = [cols[newIdx], cols[colIdx]];
        rows[rowIdx].columns = [...cols];
        cfg.rows = [...rows];
        this._editConfig = { ...cfg };
      }
    }
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
                  <div class="pane editor-pane">
                    ${this._viewMode === "yaml"
                      ? html`
                          <div class="pane-header">YAML</div>
                          <pre class="yaml-body">${dumpYaml(this._viewRow.raw && this._viewRow.raw.config ? this._viewRow.raw.config : this._viewRow.raw || {})}</pre>
                        `
                      : this._renderEditPane()}
                  </div>
                  <div class="pane preview-pane">
                    <div class="pane-header">
                      Preview
                      ${this._viewMode === "edit" ? html`<button class="pane-header-btn" @click=${() => this._paletteOpen = !this._paletteOpen} title="Toggle module palette">${this._paletteOpen ? "Hide" : "Show"} palette</button>` : ""}
                    </div>
                    <div class="preview-wrap">
                      ${this._previewError ? html`<div class="preview-error">${this._previewError}</div>` : ""}
                      <div class="preview-host"></div>
                    </div>
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

  _renderEditPane() {
    const meta = this._editMeta;
    const cfg = this._editConfig;
    return html`
      <div class="pane-header">Editor</div>
      <div class="editor-body">
        <div class="editor-meta">
          <label class="field">
            <span class="field-label">Template Name</span>
            <input class="field-input" type="text" .value=${meta.name} @input=${(e) => (meta.name = e.target.value)} />
          </label>
          <label class="field">
            <span class="field-label">Description</span>
            <input class="field-input" type="text" .value=${meta.description} @input=${(e) => (meta.description = e.target.value)} />
          </label>
          <label class="field">
            <span class="field-label">Card Type</span>
            <input class="field-input mono" type="text" placeholder="e.g. custom:magic-card" .value=${meta.card_type} @input=${(e) => (meta.card_type = e.target.value)} />
          </label>
        </div>
        <div class="editor-structure">
          <div class="structure-header">
            <span>Rows</span>
            <button class="btn" @click=${this._addRow}>+ Row</button>
          </div>
          ${(cfg.rows || []).map((row, ri) => html`
            <div class="structure-row">
              <div class="structure-row-header">
                <span class="row-label">Row ${ri + 1}</span>
                <div class="row-controls">
                  <button class="ctrl-btn" title="Move up" ?disabled=${ri === 0} @click=${() => this._moveRow(ri, -1)}>↑</button>
                  <button class="ctrl-btn" title="Move down" ?disabled=${ri === cfg.rows.length - 1} @click=${() => this._moveRow(ri, 1)}>↓</button>
                  <button class="ctrl-btn danger" title="Remove row" ?disabled=${cfg.rows.length <= 1} @click=${() => this._removeRow(ri)}>✕</button>
                </div>
              </div>
              <div class="structure-cols">
                ${(row.columns || []).map((col, ci) => html`
                  <div class="structure-col ${this._selectedSection && this._selectedSection.row === ri && this._selectedSection.col === ci ? 'selected' : ''}"
                       @click=${() => (this._selectedSection = { row: ri, col: ci })}>
                    <div class="col-header">
                      <span>Col ${ci + 1}</span>
                      <div class="col-controls">
                        <button class="ctrl-btn" title="Move left" ?disabled=${ci === 0} @click=${() => this._moveColumn(ri, ci, -1)}>←</button>
                        <button class="ctrl-btn" title="Move right" ?disabled=${ci === (row.columns || []).length - 1} @click=${() => this._moveColumn(ri, ci, 1)}>→</button>
                        <button class="ctrl-btn danger" title="Remove column" ?disabled=${(row.columns || []).length <= 1} @click=${() => this._removeColumn(ri, ci)}>✕</button>
                      </div>
                    </div>
                    <div class="col-modules">
                      ${(col.modules || []).map((mod, mi) => html`
                        <div class="module-item" draggable="true"
                             @dragstart=${(e) => this._onModuleDragStart(e, ri, ci, mi)}
                             @dragover=${(e) => e.preventDefault()}
                             @drop=${(e) => this._onModuleDrop(e, ri, ci, mi)}>
                          <span class="module-type">${mod.type || "(unknown)"}</span>
                          <div class="module-controls">
                            <button class="ctrl-btn" title="Move up" ?disabled=${mi === 0} @click=${() => this._moveModule(ri, ci, mi, -1)}>↑</button>
                            <button class="ctrl-btn" title="Move down" ?disabled=${mi === (col.modules || []).length - 1} @click=${() => this._moveModule(ri, ci, mi, 1)}>↓</button>
                            <button class="ctrl-btn danger" title="Remove" @click=${() => this._removeModule(ri, ci, mi)}>✕</button>
                          </div>
                        </div>
                      `)}
                      ${(col.modules || []).length === 0 ? html`<div class="col-empty">Click to select, then add modules</div>` : ""}
                    </div>
                  </div>
                `)}
                <button class="btn add-col-btn" @click=${() => this._addColumn(ri)}>+ Column</button>
              </div>
            </div>
          `)}
          ${this._paletteOpen ? this._renderPalette() : ""}
        </div>
      </div>
    `;
  }

  _renderPalette() {
    return html`
      <div class="palette">
        <div class="palette-header">Module Palette</div>
        <div class="palette-items">
          ${_MODULE_PALETTE.map((mod) => html`
            <button class="palette-item" @click=${() => this._addModule(mod)} title=${mod.type}>
              <span class="palette-label">${mod.label}</span>
              <span class="palette-type">${mod.type}</span>
            </button>
          `)}
        </div>
      </div>
    `;
  }

  _onModuleDragStart(e, rowIdx, colIdx, modIdx) {
    e.dataTransfer.setData("text/plain", JSON.stringify({ rowIdx, colIdx, modIdx }));
  }

  _onModuleDrop(e, targetRow, targetCol, targetModIdx) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/plain");
    if (!raw) return;
    try {
      const { rowIdx, colIdx, modIdx } = JSON.parse(raw);
      if (rowIdx === targetRow && colIdx === targetCol && modIdx === targetModIdx) return;
      const cfg = this._editConfig;
      const rows = cfg.rows || [];
      const srcMod = (rows[rowIdx].columns[colIdx].modules || [])[modIdx];
      if (!srcMod) return;
      rows[rowIdx].columns[colIdx].modules.splice(modIdx, 1);
      rows[targetRow].columns[targetCol].modules.splice(targetModIdx, 0, srcMod);
      cfg.rows = [...rows];
      this._editConfig = { ...cfg };
    } catch (_) {}
  }

  static get styles() {
    return css`
      :host {
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
      .pane-header-btn {
        font: inherit;
        font-size: 11px;
        padding: 2px 8px;
        background: none;
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        cursor: pointer;
        text-transform: none;
        letter-spacing: 0;
      }
      .pane-header-btn:hover {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      .editor-body {
        flex: 1;
        overflow: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .editor-meta {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color);
      }
      .editor-structure {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .structure-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }
      .structure-row {
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        overflow: hidden;
      }
      .structure-row-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        background: var(--table-header-background-color, var(--divider-color));
      }
      .row-label, .col-header > span {
        font-size: 12px;
        font-weight: 500;
      }
      .row-controls, .col-controls {
        display: flex;
        gap: 2px;
        align-items: center;
      }
      .ctrl-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 24px;
        height: 24px;
        padding: 0 4px;
        font-size: 12px;
        background: none;
        color: var(--secondary-text-color);
        border: 0;
        border-radius: 3px;
        cursor: pointer;
      }
      .ctrl-btn:hover:not([disabled]) {
        background: var(--divider-color);
        color: var(--primary-text-color);
      }
      .ctrl-btn[disabled] {
        opacity: 0.3;
        cursor: not-allowed;
      }
      .ctrl-btn.danger:hover:not([disabled]) {
        color: var(--error-color, #db4437);
      }
      .structure-cols {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 8px;
        align-items: flex-start;
      }
      .structure-col {
        flex: 1;
        min-width: 120px;
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        cursor: pointer;
        transition: border-color 120ms ease;
      }
      .structure-col:hover {
        border-color: var(--primary-color);
      }
      .structure-col.selected {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 1px var(--primary-color);
      }
      .col-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 8px;
        font-size: 11px;
        color: var(--secondary-text-color);
        background: var(--table-header-background-color, transparent);
        border-bottom: 1px solid var(--divider-color);
      }
      .col-modules {
        padding: 6px 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-height: 48px;
      }
      .module-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 6px;
        background: var(--primary-background-color);
        border-radius: 4px;
        border: 1px solid var(--divider-color);
      }
      .module-type {
        font-size: 11px;
        font-family: var(--code-font-family, monospace);
        color: var(--primary-text-color);
      }
      .module-controls {
        display: flex;
        gap: 2px;
      }
      .col-empty {
        font-size: 11px;
        color: var(--secondary-text-color);
        text-align: center;
        padding: 8px 0;
        font-style: italic;
      }
      .add-col-btn {
        align-self: flex-start;
        font-size: 11px;
        padding: 4px 8px;
      }
      .palette {
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        overflow: hidden;
      }
      .palette-header {
        padding: 6px 10px;
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: var(--secondary-text-color);
        background: var(--table-header-background-color, transparent);
        border-bottom: 1px solid var(--divider-color);
      }
      .palette-items {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        padding: 8px;
      }
      .palette-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        padding: 6px 8px;
        background: var(--primary-background-color);
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        cursor: pointer;
        min-width: 80px;
      }
      .palette-item:hover {
        border-color: var(--primary-color);
        background: var(--divider-color);
      }
      .palette-label {
        font-size: 12px;
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .palette-type {
        font-size: 10px;
        font-family: var(--code-font-family, monospace);
        color: var(--secondary-text-color);
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
