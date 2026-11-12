// Drafting layout of the Magic Card Utils panel: pure helpers (breakpoints, density, keyboard, Modified only,
// dark mode, font faces), the inspector and density pill templates, and the panel styles. Plain JS, no build step.
import { html, css } from "./lit-core.min.js";
import { mcUiKit } from "./mc-ui-kit.js";
import { FONT_FACES, loadPanelFonts } from "./mc-panel-fonts.js";

export { FONT_FACES, loadPanelFonts };

const nothing = "";

const PATHS = {
  remove: "M19 13H5v-2h14v2z",
  add: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  chevron: "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",
  back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
};
const glyph = (name, size) =>
  html`<svg viewBox="0 0 24 24" width=${size} height=${size} aria-hidden="true"><path fill="currentColor" d=${PATHS[name]}></path></svg>`;

export const DENSITY = { min: 75, max: 150, step: 25, initial: 100 };
export const INSPECTOR = { min: 280, max: 560, initial: 360 };
const DOCK_MIN = 1024;
const RULER_MIN = 640;

/** Which parts of the layout apply at a viewport width in px. */
export function layoutFor(width) {
  const docked = width >= DOCK_MIN;
  return {
    docked,
    sheet: !docked,
    mode: docked ? "docked" : "sheet",
    grip: docked,
    ruler: width >= RULER_MIN,
    twoLine: width < RULER_MIN,
    narrow: width < RULER_MIN,
  };
}

/**
 * Where Tab moves inside the open sheet: the element to focus when the key would leave the list (first when going
 * forward from the last or from outside, last when going back from the first), else null to let the browser move on.
 */
export function tabWrapTarget(shift, active, list) {
  if (!list.length) return null;
  const i = list.indexOf(active);
  if (i < 0) return shift ? list[list.length - 1] : list[0];
  if (!shift && i === list.length - 1) return list[0];
  if (shift && i === 0) return list[list.length - 1];
  return null;
}

/** Index of the tab a key moves to (wrapping), or -1 when the key does not move the selection. */
export function tabKeyTarget(key, index, count) {
  if (key === "ArrowRight") return (index + 1) % count;
  if (key === "ArrowLeft") return (index - 1 + count) % count;
  if (key === "Home") return 0;
  if (key === "End") return count - 1;
  return -1;
}

/** Which edges of the scrolling tab bar hide tabs: "none", "start", "end" or "both" (the edges to fade). */
export function fadeFor(scrollLeft, clientWidth, scrollWidth, rtl) {
  const x = Math.abs(scrollLeft);
  const atStart = x <= 1;
  const atEnd = x + clientWidth >= scrollWidth - 1;
  if (atStart && atEnd) return "none";
  if (atStart) return rtl ? "start" : "end";
  if (atEnd) return rtl ? "end" : "start";
  return "both";
}

/** The next density in percent after one step (+1 or -1), with the --z factor and which buttons stay enabled. */
export function stepDensity(pct, dir) {
  const next = Math.min(DENSITY.max, Math.max(DENSITY.min, pct + dir * DENSITY.step));
  return { pct: next, canDec: next > DENSITY.min, canInc: next < DENSITY.max, z: next / 100 };
}

/** Fields whose value differs from their default; read-only facts and fields without a default drop out when on. */
export function filterModified(fields, on) {
  if (!on) return fields;
  return fields.filter((f) => f.kind === "field" && f.default !== undefined && f.value !== f.default);
}

export function modeFor(hass) {
  return hass && hass.themes && hass.themes.darkMode ? "dark" : "light";
}

export function sheetKey(key, state) {
  return key === "Escape" && state.open && state.sheet ? "close" : null;
}

export function shouldOpenSheet(state) {
  return !!state.sheet && !state.initial;
}

/** The inspector width after a key on the grip; the inspector is on the right, so Left widens it. */
export function gripKey(key, width, shift) {
  const step = shift ? 64 : 16;
  const clamp = (n) => Math.min(INSPECTOR.max, Math.max(INSPECTOR.min, n));
  if (key === "ArrowLeft") return clamp(width + step);
  if (key === "ArrowRight") return clamp(width - step);
  if (key === "Home") return INSPECTOR.min;
  if (key === "End") return INSPECTOR.max;
  return width;
}

/**
 * The density pill. `s` holds the strings: group, smaller, larger.
 * `onStep(dir)` is called with -1 or +1; `inert` takes it out of the focus order while the sheet covers it.
 */
export function renderDensityPill(s, pct, onStep, inert = false) {
  const st = stepDensity(pct, 0);
  return html`<div class="density" ?inert=${inert} role="group" aria-label=${s.rowSize}>
    <button type="button" class="dbtn" aria-label=${s.smaller} ?disabled=${!st.canDec} @click=${() => onStep(-1)}>${glyph("remove", 18)}</button>
    <output aria-live="polite">${pct}%</output>
    <button type="button" class="dbtn" aria-label=${s.larger} ?disabled=${!st.canInc} @click=${() => onStep(1)}>${glyph("add", 18)}</button>
  </div>`;
}

/**
 * The body grid: ruler, main area (inert while the sheet is open), and, when there is an inspector, the grip and the
 * inspector. `parts` holds main, inspector, grip and pill templates.
 */
export function renderBody(ctx, parts) {
  return html`<div class="bp-grid ${parts.inspector ? "has-inspector" : ""}" style=${parts.inspector ? `--iw:${ctx.width}px` : nothing}>
    <div class="ruler-y" aria-hidden="true"></div>
    <div class="main ${parts.pill ? "has-pill" : ""}" style=${`--z:${ctx.z}`} ?inert=${ctx.sheetOpen}>
      <div class="ruler-x" aria-hidden="true"></div>
      ${parts.main}
    </div>
    ${parts.inspector ? html`${ctx.sheet ? nothing : parts.grip}${parts.inspector}` : nothing}
    ${parts.pill || nothing}
  </div>`;
}

/**
 * The resize grip between the list and the docked inspector: a vertical separator that Left, Right,
 * Shift, Home and End also move.
 */
export function renderGrip(s, width, handlers) {
  return html`<div
    class="grip"
    role="separator"
    aria-orientation="vertical"
    aria-label=${s.resize}
    aria-valuemin=${INSPECTOR.min}
    aria-valuemax=${INSPECTOR.max}
    aria-valuenow=${width}
    tabindex="0"
    @pointerdown=${handlers.pointerDown}
    @keydown=${handlers.keyDown}
  ></div>`;
}

function renderField(s, field) {
  const modified = field.default !== undefined && field.value !== field.default;
  return html`<div class="fld">
    <div class="fld-head">
      <span class="fld-label">${field.label}</span>
      ${modified && field.onReset
        ? html`<button type="button" class="reset" @click=${field.onReset}>${s.reset}<span class="vh"> ${field.label}</span></button>`
        : nothing}
    </div>
    ${field.control || html`<span class="fld-value">${field.value}</span>`}
    ${field.help ? html`<span class="fld-help">${field.help}</span>` : nothing}
  </div>`;
}

function renderGroup(s, ctx, group, fields) {
  const open = ctx.openGroups.has(group.id);
  const bodyId = `ig-${group.id}`;
  return html`<section class="grp">
    <button type="button" class="grp-head" aria-expanded=${open ? "true" : "false"} aria-controls=${bodyId} @click=${() => ctx.onToggleGroup(group.id)}>
      <span class="chev" aria-hidden="true">${glyph("chevron", 18)}</span>
      <h3>${group.title}</h3>
      <span class="grp-sum" title=${group.summary || ""}>
        ${group.swatch ? html`<i class="swatch" style=${`background:${group.swatch}`}></i>` : nothing}${group.summary || ""}
      </span>
    </button>
    <div class="grp-body" id=${bodyId} ?hidden=${!open}>
      ${group.body || nothing}
      ${fields.map((f) => renderField(s, f))}
    </div>
  </section>`;
}

/**
 * The inspector for the current selection. `model` is null for no selection, else
 * `{ name, type, groups: [{ id, title, summary, swatch?, body?, fields? }], footer? }`; `ctx` carries the open
 * groups, the Modified only switch, whether it shows as a sheet, and the callbacks.
 * Modified only filters the fields here, so fields that drop out are not in the DOM at all.
 */
export function renderInspector(s, ctx, model) {
  const rendered = model
    ? model.groups.map((g) => ({ g, fields: filterModified(g.fields || [], ctx.modifiedOnly) }))
    : [];
  const showEmpty = ctx.modifiedOnly && rendered.length > 0 && rendered.every((r) => r.fields.length === 0 && !r.g.body);
  const inner = html`<div class="ins-head">
      ${ctx.sheet ? html`<button type="button" class="btn btn-secondary ins-back" @click=${ctx.onClose}>${glyph("back", 18)}${s.back}</button>` : nothing}
      <div class="ins-title">
        <h2>${model ? model.name : s.nothing}</h2>
        <span>${model ? model.type : s.pick}</span>
      </div>
    </div>
    ${model
      ? html`<div class="ins-filter">
            <span>${s.groups(model.groups.length)}</span>
            <label class="sw"><input type="checkbox" role="switch" .checked=${ctx.modifiedOnly} @change=${(e) => ctx.onModifiedOnly(e.target.checked)} />${s.modifiedOnly}</label>
          </div>
          <div class="ins-scroll">
            ${showEmpty ? html`<p class="fld-help">${s.noChanged}</p>` : nothing}
            ${rendered.map((r) => renderGroup(s, ctx, r.g, r.fields))}
          </div>
          ${model.footer ? html`<div class="if">${model.footer}</div>` : nothing}`
      : nothing}`;
  return ctx.sheet
    ? html`<aside class="inspector is-sheet" aria-label=${s.details} role="dialog" aria-modal="true" @keydown=${ctx.onKeyDown}>${inner}</aside>`
    : html`<aside class="inspector" aria-label=${s.details}>${inner}</aside>`;
}

let fitSheet;

/**
 * Lets an embedded library list fill the room its host gives it: the controls above the list stay put and the
 * ruled list scrolls inside the element. The styles are adopted into the element's own shadow root once.
 */
export function fitListElement(el) {
  const root = el && el.shadowRoot;
  if (!root || !root.adoptedStyleSheets || typeof CSSStyleSheet === "undefined") return;
  if (!fitSheet) {
    fitSheet = new CSSStyleSheet();
    fitSheet.replaceSync(`
      :host { display: flex; flex: 1 1 auto; flex-direction: column; min-height: 0; }
      .wrap { display: flex; flex: 1 1 auto; flex-direction: column; min-height: 0; }
      .wrap > * { flex: none; }
      .wrap > .rows { flex: 1 1 auto; min-height: 160px; overflow-y: auto; align-content: start; grid-auto-rows: max-content; padding-bottom: var(--mcu-list-pad, 0); }
    `);
  }
  if (!root.adoptedStyleSheets.includes(fitSheet)) root.adoptedStyleSheets = [...root.adoptedStyleSheets, fitSheet];
}

export const draftingStyles = [
  mcUiKit,
  css`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
      height: 100dvh;
      overflow: hidden;
      font-family: "MCU Space Grotesk", system-ui, -apple-system, "Segoe UI", sans-serif;
      --bp-mono: "MCU JetBrains Mono", ui-monospace, "SF Mono", Consolas, monospace;
      --bp-bg: #f8f5f1;
      --bp-sheet: #fcfaf6;
      --bp-surf: #fefdfb;
      --bp-surf2: #f3f0ea;
      --bp-hair: #eae7e2;
      --bp-hair2: #e1ded7;
      --bp-line: #d7d4cd;
      --bp-edge: #7b8187;
      --bp-ink: #21272e;
      --bp-mute: #555c63;
      --bp-acc: #43668a;
      --bp-acc-ink: #fdfcf9;
      --bp-acc-soft: #dceaf8;
      --bp-warn: #9a4729;
      background: var(--bp-bg);
      color: var(--bp-ink);
      color-scheme: light;
    }
    :host([data-bp-mode="dark"]) {
      --bp-bg: #161b20;
      --bp-sheet: #1a1f24;
      --bp-surf: #21272d;
      --bp-surf2: #2b3138;
      --bp-hair: #20252a;
      --bp-hair2: #272c32;
      --bp-line: #3a4148;
      --bp-edge: #747b83;
      --bp-ink: #e4e8ed;
      --bp-mute: #a4acb4;
      --bp-acc: #91aecd;
      --bp-acc-ink: #0f171f;
      --bp-acc-soft: #273442;
      --bp-warn: #e59e77;
      color-scheme: dark;
    }
    .header {
      display: flex;
      flex: none;
      align-items: center;
      height: 48px;
      padding: 0 12px;
      background: var(--bp-sheet);
      color: var(--bp-ink);
      border-bottom: 1px solid var(--bp-line);
      position: sticky;
      top: 0;
      z-index: 4;
    }
    .header ha-menu-button {
      --mdc-icon-button-size: 40px;
      color: inherit;
    }
    .title {
      margin-block: 0;
      margin-inline-start: 8px;
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 1;
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      min-height: 0;
      gap: 12px;
      padding: 16px;
      overflow-y: auto;
    }
    .content > * {
      flex: none;
    }
    .content > .rows,
    .content > .tiles {
      flex: 1 1 auto;
      min-height: 160px;
      overflow-y: auto;
      padding-bottom: var(--mcu-list-pad, 0);
    }
    .content > .rows,
    .content > .tiles {
      align-content: start;
      grid-auto-rows: max-content;
    }
    .content > .rows > .rows-head {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--bp-bg);
    }
    .tabs {
      flex: none;
      display: flex;
      gap: 2px;
      padding: 0 10px;
      background: var(--bp-sheet);
      border-bottom: 1px solid var(--bp-line);
      position: sticky;
      top: 48px;
      z-index: 3;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .tabs::-webkit-scrollbar {
      display: none;
    }
    .tabs[data-fade="end"] {
      -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 16px), transparent);
      mask-image: linear-gradient(to right, #000 calc(100% - 16px), transparent);
    }
    .tabs[data-fade="start"] {
      -webkit-mask-image: linear-gradient(to right, transparent, #000 16px);
      mask-image: linear-gradient(to right, transparent, #000 16px);
    }
    .tabs[data-fade="both"] {
      -webkit-mask-image: linear-gradient(to right, transparent, #000 16px, #000 calc(100% - 16px), transparent);
      mask-image: linear-gradient(to right, transparent, #000 16px, #000 calc(100% - 16px), transparent);
    }
    .tab {
      flex: none;
      height: 42px;
      padding: 0 12px;
      position: relative;
      background: none;
      border: 0;
      color: var(--bp-mute);
      font: inherit;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: color var(--ha-animation-duration-fast, 150ms) ease;
    }
    .tab:hover {
      color: var(--bp-ink);
    }
    .tab[aria-selected="true"] {
      color: var(--bp-ink);
    }
    .tab[aria-selected="true"]::after {
      content: "";
      position: absolute;
      inset-inline: 10px;
      bottom: 0;
      height: 2px;
      border-radius: 2px;
      background: var(--bp-acc);
    }
    .tab:focus-visible,
    .dbtn:focus-visible,
    .grip:focus-visible,
    .grp-head:focus-visible,
    .reset:focus-visible {
      outline: 2px solid var(--bp-acc);
      outline-offset: -3px;
      border-radius: 6px;
    }
    .bp-grid {
      display: grid;
      grid-template-columns: 18px minmax(0, 1fr);
      position: relative;
      flex: 1 1 auto;
      min-height: 0;
      grid-template-rows: minmax(0, 1fr);
    }
    .bp-grid.has-inspector {
      grid-template-columns: 18px minmax(0, 1fr) 7px var(--iw, 360px);
    }
    .ruler-y {
      border-inline-end: 1px solid var(--bp-hair2);
      background: repeating-linear-gradient(to bottom, var(--bp-hair2) 0 1px, transparent 1px 40px);
      background-size: 8px 100%;
      background-repeat: repeat-y;
      background-position: right top;
    }
    .ruler-x {
      height: 18px;
      border-bottom: 1px solid var(--bp-hair2);
      background: repeating-linear-gradient(to right, var(--bp-hair2) 0 1px, transparent 1px 40px);
      background-size: 100% 8px;
      background-repeat: repeat-x;
      background-position: left bottom;
    }
    .main {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
    }
    .main > .ruler-x {
      flex: none;
    }
    .main > [role="tabpanel"] {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      min-height: 0;
    }
    .main.has-pill {
      --mcu-list-pad: 90px;
    }
    .main.has-pill .rows .row {
      padding-block: calc(2px * var(--z, 1));
    }
    .tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(calc(150px * var(--z, 1)), 1fr));
      gap: 12px;
    }
    .tile {
      display: grid;
      gap: 4px;
      min-width: 0;
      padding: 12px;
      border: 1px solid var(--bp-hair2);
      border-radius: 12px;
      background: var(--bp-sheet);
      color: var(--bp-ink);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }
    .tile:hover {
      border-color: var(--bp-line);
    }
    .tile[aria-current="true"] {
      border-color: var(--bp-acc);
      box-shadow: 0 0 0 1px var(--bp-acc);
    }
    .tile b {
      font-family: var(--bp-mono);
      font-size: 0.78rem;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tile small {
      color: var(--bp-mute);
      font-size: 0.75rem;
    }
    .content .empty {
      padding: 24px 8px;
      border: 0;
      color: var(--bp-mute);
    }
    .main .row {
      border-bottom: 1px solid var(--bp-hair2);
    }
    .main .row:hover {
      background: var(--bp-surf2);
    }
    .row .name {
      color: var(--bp-ink);
    }
    .row .name[aria-current="true"] {
      font-weight: 600;
    }
    .row .name small {
      color: var(--bp-mute);
    }
    .rows-head,
    .rows [role="row"].row {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr) minmax(0, 1fr) minmax(76px, auto);
      align-items: center;
      gap: 10px;
    }
    .rows-head {
      padding: 0 8px;
      border-bottom: 1px solid var(--bp-line);
      color: var(--bp-mute);
      font-family: var(--bp-mono);
      font-size: 0.7rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .sort-col {
      min-width: 0;
    }
    .sort {
      max-width: 100%;
      min-height: 32px;
      padding: 0 4px;
      border: 0;
      border-radius: 4px;
      background: none;
      color: inherit;
      font: inherit;
      letter-spacing: inherit;
      text-transform: inherit;
      text-align: start;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .sort:hover,
    .sort-col[aria-sort="ascending"] .sort,
    .sort-col[aria-sort="descending"] .sort {
      color: var(--bp-ink);
    }
    .sort:focus-visible {
      outline: 2px solid var(--bp-acc);
      outline-offset: 1px;
    }
    .rows [role="row"].row {
      padding: calc(6px * var(--z, 1)) 8px;
      border-radius: 4px;
      font-size: 0.8125rem;
    }
    .rows [role="cell"] {
      min-width: 0;
      overflow: hidden;
      color: var(--bp-mute);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .rows [role="cell"] .name {
      display: block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      padding: 2px 8px;
      border: 1px solid var(--bp-line);
      border-radius: 10px;
      color: var(--bp-mute);
      font-family: var(--bp-mono);
      font-size: 0.6875rem;
      line-height: 1.4;
    }
    .badge.ok {
      border-color: var(--bp-acc);
      color: var(--bp-acc);
    }
    .badge.locked {
      border-color: var(--bp-warn);
      color: var(--bp-warn);
    }
    .warn {
      margin: 0;
      padding: 8px 10px;
      border: 1px solid var(--bp-warn);
      border-inline-start-width: 3px;
      border-radius: 4px;
      color: var(--bp-warn);
      font-size: 0.8125rem;
      line-height: 1.4;
    }
    .help {
      margin: 0;
      color: var(--bp-mute);
      font-size: 0.75rem;
    }
    .forum-preview {
      display: grid;
      place-items: center;
      min-height: 96px;
      padding: 8px;
      border: 1px dashed var(--bp-line);
      border-radius: 4px;
      background: var(--bp-surf2);
      overflow: hidden;
    }
    .forum-preview img {
      display: block;
      max-width: 100%;
      height: auto;
    }
    fieldset.fld {
      min-width: 0;
      margin: 0;
      padding: 0;
      border: 0;
    }
    fieldset.fld legend {
      padding: 0;
      margin-bottom: 4px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    .choice {
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 32px;
      color: var(--bp-ink);
      font-size: 0.8125rem;
      cursor: pointer;
    }
    .choice input {
      margin: 0;
      accent-color: var(--bp-acc);
    }
    .grip {
      cursor: col-resize;
      background: linear-gradient(var(--bp-line), var(--bp-line)) center / 1px 100% no-repeat;
      touch-action: none;
    }
    .grip:hover {
      background-color: var(--bp-surf2);
    }
    .inspector {
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;
      background: var(--bp-sheet);
      border-inline-start: 1px solid var(--bp-line);
      overflow: hidden;
    }
    .ins-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 14px;
      border-bottom: 1px solid var(--bp-hair2);
    }
    .ins-title {
      display: grid;
      min-width: 0;
    }
    .ins-title h2 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ins-title span {
      font-family: var(--bp-mono);
      font-size: 0.75rem;
      color: var(--bp-mute);
    }
    .ins-filter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
      font-size: 0.75rem;
      color: var(--bp-mute);
      border-bottom: 1px solid var(--bp-hair2);
    }
    .sw {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--bp-ink);
      cursor: pointer;
    }
    .ins-scroll {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
    }
    .grp {
      border-bottom: 1px solid var(--bp-hair2);
    }
    .grp-head {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      min-height: 44px;
      padding: 0 14px;
      background: none;
      border: 0;
      color: var(--bp-ink);
      font: inherit;
      text-align: start;
      cursor: pointer;
    }
    .grp-head h3 {
      margin: 0;
      font-size: 0.84rem;
      font-weight: 500;
      flex: none;
    }
    .chev {
      display: inline-flex;
      transition: transform var(--ha-animation-duration-fast, 150ms) ease;
    }
    .grp-head[aria-expanded="true"] .chev {
      transform: rotate(90deg);
    }
    .grp-sum {
      margin-inline-start: auto;
      max-width: 170px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--bp-mono);
      font-size: 0.75rem;
      color: var(--bp-mute);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .swatch {
      width: 12px;
      height: 12px;
      flex: none;
      border-radius: 3px;
      border: 1px solid var(--bp-edge);
    }
    .grp-body {
      display: grid;
      gap: 12px;
      padding: 2px 14px 14px 40px;
    }
    .grp-body[hidden] {
      display: none;
    }
    .fld {
      display: grid;
      gap: 4px;
    }
    .fld-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .fld-label {
      font-size: 0.75rem;
      font-weight: 500;
    }
    .fld-help {
      font-size: 0.75rem;
      color: var(--bp-mute);
    }
    .reset {
      min-height: 24px;
      padding: 0 4px;
      background: none;
      border: 0;
      color: var(--bp-acc);
      font: inherit;
      font-size: 0.75rem;
      cursor: pointer;
    }
    .vh {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    .if {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 8px;
      padding: 12px 14px;
      border-top: 1px solid var(--bp-hair2);
    }
    .density {
      position: fixed;
      inset-inline-end: 16px;
      bottom: 16px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px;
      background: var(--bp-sheet);
      border: 1px solid var(--bp-line);
      border-radius: 999px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
      z-index: 2;
    }
    .density output {
      min-width: 46px;
      text-align: center;
      font-family: var(--bp-mono);
      font-size: 0.75rem;
    }
    .dbtn {
      display: inline-grid;
      place-items: center;
      width: 32px;
      height: 32px;
      padding: 0;
      background: none;
      border: 0;
      border-radius: 50%;
      color: var(--bp-ink);
      cursor: pointer;
    }
    .dbtn:disabled {
      color: var(--bp-mute);
      opacity: 0.5;
      cursor: default;
    }
    .studio-status {
      display: flex;
      justify-content: center;
      padding: 48px 16px;
    }
    .studio-host {
      display: block;
      flex: 1 1 auto;
      min-height: 0;
    }
    .studio-host[hidden],
    .theme-host[hidden] {
      display: none;
    }
    .forum-host[hidden] {
      display: none;
    }
    .library-host,
    .icons-host,
    .images-host,
    .shapes-host {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      min-height: 0;
      padding: 16px;
      overflow-y: auto;
    }
    .library-host[hidden],
    .icons-host[hidden],
    .images-host[hidden],
    .shapes-host[hidden] {
      display: none;
    }
    .images-hint {
      margin: 0;
      padding: 0 16px 16px;
      color: var(--secondary-text-color);
      font-size: 0.875rem;
      line-height: 1.5;
    }
    .editor-host {
      display: block;
      flex: 1 1 auto;
      min-height: 0;
    }
    .editor-notice {
      margin: 16px;
    }
    .shape-note {
      margin: 16px 16px 0;
    }
    .forum-host {
      display: block;
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
    }
    .theme-host {
      display: block;
      flex: 1 1 auto;
      min-height: 0;
    }
    .bar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .bar:not(.content .bar) {
      padding: 8px 16px;
      background: var(--bp-sheet);
      border-bottom: 1px solid var(--bp-line);
    }
    .overlay {
      position: fixed;
      inset: 0;
      background: var(--mc-scrim);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .dialog {
      background: var(--mc-surface);
      color: var(--mc-text);
      border-radius: var(--mc-radius-xl);
      box-shadow: var(--mc-shadow-dialog);
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
      border-left: 1px solid var(--mc-divider);
    }
    .pane-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--mc-text-2);
      border-bottom: 1px solid var(--mc-divider);
      background: var(--mc-surface-2);
    }
    .preview-wrap {
      flex: 1;
      overflow: auto;
      padding: 16px;
      background: var(--mc-ground);
    }
    .preview-host {
      display: block;
      max-width: 100%;
      min-width: 0;
    }
    .item-pic {
      display: grid;
      justify-items: center;
      gap: 8px;
      padding: 12px;
      color: var(--mc-text);
      background: var(--mc-ground);
      border: 1px dashed var(--mc-divider);
    }
    .item-pic img {
      max-width: 100%;
      max-height: 160px;
      object-fit: contain;
    }
    .item-pic small {
      font-family: var(--mc-mono);
      color: var(--mc-text-2);
    }
    .row.current {
      box-shadow: inset 3px 0 0 var(--mc-accent);
      background: var(--mc-accent-tint);
    }
    .preview-note {
      margin-bottom: 12px;
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
      flex: 0 0 240px;
      border-right: 1px solid var(--mc-divider);
    }
    .meta-body {
      padding: 12px;
      display: grid;
      gap: 12px;
      align-content: start;
    }
    @media (max-width: 720px) {
      .dialog-body {
        flex-direction: column;
      }
      .pane + .pane {
        border-left: 0;
        border-top: 1px solid var(--mc-divider);
      }
    }
    .action-dialog {
      max-width: 480px;
    }
    .action-body {
      padding: 16px 20px;
      display: grid;
      gap: 16px;
      overflow: auto;
    }
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 12px 12px 20px;
      border-bottom: 1px solid var(--mc-divider);
    }
    .dialog-title {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .dialog-title-name {
      font-size: 1rem;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .dialog-header-actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .action-footer,
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-top: 1px solid var(--mc-divider);
    }
    .footer-note {
      margin-right: auto;
      min-width: 0;
    }
    .yaml-body {
      margin: 0;
      padding: 16px;
      background: var(--code-editor-background-color, #1e1e1e);
      color: var(--primary-text-color);
      font-family: var(--mc-mono);
      font-size: 0.75rem;
      line-height: 1.5;
      overflow: auto;
      flex: 1;
      min-height: 0;
      white-space: pre;
    }
    :host([data-layout="sheet"]) .bp-grid.has-inspector {
      grid-template-columns: 18px minmax(0, 1fr);
    }
    :host([data-layout="sheet"]) .grip {
      display: none;
    }
    :host([data-layout="sheet"]) .inspector.is-sheet {
      position: fixed;
      inset: 0;
      z-index: 12;
      border-inline-start: 0;
    }
    :host([data-layout="sheet"]) .ruler-y {
      width: 16px;
    }
    :host([data-narrow="true"]) .bp-grid,
    :host([data-narrow="true"]) .bp-grid.has-inspector {
      grid-template-columns: minmax(0, 1fr);
    }
    :host([data-narrow="true"]) .ruler-x,
    :host([data-narrow="true"]) .ruler-y {
      display: none;
    }
    :host([data-narrow="true"]) .content {
      padding: 16px;
    }
    :host([data-narrow="true"]) .tiles {
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    }
    :host([data-narrow="true"]) .main .row {
      min-height: 56px;
    }
    @media (pointer: coarse) {
      .tab {
        height: 44px;
      }
      .dbtn {
        width: 44px;
        height: 44px;
      }
      .reset,
      .grp-head {
        min-height: 44px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .tab,
      .chev {
        transition: none;
      }
    }
  `,
];
