import {
  LitElement,
  html,
  css,
} from "./lit-core.min.js";
import { mcUiKit, glyph } from "./mc-ui-kit.js";
import { i18nFor, setI18nLocale } from "./mc-i18n.js";
import tables from "./mc-i18n-panel.js";

// Messages of the panel (namespace "mcu-panel", contract i18n 1.0.0 r3). The id is the British text; the
// tables are generated (tools/i18n-export.mjs in the Magic Card repository, see VENDORED.md).
const { t: tr, tx: trx, locale } = i18nFor("mcu-panel", tables);

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
// Theme editor (contract theme-editor 1.0.0 in Magic Card, theme-files 1.0.0 in themes_contract.py).
const THEME_EDITOR_FILE = "magic-card-theme-editor.js";
const THEME_EDITOR_TAG = "magic-card-theme-editor";
const THEME_NAME_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const THEME_QUERY_KEY = "theme";
const CMD_THEMES_LIST = "magic_card_utils/themes_list";
const CMD_THEMES_GET = "magic_card_utils/themes_get";
const CMD_THEMES_SAVE = "magic_card_utils/themes_save";
const CMD_THEMES_DELETE = "magic_card_utils/themes_delete";
const CMD_PRESETS_LIST = "magic_card_utils/theme_presets_list";
const CMD_PRESETS_SAVE = "magic_card_utils/theme_presets_save";
const CMD_PRESETS_DELETE = "magic_card_utils/theme_presets_delete";
// Editors in the panel (mcu-library 1.0.0 r4, library_contract.py "Editors in the panel").
const SVG_EDITOR_TAG = "mc-svg-editor";
const SHAPE_STUDIO_TAG = "mc-shape-studio";
const LIBRARY_VIEW_TAG = "mc-library-view";
const EDITORS_MIN_CONTRACT_REVISION = 5; // svg-editor SVG_EDITOR_MCU_MIN_REVISION
// The one gate for the editors: the oldest Magic Card (window.MagicCard.version) that ships them in the panel.
// Minimum Magic Card for the editors (CEO 2026-10-19). See _compareCalVer for how versions are ordered.
const MIN_MAGIC_CARD_FOR_EDITORS = "2026.10.11-beta.1";
const RECENT_ITEMS = 8;
const CMD_ICONS_LIST = "magic_card_utils/icons_list";
const CMD_SHAPES_LIST = "magic_card_utils/shapes_list";
const LIBRARY_ID_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const FOCUS_KEY_RE = /^[A-Za-z0-9_.:-]{1,96}$/;
const msgNoCard = () => tr("Install Magic Card to draw icons and shapes here.");
// The only message about a Magic Card that is too old. Every cause (version, missing loader, contractRevision) ends here.
const msgUpdateCard = () => tr("Drawing icons and shapes here needs Magic Card {version} or newer. Update Magic Card in HACS.", { version: MIN_MAGIC_CARD_FOR_EDITORS });
const msgAdminOnly = () => tr("Only administrators can create or change icons and shapes.");
const msgEditorLoad = () => tr("The editor files could not be loaded from Magic Card. Reload the page and try again.");
/**
 * Compare two Magic Card versions: `YYYY.M.N` with an optional `-pre.release` suffix (and `+build`, ignored).
 * Returns <0, 0, >0, or null when either side is not a version.
 * Rule: the three numbers decide first. With equal numbers a release is newer than any pre-release of it
 * (2026.10.11 > 2026.10.11-beta.1), and two pre-releases compare field by field split on dots: numbers
 * numerically, other text alphabetically, a number below text, a shorter list below a longer one.
 * So 2026.10.11-beta.1 and 2026.10.11 both satisfy a minimum of 2026.10.11-beta.1.
 */
function _compareCalVer(a, b) {
  const parse = (v) => {
    const m = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(typeof v === "string" ? v : "");
    return m ? { n: [+m[1], +m[2], +m[3]], pre: m[4] ? m[4].split(".") : null } : null;
  };
  const x = parse(a);
  const y = parse(b);
  if (!x || !y) return null;
  for (let i = 0; i < 3; i++) if (x.n[i] !== y.n[i]) return x.n[i] - y.n[i];
  if (!x.pre || !y.pre) return x.pre ? -1 : y.pre ? 1 : 0;
  for (let i = 0; i < Math.min(x.pre.length, y.pre.length); i++) {
    const p = x.pre[i];
    const q = y.pre[i];
    if (p === q) continue;
    const pn = /^\d+$/.test(p);
    const qn = /^\d+$/.test(q);
    if (pn && qn) return +p - +q;
    if (pn !== qn) return pn ? -1 : 1;
    return p < q ? -1 : 1;
  }
  return x.pre.length - y.pre.length;
}
const TABS = [
  ["templates", () => tr("Templates")],
  ["animations", () => tr("Animations")],
  ["themes", () => tr("Themes")],
  ["library", () => tr("Library")],
  ["shapes", () => tr("Shapes")],
  ["editors", () => tr("Editors")],
];
// Kept for the page's lifetime: the editor holds the draft and the dashboard trial, and the trial
// bar's "Back to theme editor" re-opens the panel, which builds a new panel element.
let _themeElCache = null;
let _lastTab = null;

/** The deep-linked theme (`?theme=<name>`), if the name is well formed. */
function _themeFromUrl() {
  try {
    const name = new URLSearchParams(window.location.search).get(THEME_QUERY_KEY);
    return name && THEME_NAME_RE.test(name) ? name : null;
  } catch (_err) {
    return null;
  }
}

/** Turn a websocket error ({code, message}) into an Error with `code` and optional `errors`. */
function _toThemeBackendError(err) {
  const src = err && typeof err === "object" ? err : {};
  const out = new Error(
    typeof src.message === "string" && src.message
      ? src.message
      : typeof err === "string"
      ? err
      : tr("Request failed")
  );
  out.code = typeof src.code === "string" && src.code ? src.code : "unknown";
  const list = [src.errors, src.error && src.error.errors, src.data && src.data.errors].find(Array.isArray);
  if (list) {
    out.errors = list
      .filter((f) => f && typeof f === "object")
      .map((f) => ({ path: String(f.path ?? ""), message: String(f.message ?? "") }));
  }
  return out;
}

/**
 * ThemeBackend.presets (theme-editor 1.1.0 ThemePresetStore, mcu-library revision 4) on the theme_presets
 * commands: list() resolves the array, save() the item, remove() nothing.
 */
function _createPresetBackend(call) {
  return {
    list: async () => {
      const res = await call({ type: CMD_PRESETS_LIST });
      return Array.isArray(res && res.theme_presets) ? res.theme_presets : [];
    },
    save: async (preset, baseUpdatedAt) => {
      const msg = { type: CMD_PRESETS_SAVE, theme_preset: preset };
      if (typeof baseUpdatedAt === "string") msg.base_updated_at = baseUpdatedAt;
      const res = await call(msg);
      return res.theme_preset;
    },
    remove: async (id) => {
      await call({ type: CMD_PRESETS_DELETE, theme_preset_id: id });
    },
  };
}

/** ThemeBackend (theme-editor contract) on top of the theme-files websocket commands. */
function _makeCall(getHass) {
  return async (msg) => {
    try {
      return await getHass().callWS(msg);
    } catch (err) {
      throw _toThemeBackendError(err);
    }
  };
}

function _createThemeBackend(getHass) {
  const call = _makeCall(getHass);
  return {
    list: () => call({ type: CMD_THEMES_LIST }),
    get: (name) => call({ type: CMD_THEMES_GET, name }),
    save: (req) => {
      const msg = { type: CMD_THEMES_SAVE, name: req.name, theme: req.theme };
      if (req.overwrite) msg.overwrite = true;
      if (req.base_mtime !== undefined && req.base_mtime !== null) msg.base_mtime = req.base_mtime;
      return call(msg);
    },
    remove: async (name) => {
      await call({ type: CMD_THEMES_DELETE, name });
    },
    presets: _createPresetBackend(call),
  };
}

/** The deep-linked animation (`?animation=<id>`), if the id is well formed. */
function _animationFromUrl() {
  try {
    const id = new URLSearchParams(window.location.search).get("animation");
    return id && ANIMATION_ID_RE.test(id) ? id : null;
  } catch (_err) {
    return null;
  }
}

/** A file next to a magic-card.js URL (same directory and query), or null. */
function _siblingUrl(cardUrl, file) {
  if (!cardUrl) return null;
  const m = /^(.*\/)magic-card\.js(\?.*)?$/.exec(cardUrl);
  return m ? `${m[1]}${file}${m[2] || ""}` : null;
}

// ---- Shapes tab thumbnails. The card's builder is a lazy chunk the panel does not load for a list, so the list
// draws a small outline itself from the stored options (contract custom-shape 1.0.0): a 160 x 100 nominal box,
// free paths with their handles, corner mode with its corner types. It is a hint of the shape, not the exact
// outline (the editor shows that).
const THUMB_W = 160;
const THUMB_H = 100;

/** A coordinate or length: number = px, '<n>', '<n>px', '<p>%', '<p>%+<n>', '<p>%-<n>'; NaN when it is none of them. */
function _shapeLen(v, size) {
  if (typeof v === "number") return Number.isFinite(v) ? v : NaN;
  if (typeof v !== "string") return NaN;
  const m = /^\s*(?:(-?\d+(?:\.\d+)?)%(?:\s*([+-])\s*(\d+(?:\.\d+)?)(?:px)?)?|(-?\d+(?:\.\d+)?)(?:px)?)\s*$/.exec(v);
  if (!m) return NaN;
  if (m[4] !== undefined) return Number(m[4]);
  return (Number(m[1]) / 100) * size + (m[3] === undefined ? 0 : (m[2] === "-" ? -1 : 1) * Number(m[3]));
}

const _r1 = (n) => Math.round(n * 10) / 10;

function _freeOutline(points) {
  const pts = [];
  for (const q of points) {
    if (!q || typeof q !== "object") return "";
    const x = _shapeLen(q.x, THUMB_W);
    const y = _shapeLen(q.y, THUMB_H);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return "";
    const h = (a) => (Array.isArray(a) && Number.isFinite(a[0]) && Number.isFinite(a[1]) && (a[0] || a[1]) ? a : null);
    pts.push({ x: Math.min(THUMB_W, Math.max(0, x)), y: Math.min(THUMB_H, Math.max(0, y)), in: h(q.in), out: h(q.out) });
  }
  if (pts.length < 3) return "";
  const c = (n, max) => _r1(Math.min(max, Math.max(0, n)));
  const seg = (a, b) =>
    a.out || b.in
      ? `C${c(a.x + (a.out ? a.out[0] : 0), THUMB_W)} ${c(a.y + (a.out ? a.out[1] : 0), THUMB_H)} ${c(b.x + (b.in ? b.in[0] : 0), THUMB_W)} ${c(b.y + (b.in ? b.in[1] : 0), THUMB_H)} ${_r1(b.x)} ${_r1(b.y)}`
      : `L${_r1(b.x)} ${_r1(b.y)}`;
  let d = `M${_r1(pts[0].x)} ${_r1(pts[0].y)}`;
  for (let i = 1; i < pts.length; i++) d += seg(pts[i - 1], pts[i]);
  const last = pts[pts.length - 1];
  if (last.out || pts[0].in) d += seg(last, pts[0]);
  return d + "Z";
}

function _cornerOutline(o) {
  const w = THUMB_W;
  const h = THUMB_H;
  const base = o.corner === undefined ? NaN : _shapeLen(o.corner, Math.min(w, h));
  const baseType = typeof o.corner_type === "string" ? o.corner_type : "";
  const one = (key) => {
    const raw = o.corners && typeof o.corners === "object" ? o.corners[key] : undefined;
    let type = baseType;
    let size = base;
    if (typeof raw === "string" && /^[a-z]+$/.test(raw)) type = raw;
    else if (typeof raw === "number" || typeof raw === "string") size = _shapeLen(raw, Math.min(w, h));
    else if (raw && typeof raw === "object") {
      if (typeof raw.type === "string") type = raw.type;
      if (raw.size !== undefined) size = _shapeLen(raw.size, Math.min(w, h));
    }
    if (!Number.isFinite(size)) size = type ? 16 : 0;
    return { type: type || "round", s: Math.max(0, size) };
  };
  const k = { tl: one("tl"), tr: one("tr"), br: one("br"), bl: one("bl") };
  const f = Math.min(1, w / ((k.tl.s + k.tr.s) || 1), w / ((k.bl.s + k.br.s) || 1), h / ((k.tl.s + k.bl.s) || 1), h / ((k.tr.s + k.br.s) || 1));
  for (const c of Object.values(k)) c.s = _r1(c.s * f);
  let d = "";
  let cx = NaN;
  let cy = NaN;
  const go = (cmd, x, y) => {
    x = _r1(x);
    y = _r1(y);
    if (cmd !== "M" && x === cx && y === cy) return;
    d += `${cmd}${x} ${y}`;
    cx = x;
    cy = y;
  };
  const corner = (c, ax, ay, bx, by, ix, iy, kx, ky) => {
    go("L", ax, ay);
    if (c.type === "bevel") go("L", bx, by);
    else if (c.type === "notch") (go("L", ix, iy), go("L", bx, by));
    else if (c.type === "square" || !c.s) (go("L", kx, ky), go("L", bx, by));
    else {
      d += `A${c.s} ${c.s} 0 0 ${c.type === "scoop" ? 0 : 1} ${_r1(bx)} ${_r1(by)}`;
      cx = _r1(bx);
      cy = _r1(by);
    }
  };
  go("M", 0, k.tl.s);
  corner(k.tl, 0, k.tl.s, k.tl.s, 0, k.tl.s, k.tl.s, 0, 0);
  corner(k.tr, w - k.tr.s, 0, w, k.tr.s, w - k.tr.s, k.tr.s, w, 0);
  corner(k.br, w, h - k.br.s, w - k.br.s, h, w - k.br.s, h - k.br.s, w, h);
  corner(k.bl, k.bl.s, h, 0, h - k.bl.s, k.bl.s, h - k.bl.s, 0, h);
  return d + "Z";
}

/** { d, count }: an SVG path in a 160 x 100 box ('' when the options cannot be drawn) and the number of free-path points (0 in corner mode). */
function _shapeOutline(o) {
  if (!o || typeof o !== "object") return { d: "", count: 0 };
  try {
    if (o.points !== undefined) {
      return Array.isArray(o.points) ? { d: _freeOutline(o.points), count: o.points.length } : { d: "", count: 0 };
    }
    return { d: _cornerOutline(o), count: 0 };
  } catch (e) {
    return { d: "", count: 0 };
  }
}

const SVG_NS = "http://www.w3.org/2000/svg";

/** The row thumbnail: decorative, in the text colour. */
function _shapeThumb(id, d) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${THUMB_W} ${THUMB_H}`);
  svg.setAttribute("width", "48");
  svg.setAttribute("height", "30");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("class", "mcu-thumb");
  svg.setAttribute("data-id", id);
  svg.setAttribute("style", "flex:none;margin-inline-end:10px;color:var(--secondary-text-color,#727272)");
  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("d", d);
  path.setAttribute("fill", "currentColor");
  path.setAttribute("fill-opacity", "0.18");
  path.setAttribute("stroke", "currentColor");
  path.setAttribute("stroke-width", "6");
  path.setAttribute("stroke-linejoin", "round");
  svg.appendChild(path);
  return svg;
}

/** The row extra for <mc-library-view>.rowExtra: the outline thumbnail and the point count of a saved shape. `cache` keeps one node per id and shape. */
function _shapeRowExtra(byId, cache, kind, id) {
  const shape = kind === "shape" ? byId.get(id) : null;
  if (!shape) return undefined;
  const hit = cache.get(id);
  if (hit && hit.shape === shape) return hit.extra;
  const { d, count } = _shapeOutline(shape);
  const extra = {
    thumb: d ? _shapeThumb(id, d) : undefined,
    meta: count ? tr("{n, plural, one {# point} other {# points}}", { n: count }) : tr("Corner shape"),
  };
  cache.set(id, { shape, extra });
  return extra;
}

/** The newest `limit` items by updated_at (ISO strings sort as text); anything that is not an item is skipped. */
function _recentItems(list, limit) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((i) => i && typeof i === "object" && typeof i.id === "string" && i.id)
    .sort((a, b) => String(b.updated_at || "").localeCompare(String(a.updated_at || "")))
    .slice(0, limit);
}

/** First element with this data-focus-key, looking through open shadow roots. */
function _deepFindByFocusKey(root, key) {
  if (!root || !FOCUS_KEY_RE.test(key)) return null;
  const hit = root.querySelector(`[data-focus-key="${key}"]`);
  if (hit) return hit;
  for (const el of root.querySelectorAll("*")) {
    if (el.shadowRoot) {
      const found = _deepFindByFocusKey(el.shadowRoot, key);
      if (found) return found;
    }
  }
  return null;
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
      _editError: { type: String, state: true },
      _submitting: { type: Boolean, state: true },
      // animations tab
      _tab: { type: String, state: true }, // 'templates' | 'animations'
      _animStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _animMessage: { type: String, state: true },
      _animError: { type: String, state: true },
      // themes tab
      _themeStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _themeMessage: { type: String, state: true },
      // library and editors tabs
      _libraryStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _libraryMessage: { type: String, state: true },
      _shapesStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _shapesMessage: { type: String, state: true },
      _shapeSavedNote: { type: Boolean, state: true },
      _editorOpen: { type: Boolean, state: true },
      _editorBusy: { type: Boolean, state: true },
      _editorNotice: { type: String, state: true },
      _recent: { type: Object, state: true },
      _recentError: { type: String, state: true },
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
    this._selectedTheme = _themeFromUrl();
    this._tab = this._selectedAnimation
      ? "animations"
      : this._selectedTheme || (_themeElCache && _lastTab === "themes")
      ? "themes"
      : "templates";
    this._themeStatus = "";
    this._themeMessage = "";
    this._themeEl = null;
    this._animations = {};
    this._animStatus = "";
    this._animMessage = "";
    this._animError = "";
    this._studioEl = null;
    // library and editors tabs
    this._libraryStatus = "";
    this._libraryMessage = "";
    this._libraryEl = null;
    this._libraryStale = false;
    this._shapesStatus = "";
    this._shapesMessage = "";
    this._shapeSavedNote = false;
    this._shapesEl = null;
    this._editorOpen = false;
    this._editorBusy = false;
    this._editorNotice = "";
    this._editorEl = null;
    this._editorOpener = null;
    this._editorFocusKey = "";
    this._recent = { icons: [], shapes: [] };
    this._recentError = "";
    this._recentLoaded = false;
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
    this._editError = "";
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
      this._previewError = tr("No config to preview.");
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
        tr("No card type available — neither the config nor the template carries a `type`.");
      return;
    }
    // Card helpers only exist once a dashboard has loaded; magic-card can be built directly.
    const isMagicCard = renderConfig.type === "custom:magic-card";
    if (!isMagicCard && typeof window.loadCardHelpers !== "function") {
      this._previewError =
        tr("Lovelace card helpers are unavailable until a dashboard has been opened.");
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
        (err && (err.message || String(err))) || tr("Failed to render preview.");
    }
  }

  updated(changedProps) {
    if (changedProps.has("hass") && this._previewEl && this.hass) {
      this._previewEl.hass = this.hass;
    }
    if (changedProps.has("hass") && this._studioEl && this.hass) {
      this._studioEl.hass = this.hass;
    }
    if (this._themeEl && this.hass && (changedProps.has("hass") || changedProps.has("narrow"))) {
      this._themeEl.hass = this.hass;
      this._themeEl.narrow = !!this.narrow;
    }
    if (changedProps.has("hass") && this.hass) {
      this._syncEditorHass();
      if (this._libraryEl) this._libraryEl.hass = this.hass;
      if (this._shapesEl) this._shapesEl.hass = this.hass;
    }
    if (this._editorOpen) {
      this._attachEditor();
    } else {
      if (this._tab === "library" && this.hass && !this._libraryEl && this._libraryStatus === "") {
        this._mountLibraryView();
      }
      if (this._tab === "library" && this._libraryStatus === "ready") this._attachLibraryView();
      if (this._tab === "shapes" && this.hass && !this._shapesEl && this._shapesStatus === "") {
        this._mountShapesView();
      }
      if (this._tab === "shapes" && this._shapesStatus === "ready") this._attachShapesView();
      if (this._tab === "editors" && this.hass && !this._recentLoaded) this._loadRecent();
    }
    if (this._tab === "themes" && this.hass && !this._themeEl && this._themeStatus === "") {
      this._mountThemeEditor();
    }
    if (this._tab === "themes" && this._themeStatus === "ready") this._attachThemeEditor();
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
          ? tr("Magic Card could not be loaded from {url}.", { url: this._magicCardUrl })
          : tr("Magic Card isn't installed. Install it from HACS and add it as a dashboard resource."),
      };
    }
    const api = window.MagicCard;
    if (api && !(Number(api.apiVersion) >= MIN_MAGIC_CARD_API)) {
      return {
        ok: false,
        message:
          tr("Magic Card {version} is too old for Magic Card Utils (needs API version {min} or newer). Update Magic Card.", { version: String(api.version || ""), min: String(MIN_MAGIC_CARD_API) }),
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
        message = tr("The Magic Card editor could not be loaded.");
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
    this._editError = "";
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
    if (!name) {
      this._editError = tr("Name is required.");
      return;
    }
    const renamed = this._viewRow && name !== this._viewRow.name;
    if (renamed && this._templates.some((t) => t.name === name)) {
      this._editError = tr("A template named '{name}' already exists.", { name });
      return;
    }
    const payload = {
      type: "magic_card_utils/save_template",
      name,
      template: {
        config: this._editConfig,
        description: meta.description || "",
      },
    };
    if (meta.card_type) payload.card_type = meta.card_type;
    if (renamed) payload.old_name = this._viewRow.name;
    this._submitting = true;
    this._editError = "";
    try {
      await this.hass.callWS(payload);
      this._closeOverlay();
    } catch (err) {
      console.error("[magic_card_utils] save failed", err);
      this._editError = this._wsErrorMessage(err, tr("The template could not be saved."));
    } finally {
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
    let candidate = tr("{name} (copy)", { name: base });
    let i = 2;
    while (existing.has(candidate)) {
      candidate = tr("{name} (copy {n})", { name: base, n: i });
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
      this._actionError = tr("Name is required.");
      return;
    }
    if (this._templates.some((t) => t.name === newName)) {
      this._actionError = tr("A template named '{name}' already exists.", { name: newName });
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
        (err && (err.message || err.code)) || tr("Duplicate failed");
      this._submitting = false;
    }
  }

  async _submitDelete() {
    if (this._submitting) return;
    const row = this._actionRow;
    if (!row) return;
    if (row.linked_cards > 0) {
      this._actionError = tr("{n, plural, one {Cannot delete — still linked to # card.} other {Cannot delete — still linked to # cards.}}", { n: row.linked_cards });
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
        (err && (err.message || err.code)) || tr("Delete failed");
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
    this._shapeSavedNote = false;
    _lastTab = tab;
    this._syncTabQuery(tab);
  }

  /** Keep only the active tab's deep-link key in the URL. */
  _syncTabQuery(tab) {
    try {
      const url = new URL(window.location.href);
      // No open theme (list view, Back, delete) means no `?theme=`, or the rebuilt panel re-opens it.
      if (tab !== "themes" || !this._selectedTheme) url.searchParams.delete(THEME_QUERY_KEY);
      else url.searchParams.set(THEME_QUERY_KEY, this._selectedTheme);
      if (tab !== "animations") url.searchParams.delete("animation");
      else if (this._selectedAnimation) url.searchParams.set("animation", this._selectedAnimation);
      if (url.href !== window.location.href) window.history.replaceState(window.history.state, "", url);
    } catch (_err) {
      // The deep link just isn't updated.
    }
  }

  _onTabKeydown(e) {
    const i = TABS.findIndex(([t]) => t === this._tab);
    let j;
    if (e.key === "ArrowRight") j = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") j = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = TABS.length - 1;
    else return;
    e.preventDefault();
    const next = TABS[j][0];
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
        const url = _siblingUrl(this._magicCardUrl, STUDIO_FILE);
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
          tr("The animation studio could not be loaded. It ships with Magic Card as {file}: update Magic Card to a version that includes it.", { file: STUDIO_FILE }),
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
      this._animMessage = tr("The animation library could not be loaded.");
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
      this._animError = this._wsErrorMessage(err, tr("The animation could not be saved"));
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
      this._animError = this._wsErrorMessage(err, tr("The animation could not be deleted"));
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
        ? html`<div class="content">
            <div class="notice error" role="alert">
              ${glyph("error", 20)}
              <div class="body"><p>${this._animError}</p></div>
              <button type="button" class="icon-btn sm close-btn" aria-label=${tr("Dismiss")} title=${tr("Dismiss")} @click=${() => (this._animError = "")}>${glyph("close")}</button>
            </div>
          </div>`
        : ""}
      ${this._animStatus === "loading" || this._animStatus === ""
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : ""}
      ${this._animStatus === "error"
        ? html`<div class="content">
            <div class="notice error" role="alert">
              ${glyph("error", 20)}
              <div class="body">
                <p>${this._animMessage}</p>
                <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._mountAnimationStudio()}>${tr("Try again")}</button></div>
              </div>
            </div>
          </div>`
        : ""}
      <div class="studio-host" ?hidden=${this._animStatus !== "ready"}></div>
    `;
  }

  // ---- Themes tab ---------------------------------------------------------

  /**
   * Load Magic Card, then the theme editor from the same folder (only when the tab opens).
   * Resolves to `{ ok: true }` or `{ ok: false, message }`.
   */
  async _ensureThemeEditor() {
    const status = await this._ensureMagicCard();
    if (!status.ok) return status;
    if (!customElements.get(THEME_EDITOR_TAG)) {
      if (!this._themeLoad) {
        this._themeLoad = (async () => {
          const url = _siblingUrl(this._magicCardUrl, THEME_EDITOR_FILE);
          if (!url) return;
          try {
            await import(url);
          } catch (err) {
            console.warn("[magic_card_utils] theme editor not loaded from", url, err);
          }
        })();
      }
      await this._themeLoad;
    }
    const ctor = customElements.get(THEME_EDITOR_TAG);
    if (!ctor) {
      this._themeLoad = undefined; // allow a retry
      return {
        ok: false,
        message:
          tr("The theme editor could not be loaded. It ships with Magic Card as {file}: update Magic Card to {version} or newer.", { file: THEME_EDITOR_FILE, version: "2026.10.06" }),
      };
    }
    const major = parseInt(String(ctor.contractVersion || "").split(".")[0], 10);
    if (major !== 1) {
      return {
        ok: false,
        message:
          tr("This Magic Card Utils version doesn't match the theme editor in Magic Card. Update both to their latest versions."),
      };
    }
    return { ok: true };
  }

  async _mountThemeEditor() {
    if (this._themeEl || this._themeStatus === "loading") return;
    this._themeStatus = "loading";
    this._themeMessage = "";
    let el = _themeElCache;
    if (!el) {
      const status = await this._ensureThemeEditor();
      if (!status.ok) {
        this._themeStatus = "error";
        this._themeMessage = status.message;
        return;
      }
      el = document.createElement(THEME_EDITOR_TAG);
      el.backend = _createThemeBackend(() => (_themeElCache && _themeElCache.hass) || this.hass);
      el.selectedName = this._selectedTheme;
      _themeElCache = el;
    } else if (this._selectedTheme) {
      el.selectedName = this._selectedTheme;
    }
    // A reused element may still carry the listener of an earlier panel instance; replace it.
    if (el._mcuSelectListener) el.removeEventListener("mc-theme-select", el._mcuSelectListener);
    el._mcuSelectListener = (e) => this._onThemeSelect(e);
    el.addEventListener("mc-theme-select", el._mcuSelectListener);
    el.hass = this.hass;
    el.narrow = !!this.narrow;
    this._themeEl = el;
    this._themeStatus = "ready";
    await this.updateComplete;
    this._attachThemeEditor();
  }

  /** The editor element is kept across tab switches; put it (back) into the tab's host. */
  _attachThemeEditor() {
    const host = this.shadowRoot.querySelector(".theme-host");
    if (!host || !this._themeEl || this._themeEl.parentNode === host) return;
    host.innerHTML = "";
    host.appendChild(this._themeEl);
  }

  /** `mc-theme-select`, detail `{ name }` (or null): keeps `?theme=` in the URL in sync. */
  _onThemeSelect(e) {
    const name = e.detail && e.detail.name;
    this._selectedTheme = typeof name === "string" && THEME_NAME_RE.test(name) ? name : null;
    this._syncTabQuery("themes");
  }

  _renderThemesTab() {
    return html`
      ${this._themeStatus === "loading" || this._themeStatus === ""
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : ""}
      ${this._themeStatus === "error"
        ? html`<div class="content">
            <div class="notice error" role="alert">
              ${glyph("error", 20)}
              <div class="body">
                <p>${this._themeMessage}</p>
                <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._retryThemes()}>${tr("Try again")}</button></div>
              </div>
            </div>
          </div>`
        : ""}
      <div class="theme-host" ?hidden=${this._themeStatus !== "ready"}></div>
    `;
  }

  _retryThemes() {
    this._themeStatus = "";
    this._themeMessage = "";
  }

  // ---- Library and Editors tabs ---------------------------------------------

  /**
   * Load Magic Card, then what the Library tab ('library') or an editor ('icon' / 'shape') needs from it,
   * and check the version. Resolves to `{ ok: true }` or `{ ok: false, message }`.
   */
  async _ensureEditors(what) {
    const card = await this._ensureMagicCard();
    if (!card.ok) {
      // Not registered: not installed (no resource) or a genuine load failure (its own plain message).
      if (!customElements.get(CARD_TAG)) return { ok: false, message: this._magicCardUrl ? card.message : msgNoCard() };
      return { ok: false, message: msgUpdateCard() }; // there, but too old to speak the panel contract
    }
    // The one version gate. A Magic Card that exposes no version predates the editors.
    const cmp = _compareCalVer(window.MagicCard && window.MagicCard.version, MIN_MAGIC_CARD_FOR_EDITORS);
    if (cmp === null || cmp < 0) return { ok: false, message: msgUpdateCard() };
    if (typeof window.MagicCard.loadEditor !== "function") return { ok: false, message: msgUpdateCard() };
    const loader = what === "library" ? "loadTransfer" : what === "shape" ? "loadShapeEditor" : "loadSvgEditor";
    try {
      if (!(await window.MagicCard.loadEditor())) return { ok: false, message: msgEditorLoad() };
      // The editor chunk adds the loaders to window.MagicCard: read it again, never keep the object from before.
      const mc = window.MagicCard;
      if (!mc || typeof mc[loader] !== "function") return { ok: false, message: msgUpdateCard() };
      if (!(await mc[loader]())) return { ok: false, message: msgEditorLoad() };
    } catch (err) {
      console.warn("[magic_card_utils] editor chunk not loaded", err);
      return { ok: false, message: msgEditorLoad() };
    }
    const tag = what === "library" ? LIBRARY_VIEW_TAG : what === "shape" ? SHAPE_STUDIO_TAG : SVG_EDITOR_TAG;
    const ctor = customElements.get(tag);
    if (!ctor) return { ok: false, message: msgEditorLoad() };
    // Internal sanity check, never worded as a revision: an element without contractRevision >= 5 is an old build.
    if (!(Number(ctor.contractRevision) >= EDITORS_MIN_CONTRACT_REVISION)) return { ok: false, message: msgUpdateCard() };
    return { ok: true };
  }

  _isAdmin() {
    return !!(this.hass && this.hass.user && this.hass.user.is_admin);
  }

  _syncEditorHass() {
    if (this._editorEl && this.hass) this._editorEl.hass = this.hass;
  }

  _findByFocusKey(key) {
    return _deepFindByFocusKey(this.shadowRoot, key);
  }

  _tabButton(tab) {
    return this.shadowRoot.querySelector(`.tab[data-tab="${tab}"]`);
  }

  /**
   * The editor shell, shared by both tabs. `kind` is 'icon' or 'shape', `id` a saved item to edit
   * (none = new), `opener` the control to return focus to.
   */
  async _openEditor({ kind, id, opener } = {}) {
    if (this._editorOpen || this._editorBusy) return;
    if (kind !== "icon" && kind !== "shape") return;
    if (id !== undefined && !(typeof id === "string" && LIBRARY_ID_RE.test(id))) return;
    if (!this._isAdmin()) {
      // The save commands are admin-only; the Library view shows its buttons to everyone.
      this._editorNotice = msgAdminOnly();
      return;
    }
    this._editorBusy = true;
    this._editorNotice = "";
    this._shapeSavedNote = false;
    try {
      const status = await this._ensureEditors(kind);
      if (!status.ok) {
        this._editorNotice = status.message;
        return;
      }
      let value;
      if (kind === "shape" && id) {
        let res;
        try {
          res = await this.hass.callWS({ type: CMD_SHAPES_LIST });
        } catch (_err) {
          this._editorNotice = tr("That shape could not be read. Try again.");
          return;
        }
        const item = Array.isArray(res && res.shapes) ? res.shapes.find((s) => s && s.id === id) : null;
        if (!item) {
          this._editorNotice = tr("That shape no longer exists.");
          this._loadRecent();
          return;
        }
        value = { shape: "custom", shape_options: item.shape };
      }
      const el = document.createElement(kind === "icon" ? SVG_EDITOR_TAG : SHAPE_STUDIO_TAG);
      el.host = "mcu";
      el.hass = this.hass;
      el.libraryAvailable = true;
      if (kind === "icon") {
        el.source = id ? { kind: "library", id } : { kind: "blank" };
        if (id) el.savedId = id;
      } else {
        if (value) {
          el.value = value;
          el.savedId = id; // the studio updates this item (base_updated_at) instead of creating one
        }
        el.customShapes = {};
      }
      const onSaved = () => this._onEditorSaved();
      const onClose = () => this._closeEditor();
      const [saveEvent, closeEvent] = kind === "icon" ? ["mc-svg-save", "mc-svg-close"] : ["mc-shape-save", "mc-shape-close"];
      el.addEventListener(saveEvent, onSaved);
      el.addEventListener(closeEvent, onClose);
      this._editorListeners = [[saveEvent, onSaved], [closeEvent, onClose]];
      const rawKey = opener && typeof opener.getAttribute === "function" ? opener.getAttribute("data-focus-key") : "";
      this._editorFocusKey = rawKey && FOCUS_KEY_RE.test(rawKey) ? rawKey : "";
      this._editorOpener = opener || null;
      this._editorEl = el;
      this._editorKind = kind;
      this._editorOpen = true;
      await this.updateComplete;
      this._attachEditor();
      el.tabIndex = -1;
      if (typeof el.focus === "function") el.focus({ preventScroll: true });
    } finally {
      this._editorBusy = false;
    }
  }

  /** Put the editor element into the shell's host (the host exists once the tab content is hidden). */
  _attachEditor() {
    const host = this.shadowRoot.querySelector(".editor-host");
    if (!host || !this._editorEl || this._editorEl.parentNode === host) return;
    host.appendChild(this._editorEl);
  }

  /** A save keeps the editor open; the lists behind it are refreshed. */
  _onEditorSaved() {
    if (this._editorKind === "shape") this._shapeSavedNote = true;
    this._libraryStale = true;
    this._loadRecent();
  }

  async _closeEditor() {
    const el = this._editorEl;
    if (!el) return;
    for (const [type, fn] of this._editorListeners || []) el.removeEventListener(type, fn);
    this._editorListeners = [];
    if (el.parentNode) el.parentNode.removeChild(el);
    const opener = this._editorOpener;
    const key = this._editorFocusKey;
    this._editorEl = null;
    this._editorOpener = null;
    this._editorFocusKey = "";
    this._editorOpen = false;
    if (this._libraryStale) {
      // The Library view has no refresh call: build a fresh one for the changed lists.
      this._libraryStale = false;
      this._libraryEl = null;
      if (this._libraryStatus !== "error") this._libraryStatus = "";
      this._shapesEl = null;
      if (this._shapesStatus !== "error") this._shapesStatus = "";
    }
    await this.updateComplete;
    await this._restoreFocus(opener, key);
  }

  /** Focus the opener, else its replacement (same data-focus-key), else the current tab. */
  async _restoreFocus(opener, key) {
    let target = opener && opener.isConnected ? opener : null;
    for (let i = 0; !target && key && i < 20; i++) {
      target = this._findByFocusKey(key);
      if (!target) await new Promise((r) => setTimeout(r, 50));
    }
    if (!target) target = this._tabButton(this._tab);
    if (target && typeof target.focus === "function") target.focus();
  }

  /** `mc-library-open` from <mc-library-view>: detail { kind: 'icon' | 'shape', id? }. */
  _onLibraryOpen(e) {
    const d = e && e.detail;
    if (!d || (d.kind !== "icon" && d.kind !== "shape")) return;
    if (d.id !== undefined && !(typeof d.id === "string" && LIBRARY_ID_RE.test(d.id))) return;
    // The view fires the event on itself, so the control that was used is the one holding focus.
    const path = typeof e.composedPath === "function" ? e.composedPath() : [];
    const opener = path.find((n) => n && n.tagName === "BUTTON") || this._deepActiveElement();
    this._openEditor({ kind: d.kind, id: d.id, opener });
  }

  /** The focused element, looking through open shadow roots (null when nothing but the page has focus). */
  _deepActiveElement() {
    let a = document.activeElement;
    while (a && a.shadowRoot && a.shadowRoot.activeElement) a = a.shadowRoot.activeElement;
    return a && a !== document.body ? a : null;
  }

  async _loadRecent() {
    this._recentLoaded = true;
    if (!this.hass) return;
    try {
      const [icons, shapes] = await Promise.all([
        this.hass.callWS({ type: CMD_ICONS_LIST }),
        this.hass.callWS({ type: CMD_SHAPES_LIST }),
      ]);
      this._recent = {
        icons: _recentItems(icons && icons.icons, RECENT_ITEMS),
        shapes: _recentItems(shapes && shapes.shapes, RECENT_ITEMS),
      };
      this._recentError = "";
    } catch (err) {
      console.warn("[magic_card_utils] recent items not loaded", err);
      this._recentError = tr("Your saved icons and shapes could not be loaded.");
    }
  }

  async _mountLibraryView() {
    if (this._libraryEl || this._libraryStatus === "loading") return;
    this._libraryStatus = "loading";
    this._libraryMessage = "";
    const status = await this._ensureEditors("library");
    if (!status.ok) {
      this._libraryStatus = "error";
      this._libraryMessage = status.message;
      return;
    }
    const el = document.createElement(LIBRARY_VIEW_TAG);
    el.context = "mcu-panel";
    el.hass = this.hass;
    el.presets = _createPresetBackend(_makeCall(() => this.hass));
    el.addEventListener("mc-library-open", (e) => this._onLibraryOpen(e));
    this._libraryEl = el;
    this._libraryStatus = "ready";
    await this.updateComplete;
    this._attachLibraryView();
  }

  /** The Shapes tab: the same Library view, narrowed to the shapes kind (it keeps New shape, Edit, Rename, Delete, Export). */
  async _mountShapesView() {
    if (this._shapesEl || this._shapesStatus === "loading") return;
    this._shapesStatus = "loading";
    this._shapesMessage = "";
    const status = await this._ensureEditors("library");
    if (!status.ok) {
      this._shapesStatus = "error";
      this._shapesMessage = status.message;
      return;
    }
    const el = document.createElement(LIBRARY_VIEW_TAG);
    el.context = "mcu-panel";
    el.kinds = ["shape"];
    el.hass = this.hass;
    el.presets = _createPresetBackend(_makeCall(() => this.hass));
    el.addEventListener("mc-library-open", (e) => this._onLibraryOpen(e));
    this._shapesEl = el;
    this._shapesStatus = "ready";
    await this.updateComplete;
    this._attachShapesView();
    this._wireShapeRows(el);
  }

  _attachShapesView() {
    const host = this.shadowRoot.querySelector(".shapes-host");
    if (!host || !this._shapesEl || this._shapesEl.parentNode === host) return;
    host.innerHTML = "";
    host.appendChild(this._shapesEl);
  }

  /** What an edit of a saved shape does to cards, as the card resolves it (a ref follows the library, an own copy stays). */
  _shapeCopyNote() {
    return tr(
      "Cards that picked this shape from the library follow your changes. A card that holds its own copy, such as a shape drawn in the card editor, keeps its points. To use this version there, pick the shape again under My shapes in the card editor."
    );
  }

  /** After a shape save, on the tab the user returns to (the editor covers the whole page, so a line inside the shell would be hidden). */
  _shapeSavedText() {
    return tr(
      "Saved to the library. Cards with their own copy of this shape keep it. To use this version in such a card, pick the shape again under My shapes in the card editor."
    );
  }

  _renderShapeNote(text, role) {
    return html`<div class="notice info shape-note" role=${role}>
      ${glyph("info", 20)}
      <div class="body"><p>${text}</p></div>
    </div>`;
  }

  /** Outline and point count in the rows of the Shapes tab view, through the view's public `rowExtra`. */
  async _wireShapeRows(el) {
    this._stopShapeRows();
    const cache = new Map();
    let byId = new Map();
    const publish = () => {
      el.rowExtra = (kind, id) => _shapeRowExtra(byId, cache, kind, id);
    };
    const load = async () => {
      try {
        const res = await this.hass.callWS({ type: CMD_SHAPES_LIST });
        byId = new Map();
        for (const it of Array.isArray(res && res.shapes) ? res.shapes : []) {
          if (it && typeof it.id === "string") byId.set(it.id, it.shape);
        }
        publish();
      } catch (e) {
        /* rows stay without a thumbnail */
      }
    };
    let timer = 0;
    const onChanged = (e) => {
      if (!e || !e.detail || e.detail.kind !== "shapes") return;
      clearTimeout(timer);
      timer = setTimeout(load, 300);
    };
    window.addEventListener("mcu-library-changed", onChanged);
    this._shapeRowsStop = () => {
      clearTimeout(timer);
      window.removeEventListener("mcu-library-changed", onChanged);
    };
    await load();
  }

  _stopShapeRows() {
    if (this._shapeRowsStop) this._shapeRowsStop();
    this._shapeRowsStop = null;
  }

  _retryShapes() {
    this._shapesStatus = "";
    this._shapesMessage = "";
  }

  _attachLibraryView() {
    const host = this.shadowRoot.querySelector(".library-host");
    if (!host || !this._libraryEl || this._libraryEl.parentNode === host) return;
    host.innerHTML = "";
    host.appendChild(this._libraryEl);
  }

  _retryLibrary() {
    this._libraryStatus = "";
    this._libraryMessage = "";
  }

  _seeAllInLibrary() {
    this._setTab("library");
    this.updateComplete.then(() => {
      const btn = this._tabButton("library");
      if (btn) btn.focus();
    });
  }

  _renderEditorNotice() {
    return this._editorNotice
      ? html`<div class="notice warn editor-notice" role="alert">
          ${glyph("warn", 20)}
          <div class="body"><p>${this._editorNotice}</p></div>
        </div>`
      : this._editorBusy
      ? html`<div class="studio-status" role="status"><ha-circular-progress active></ha-circular-progress></div>`
      : "";
  }

  _renderLibraryTab() {
    return html`
      ${this._renderEditorNotice()}
      ${this._shapeSavedNote ? this._renderShapeNote(this._shapeSavedText(), "status") : ""}
      ${this._libraryStatus === "loading" || this._libraryStatus === ""
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : ""}
      ${this._libraryStatus === "error"
        ? html`<div class="content">
            <div class="notice error" role="alert">
              ${glyph("error", 20)}
              <div class="body">
                <p>${this._libraryMessage}</p>
                <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._retryLibrary()}>${tr("Try again")}</button></div>
              </div>
            </div>
          </div>`
        : ""}
      <div class="library-host" ?hidden=${this._libraryStatus !== "ready"}></div>
    `;
  }

  _renderShapesTab() {
    return html`
      ${this._renderEditorNotice()}
      ${this._shapesStatus === "loading" || this._shapesStatus === ""
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : ""}
      ${this._shapesStatus === "error"
        ? html`<div class="content">
            <div class="notice error" role="alert">
              ${glyph("error", 20)}
              <div class="body">
                <p>${this._shapesMessage}</p>
                <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._retryShapes()}>${tr("Try again")}</button></div>
              </div>
            </div>
          </div>`
        : ""}
      ${this._shapesStatus === "ready" ? this._renderShapeNote(this._shapeSavedNote ? this._shapeSavedText() : this._shapeCopyNote(), this._shapeSavedNote ? "status" : "note") : ""}
      <div class="shapes-host" ?hidden=${this._shapesStatus !== "ready"}></div>
    `;
  }

  _renderRecent(title, kind, items) {
    return html`
      <section class="recent-section">
      <div class="group-head"><h3>${title}</h3></div>
      ${items.length === 0
        ? html`<div class="empty"><strong>${tr("Nothing saved yet.")}</strong></div>`
        : html`<ul class="recent-list">
            ${items.map(
              (item) => html`<li>
                <span class="recent-name">${item.name || item.id}</span>
                <button
                  class="btn btn-secondary btn-sm"
                  data-focus-key=${`edit-${kind}-${item.id}`}
                  aria-label=${tr("Edit {name}", { name: item.name || item.id })}
                  ?disabled=${this._editorBusy || !this._isAdmin()}
                  @click=${(e) => this._openEditor({ kind, id: item.id, opener: e.currentTarget })}
                >
                  ${tr("Edit")}
                </button>
              </li>`
            )}
          </ul>`}
      </section>
    `;
  }

  _renderEditorsTab() {
    return html`
      <div class="content editors-tab">
        ${this._renderEditorNotice()}
        ${this._recentError
          ? html`<div class="notice error" role="alert">${glyph("error", 20)}<div class="body"><p>${this._recentError}</p></div></div>`
          : ""}
        ${this._isAdmin()
          ? ""
          : html`<div class="notice info" role="status">${glyph("info", 20)}<div class="body"><p>${msgAdminOnly()}</p></div></div>`}
        <div class="editor-actions">
          <button
            class="btn btn-primary"
            data-focus-key="new-icon"
            ?disabled=${this._editorBusy || !this._isAdmin()}
            @click=${(e) => this._openEditor({ kind: "icon", opener: e.currentTarget })}
          >
            ${tr("New icon")}
          </button>
          <button
            class="btn btn-primary"
            data-focus-key="new-shape"
            ?disabled=${this._editorBusy || !this._isAdmin()}
            @click=${(e) => this._openEditor({ kind: "shape", opener: e.currentTarget })}
          >
            ${tr("New shape")}
          </button>
        </div>
        ${this._renderRecent(tr("Recent icons"), "icon", this._recent.icons)}
        ${this._renderRecent(tr("Recent shapes"), "shape", this._recent.shapes)}
        <button class="btn btn-secondary see-all" @click=${() => this._seeAllInLibrary()}>${tr("See all in Library")}</button>
      </div>
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
    this._stopShapeRows();
    const animPending = this._animUnsubPromise;
    this._animUnsubPromise = undefined;
    this._animReady = undefined;
    this._studioEl = null;
    // The editor element survives in _themeElCache; this panel instance just lets go of it.
    if (this._themeEl && this._themeEl.parentNode) this._themeEl.parentNode.removeChild(this._themeEl);
    this._themeEl = null;
    if (this._editorEl) {
      for (const [type, fn] of this._editorListeners || []) this._editorEl.removeEventListener(type, fn);
      if (this._editorEl.parentNode) this._editorEl.parentNode.removeChild(this._editorEl);
    }
    this._editorEl = null;
    this._editorOpen = false;
    this._editorOpener = null;
    this._libraryEl = null;
    this._libraryStale = false;
    if (this._libraryStatus !== "error") this._libraryStatus = "";
    this._shapesEl = null;
    if (this._shapesStatus !== "error") this._shapesStatus = "";
    this._recentLoaded = false;
    if (this._themeStatus !== "error") this._themeStatus = "";
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

  willUpdate(changed) {
    // One locale for the panel and every Magic Card element it hosts (they read the same hass).
    if (changed.has("hass") && this.hass) {
      setI18nLocale(this.hass);
      this.setAttribute("lang", locale());
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

      ${this._editorOpen
        ? html`<div class="editor-host"></div>`
        : html`<div class="tabs" role="tablist" aria-label=${tr("Magic Card Utils")} @keydown=${this._onTabKeydown}>
              ${TABS.map(
                ([tab, label]) => html`<button
                  class="tab"
                  role="tab"
                  data-tab=${tab}
                  aria-selected=${this._tab === tab ? "true" : "false"}
                  tabindex=${this._tab === tab ? "0" : "-1"}
                  @click=${() => this._setTab(tab)}
                >
                  ${label()}
                </button>`
              )}
            </div>

            ${this._tab === "animations"
              ? this._renderAnimationsTab()
              : this._tab === "themes"
              ? this._renderThemesTab()
              : this._tab === "library"
              ? this._renderLibraryTab()
              : this._tab === "shapes"
              ? this._renderShapesTab()
              : this._tab === "editors"
              ? this._renderEditorsTab()
              : this._renderTemplatesTab()}`}
    `;
  }

  _renderTemplatesTab() {
    return html`
      <div class="content">
        ${this._error
          ? html`<div class="notice error" role="alert">${glyph("error", 20)}<div class="body"><p>${this._error}</p></div></div>`
          : ""}
        ${this._templates.length === 0
          ? html`<div class="empty"><strong>${tr("No templates saved yet.")}</strong></div>`
          : html`
              <table class="templates-table">
                <thead>
                  <tr>
                    <th class="col-name">${tr("Name")}</th>
                    <th class="col-type">${tr("Card Type")}</th>
                    <th class="col-linked">${tr("Linked Cards")}</th>
                    <th class="col-date">${tr("Created")}</th>
                    <th class="col-date">${tr("Last Updated")}</th>
                    <th class="col-actions">${tr("Actions")}</th>
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
                              type="button"
                              class="icon-btn sm action-btn studio"
                              title=${tr("Open in studio")}
                              aria-label=${tr("Open {name} in studio", { name: row.name })}
                              @click=${() => this._openStudio(row)}
                            >
                              ${glyph("fullscreen")}
                            </button>
                            <button
                              type="button"
                              class="icon-btn sm action-btn edit"
                              title=${tr("Edit")}
                              aria-label=${tr("Edit {name}", { name: row.name })}
                              @click=${() => this._openTemplate(row)}
                            >
                              ${glyph("pencil")}
                            </button>
                            <button
                              type="button"
                              class="icon-btn sm action-btn duplicate"
                              title=${tr("Duplicate")}
                              aria-label=${tr("Duplicate {name}", { name: row.name })}
                              @click=${() => this._openDuplicate(row)}
                            >
                              ${glyph("copy")}
                            </button>
                            <button
                              type="button"
                              class="icon-btn sm danger action-btn"
                              title=${row.linked_cards > 0
                                ? tr("Cannot delete — {n, plural, one {# linked card} other {# linked cards}}", { n: row.linked_cards })
                                : tr("Delete")}
                              aria-label=${row.linked_cards > 0
                                ? tr("Cannot delete {name}: {n, plural, one {# linked card} other {# linked cards}}", { name: row.name, n: row.linked_cards })
                                : tr("Delete {name}", { name: row.name })}
                              ?disabled=${row.linked_cards > 0}
                              @click=${() => this._openDelete(row)}
                            >
                              ${glyph("delete")}
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
                aria-label=${this._viewMode === "edit" ? tr("Edit Template") : tr("Template Preview")}
                @click=${(e) => e.stopPropagation()}
              >
                <div class="dialog-header">
                  <div class="dialog-title">
                    <span class="dialog-title-name">${this._viewRow.name}</span>
                    ${this._viewRow.card_type
                      ? html`<span class="chip mono">${this._viewRow.card_type}</span>`
                      : ""}
                  </div>
                  <div class="dialog-header-actions">
                    ${this._viewMode === "yaml"
                      ? html`<button type="button" class="icon-btn sm" title=${tr("Edit")} aria-label=${tr("Edit template")} @click=${() => this._openEditTemplate(this._viewRow)}>
                          ${glyph("pencil")}
                        </button>`
                      : ""}
                    <button type="button" class="icon-btn sm close-btn" @click=${this._closeOverlay} title=${tr("Close")} aria-label=${tr("Close")}>${glyph("close")}</button>
                  </div>
                </div>
                <div class="dialog-body">
                  ${this._viewMode === "edit"
                    ? html`
                        <div class="pane metadata-pane">
                          <div class="pane-header">${tr("Template")}</div>
                          <div class="meta-body">
                            <div class="field">
                              <div class="field-head"><label for="mcu-meta-name">${tr("Name")}</label></div>
                              <input id="mcu-meta-name" class="input" type="text" .value=${this._editMeta.name}
                                @input=${(e) => (this._editMeta = { ...this._editMeta, name: e.target.value })} />
                            </div>
                            <div class="field">
                              <div class="field-head"><label for="mcu-meta-description">${tr("Description")}</label></div>
                              <input id="mcu-meta-description" class="input" type="text" .value=${this._editMeta.description}
                                @input=${(e) => (this._editMeta = { ...this._editMeta, description: e.target.value })} />
                            </div>
                            <div class="field">
                              <div class="field-head"><label for="mcu-meta-type">${tr("Card Type")}</label></div>
                              <input id="mcu-meta-type" class="input mono" type="text" placeholder=${"custom:magic-card"} .value=${this._editMeta.card_type}
                                @input=${(e) => (this._editMeta = { ...this._editMeta, card_type: e.target.value })} />
                            </div>
                            <p class="help">${tr("Edit the card using the editor on the right. Its changes are captured live.")}</p>
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
                    <div class="pane-header">${this._viewMode === "edit" ? tr("Editor") : tr("Preview")}</div>
                    ${this._viewMode === "edit"
                      ? html`<div class="editor-host" @config-changed=${this._onEditorConfigChanged}></div>`
                      : html`
                          <div class="preview-wrap">
                            ${this._previewError
                              ? html`<div class="notice error preview-note" role="alert">${glyph("error", 20)}<div class="body"><p>${this._previewError}</p></div></div>`
                              : ""}
                            <div class="preview-host"></div>
                          </div>
                        `}
                  </div>
                </div>
                ${this._viewMode === "edit" ? html`
                  <div class="dialog-footer">
                    ${this._editError
                      ? html`<div class="footer-note"><div class="notice error" role="alert">${glyph("error", 20)}<div class="body"><p>${this._editError}</p></div></div></div>`
                      : ""}
                    <button type="button" class="btn btn-secondary" @click=${this._closeOverlay}>${tr("Cancel")}</button>
                    <button type="button" class="btn btn-primary" @click=${this._saveEditedTemplate} ?disabled=${this._submitting}>${this._submitting ? tr("Saving…") : tr("Save")}</button>
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
                  ? tr("Duplicate template")
                  : tr("Delete template")}
              </span>
              <span class="chip mono">${row.name}</span>
            </div>
            <button
              type="button"
              class="icon-btn sm close-btn"
              @click=${this._closeAction}
              ?disabled=${this._submitting}
              title=${tr("Close")}
              aria-label=${tr("Close")}
            >
              ${glyph("close")}
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
              ? html`<div class="notice error" role="alert">${glyph("error", 20)}<div class="body"><p>${this._actionError}</p></div></div>`
              : ""}
          </div>
          <div class="action-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click=${this._closeAction}
              ?disabled=${this._submitting}
            >
              ${tr("Cancel")}
            </button>
            ${this._actionMode === "duplicate"
              ? html`<button
                  type="button"
                  class="btn btn-primary"
                  @click=${this._submitDuplicate}
                  ?disabled=${this._submitting}
                >
                  ${this._submitting ? tr("Duplicating…") : tr("Duplicate")}
                </button>`
              : ""}
            ${this._actionMode === "delete"
              ? html`<button
                  type="button"
                  class="btn btn-danger"
                  @click=${this._submitDelete}
                  ?disabled=${this._submitting || row.linked_cards > 0}
                >
                  ${this._submitting ? tr("Deleting…") : tr("Delete")}
                </button>`
              : ""}
          </div>
        </div>
      </div>
    `;
  }

  _renderDuplicateForm() {
    return html`
      <div class="field">
        <div class="field-head"><label for="mcu-duplicate-name">${tr("New template name")}</label></div>
        <input
          id="mcu-duplicate-name"
          class="input"
          type="text"
          .value=${this._duplicateName}
          @input=${(e) => (this._duplicateName = e.target.value)}
          ?disabled=${this._submitting}
        />
        <p class="help">${tr("Copies the config, description, and card type. Created and updated timestamps reset to now.")}</p>
      </div>
    `;
  }

  _renderDeleteForm(row) {
    if (row.linked_cards > 0) {
      return html`
        <div class="notice warn" role="status">
          ${glyph("warn", 20)}
          <div class="body">
            <p>${tr("{n, plural, one {This template is still linked to # card and cannot be deleted. Remove the bindings first.} other {This template is still linked to # cards and cannot be deleted. Remove the bindings first.}}", { n: row.linked_cards })}</p>
          </div>
        </div>
      `;
    }
    return html`
      <div>${trx("Delete {name}? This action cannot be undone.", { name: html`<strong>${row.name}</strong>` })}</div>
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
    // The kit first (buttons, fields, notices, icon buttons, chips, empty), then layout only. The page header
    // and the page tab bar are Home Assistant's own chrome (design/10 D6) and keep their HA variables.
    return [
      mcUiKit,
      css`
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
      .content {
        display: grid;
        gap: 12px;
        align-content: start;
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
        overflow-x: auto;
      }
      .tab {
        flex: none;
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
        color: var(--mc-accent-ink, var(--primary-color));
        border-bottom-color: var(--primary-color);
      }
      .tab:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: -4px;
        border-radius: 4px;
      }
      .studio-status {
        display: flex;
        justify-content: center;
        padding: 48px 16px;
      }
      .studio-host {
        display: block;
        height: calc(100vh - 64px - 49px);
        min-height: 480px;
      }
      .studio-host[hidden],
      .theme-host[hidden] {
        display: none;
      }
      .library-host,
      .shapes-host {
        display: block;
        padding: 16px;
      }
      .library-host[hidden],
      .shapes-host[hidden] {
        display: none;
      }
      .editor-host {
        display: block;
        height: calc(100vh - 64px);
        min-height: 480px;
      }
      .editor-notice {
        margin: 16px;
      }
      .shape-note {
        margin: 16px 16px 0;
      }
      .editors-tab {
        gap: 12px;
      }
      .editor-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
      }
      .see-all {
        justify-self: start;
      }
      .recent-section {
        display: grid;
        gap: 8px;
        margin-top: 12px;
      }
      .recent-list {
        justify-self: stretch;
        list-style: none;
        margin: 0;
        padding: 0;
        background: var(--mc-surface);
        border: 1px solid var(--mc-divider);
        border-radius: var(--mc-radius-lg);
      }
      .recent-list li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        min-height: var(--mc-hit);
        padding: 4px 8px 4px 16px;
        border-bottom: 1px solid var(--mc-divider);
      }
      .recent-list li:last-child {
        border-bottom: none;
      }
      .recent-name {
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .theme-host {
        display: block;
        height: calc(100vh - 64px - 49px);
        min-height: 480px;
      }
      .templates-table {
        width: 100%;
        border-collapse: collapse;
        background: var(--mc-surface);
        border: 1px solid var(--mc-divider);
        border-radius: var(--mc-radius-lg);
        overflow: hidden;
      }
      .templates-table th,
      .templates-table td {
        text-align: left;
        padding: 8px 16px;
        border-bottom: 1px solid var(--mc-divider);
        vertical-align: middle;
      }
      .templates-table tbody tr:last-child td {
        border-bottom: none;
      }
      .templates-table th {
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--mc-text-2);
        background: var(--mc-surface-2);
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
      .template-name {
        font-weight: 500;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
      .secondary {
        font-size: 0.75rem;
        color: var(--mc-text-2);
        margin-top: 2px;
        white-space: normal;
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
    `,
    ];
  }
}

if (!customElements.get("magic-card-utils-panel")) {
  customElements.define("magic-card-utils-panel", MagicCardUtilsPanel);
}

// Test hooks (tests/panel_editors.test.mjs); nothing in Home Assistant reads them.
export const _testing = {
  shapeOutline: _shapeOutline,
  shapeRowExtra: _shapeRowExtra,
  createPresetBackend: _createPresetBackend,
  compareCalVer: _compareCalVer,
  recentItems: _recentItems,
  FOCUS_KEY_RE,
  MIN_MAGIC_CARD_FOR_EDITORS,
  EDITORS_MIN_CONTRACT_REVISION,
  RECENT_ITEMS,
  TABS,
};
