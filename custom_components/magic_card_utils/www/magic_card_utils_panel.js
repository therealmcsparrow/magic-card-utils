import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class MagicCardUtilsPanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
      _templates: { type: Array, state: true },
    };
  }

  constructor() {
    super();
    this._templates = [];
  }

  _processTemplates(templates) {
    return Object.entries(templates).map(([name, template]) => ({
      name,
      ...template,
    }));
  }

  firstUpdated() {
    this.hass.connection.subscribeMessage(
      (message) => {
        this._templates = this._processTemplates(message.templates);
      },
      { type: "magic_card_utils/templates" }
    );

    this.hass.connection
      .sendMessage({
        type: "magic_card_utils/get_templates",
      })
      .then((message) => {
        this._templates = this._processTemplates(message.templates);
      });
  }

  render() {
    if (!this.hass || !this._templates) {
      return html`<ha-circular-progress active></ha-circular-progress>`;
    }

    return html`
      <ha-app-layout>
        <app-header slot="header" fixed>
          <app-toolbar>
            <ha-menu-button
              .hass=${this.hass}
              .narrow=${this.narrow}
            ></ha-menu-button>
            <div main-title>${this.panel.title}</div>
          </app-toolbar>
        </app-header>

        <div class="content">
          <ha-data-table
            .hass=${this.hass}
            .columns=${this._columns}
            .data=${this._templates}
            .id=${"name"}
            auto-height
          ></ha-data-table>
        </div>
      </ha-app-layout>
    `;
  }

  get _columns() {
    return {
      name: {
        title: "Name",
        sortable: true,
        grows: true,
        template: (name, template) => html`
          ${name}
          <div class="secondary">${template.description}</div>
        `,
      },
      linked_cards: {
        title: "Linked Cards",
        sortable: true,
        width: "15%",
      },
      created_at: {
        title: "Created",
        sortable: true,
        width: "15%",
        template: (createdAt) => this._formatDate(createdAt),
      },
      last_updated: {
        title: "Last Updated",
        sortable: true,
        width: "15%",
        template: (lastUpdated) => this._formatDate(lastUpdated),
      },
    };
  }

  _formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.hass.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  static get styles() {
    return css`
      .content {
        padding: 16px;
      }
      .secondary {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
    `;
  }
}

customElements.define("magic-card-utils-panel", MagicCardUtilsPanel);