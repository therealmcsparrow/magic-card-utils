import {
  LitElement,
  html,
  css,
} from "./lit-core.min.js";
import { glyph } from "./mc-ui-kit.js";
import {
  DENSITY,
  INSPECTOR,
  draftingStyles,
  fadeFor,
  fitListElement,
  gripKey,
  layoutFor,
  loadPanelFonts,
  modeFor,
  renderBody,
  renderDensityPill,
  renderGrip,
  renderInspector,
  sheetKey,
  shouldOpenSheet,
  stepDensity,
  tabKeyTarget,
  tabWrapTarget,
} from "./mc-panel-drafting.js";
import { setI18nLocale } from "./mc-i18n.js";
import { t as tr, tx as trx, locale } from "./mc-i18n-panel.js";

// Messages of the panel (namespace "mcu-panel"). tr and trx take a key from i18n/en-GB.json; the English is there and the
// tables in mc-i18n-panel.js are generated (tools/i18n-export.mjs in the Magic Card repository, see VENDORED.md).

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
// Forum shot (contract forum-shot 1.0.0 in Magic Card): a lazy entry that sits next to magic-card.js.
const FORUM_SHOT_FILE = "magic-card-forum-shot.js";
const FORUM_SHOT_TAG = "magic-card-forum-shot";
const FORUM_SHOT_MAJOR = 1;
// The oldest Magic Card (window.MagicCard.version) that ships the forum shot entry.
const MIN_MAGIC_CARD_FOR_FORUM_SHOT = "2026.10.12-beta.13";
// The only places a Magic Card file is served from; the forum shot is loaded from the same folder as magic-card.js.
const FORUM_SHOT_BASES = ["/local/", "/hacsfiles/"];
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
const CMD_ICONS_LIST = "magic_card_utils/icons_list";
const CMD_SHAPES_LIST = "magic_card_utils/shapes_list";
// Library images (mcu-library 1.1.0, library_images_contract.py): the oldest Magic Card that opens image sources.
const IMAGES_MIN_CONTRACT_REVISION = 8; // svg-editor SVG_EDITOR_CONTRACT_REVISION that keeps image text in a Google font
const MIN_MAGIC_CARD_FOR_IMAGES = "2026.11.04";
const LIBRARY_ID_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;
const FOCUS_KEY_RE = /^[A-Za-z0-9_.:-]{1,96}$/;
const msgNoCard = () => tr("mcu-panel.panel.install-magic-card-to-draw-icons-and");
// The only message about a Magic Card that is too old. Every cause (version, missing loader, contractRevision) ends here.
const msgUpdateCard = () => tr("mcu-panel.panel.drawing-icons-and-shapes-here-needs", { version: MIN_MAGIC_CARD_FOR_EDITORS });
const msgNoCardImages = () => tr("mcu-panel.panel.install-magic-card-to-draw-images-here");
const msgUpdateImages = () => tr("mcu-panel.panel.drawing-images-here-needs-magic-card", { version: MIN_MAGIC_CARD_FOR_IMAGES });
const msgAdminOnlyImages = () => tr("mcu-panel.panel.only-administrators-can-create-or-change");
const msgAdminOnly = () => tr("mcu-panel.panel.only-administrators-can-create-or-change-2");
const msgUpdateForumShot = () => tr("mcu-panel.panel.the-forum-shot-needs-magic-card-or", { version: MIN_MAGIC_CARD_FOR_FORUM_SHOT });
const MAX_TEMPLATE_IMPORT_BYTES = 5 * 1024 * 1024;
const msgEditorLoad = () => tr("mcu-panel.panel.the-editor-files-could-not-be-loaded");
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
  ["templates", () => tr("mcu-panel.panel.templates")],
  ["library", () => tr("mcu-panel.panel.library")],
  ["animations", () => tr("mcu-panel.panel.animations")],
  ["themes", () => tr("mcu-panel.panel.themes")],
  ["icons", () => tr("mcu-panel.panel.icons")],
  ["shapes", () => tr("mcu-panel.panel.shapes")],
  ["images", () => tr("mcu-panel.panel.images")],
  ["forum-shot", () => tr("mcu-panel.panel.forum-shot")],
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
      : tr("mcu-panel.panel.request-failed")
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

/**
 * The forum shot entry's URL: the sibling of magic-card.js, kept only when it is an http(s) address on the
 * Home Assistant origin under /local/ or /hacsfiles/. Anything else is null and nothing is imported.
 */
function _forumShotUrl(cardUrl) {
  const sibling = _siblingUrl(cardUrl, FORUM_SHOT_FILE);
  if (!sibling) return null;
  try {
    const base = window.location.href;
    const u = new URL(sibling, base);
    if (u.origin !== new URL(base).origin || (u.protocol !== "https:" && u.protocol !== "http:")) return null;
    if (!FORUM_SHOT_BASES.some((b) => u.pathname.startsWith(b))) return null;
    return u.href;
  } catch (_err) {
    return null;
  }
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
    meta: count ? tr("mcu-panel.panel.points", { n: count }) : tr("mcu-panel.panel.corner-shape"),
  };
  cache.set(id, { shape, extra });
  return extra;
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

const ITEM_KINDS = ["preset", "icon", "shape", "image"];
const NUM_RE = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:e-?\d+)?$/i;
const PATH_D_RE = /^[MmLlHhVvCcSsQqTtAaZz0-9eE.,\s+-]*$/;
const PART_TAG_RE = /<(path|circle|rect)(?=[\s/>])/gi;
const MAX_NUM_CHARS = 32;
const MAX_TAG_CHARS = 70000;
const MAX_PARTS = 500;
const DATA_THUMB_RE = /^data:image\/(?:png|webp);base64,[A-Za-z0-9+/=]*$/i;

/** A template result in the SVG namespace (what Lit's `svg` tag returns); the vendored bundle exports only `html`. */
const svg = (strings, ...values) => ({ _$litType$: 2, strings, values });

/** True for a plain number of at most MAX_NUM_CHARS characters; longer values are refused before the pattern runs. */
function _isNum(v) {
  return typeof v === "string" && v.length <= MAX_NUM_CHARS && NUM_RE.test(v);
}

/**
 * The drawable parts of a saved SVG for the inspector picture: its view box and its path, circle and rect
 * elements with plain numeric values. Everything else (scripts, handlers, styles, links) is dropped, so the
 * markup itself never reaches the panel DOM. Every scan moves forward only, so hostile input stays linear.
 */
function _svgParts(text) {
  if (typeof text !== "string" || text.length > 262144) return null;
  const vb = /viewBox\s*=\s*"([^"]{0,200})"/i.exec(text);
  const box = vb ? vb[1].trim().split(/[\s,]+/) : [];
  if (box.length !== 4 || !box.every(_isNum) || !(+box[2] > 0) || !(+box[3] > 0)) return null;
  const attr = (tag, name) => {
    const m = new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, "i").exec(tag);
    return m ? m[1].trim() : "";
  };
  const parts = [];
  let end = -1;
  PART_TAG_RE.lastIndex = 0;
  for (let m = PART_TAG_RE.exec(text); m && parts.length < MAX_PARTS; m = PART_TAG_RE.exec(text)) {
    if (end < m.index) {
      end = text.indexOf(">", m.index);
      if (end < 0) break;
    }
    const next = text.indexOf("<", m.index + 1);
    if ((next >= 0 && next < end) || end - m.index > MAX_TAG_CHARS) continue;
    const tag = text.slice(m.index, end + 1);
    const kind = m[1].toLowerCase();
    if (kind === "path") {
      const d = attr(tag, "d");
      if (d && d.length < 65536 && PATH_D_RE.test(d)) parts.push({ kind, d });
    } else {
      const names = kind === "circle" ? ["cx", "cy", "r"] : ["x", "y", "width", "height"];
      const v = names.map((n) => attr(tag, n) || (n === "x" || n === "y" || n === "cx" || n === "cy" ? "0" : ""));
      if (v.every(_isNum)) parts.push({ kind, v });
    }
  }
  return { viewBox: box.join(" "), w: +box[2], h: +box[3], parts };
}

/**
 * A thumbnail address the inspector may load: a PNG or WebP data URL, a blob URL of this origin, or a path on this
 * origin. Paths are resolved the way the browser resolves them and must stay on this origin; tabs, line breaks and
 * backslashes are refused because the URL parser drops a tab and reads a backslash as a slash, which turns such a path into another host.
 */
function _safeThumb(v) {
  if (typeof v !== "string" || !v || v.length > 2000000) return "";
  if (v.startsWith("data:")) return DATA_THUMB_RE.test(v) ? v : "";
  if (v.length > 2048) return "";
  try {
    const origin = window.location.origin;
    if (v.startsWith("blob:")) return new URL(v).origin === origin ? v : "";
    if (!v.startsWith("/") || v.startsWith("//") || /[\t\n\r\\]/.test(v)) return "";
    return new URL(v, origin).origin === origin ? v : "";
  } catch (_err) {
    return "";
  }
}

class MagicCardUtilsPanel extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      narrow: { type: Boolean },
      route: { type: Object },
      panel: { type: Object },
      _templates: { type: Array, state: true },
      _templateFilter: { type: String, state: true },
      _templateSelected: { type: String, state: true },
      _templatePicked: { state: true },
      _density: { state: true },
      _modifiedOnly: { state: true },
      _inspectorWidth: { state: true },
      _viewWidth: { state: true },
      _sheetOpen: { state: true },
      _openGroups: { state: true },
      _tabFade: { state: true },
      _templateNotice: { state: true },
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
      _animations: { type: Object, state: true },
      _animLoad: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _animFilter: { type: String, state: true },
      _selectedAnimation: { type: String, state: true },
      _studioOpen: { type: Boolean, state: true },
      _themeFiles: { type: Array, state: true },
      _themeListLoad: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _themeFilter: { type: String, state: true },
      _themeListError: { type: String, state: true },
      _selectedTheme: { type: String, state: true },
      _themeEditorOpen: { type: Boolean, state: true },
      _themeDeleteAsk: { type: String, state: true },
      _themeStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _themeMessage: { type: String, state: true },
      _forumStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _forumMessage: { type: String, state: true },
      _forumCards: { state: true },
      _forumListError: { type: String, state: true },
      _forumFilter: { type: String, state: true },
      _forumSort: { state: true },
      _selectedForumCard: { type: String, state: true },
      _forumColours: { type: String, state: true },
      _forumLooks: { type: Boolean, state: true },
      _forumBusy: { type: Boolean, state: true },
      _forumError: { type: String, state: true },
      _forumSaved: { type: Boolean, state: true },
      _forumPreview: { state: true },
      // library, icons and shapes tabs
      _libraryStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _libraryMessage: { type: String, state: true },
      _shapesStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _shapesMessage: { type: String, state: true },
      _shapeSavedNote: { type: Boolean, state: true },
      _editorOpen: { type: Boolean, state: true },
      _editorBusy: { type: Boolean, state: true },
      _editorNotice: { type: String, state: true },
      _iconsStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _iconsMessage: { type: String, state: true },
      _imagesStatus: { type: String, state: true }, // '' | 'loading' | 'ready' | 'error'
      _imagesMessage: { type: String, state: true },
    };
  }

  constructor() {
    super();
    this._templates = [];
    this._templateFilter = "";
    this._templatePicked = new Set();
    this._templateSelected = null;
    this._builtPreviewHost = null;
    this._templateNotice = null;
    this._density = DENSITY.initial;
    this._modifiedOnly = false;
    this._inspectorWidth = INSPECTOR.initial;
    this._viewWidth = typeof window.innerWidth === "number" ? window.innerWidth : 1280;
    this._sheetOpen = false;
    this._openGroups = new Set();
    this._tabFade = "none";
    this._sheetOpener = null;
    this.addEventListener("mc-editor-fullscreen", () => this.requestUpdate());
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
    this._themeFiles = [];
    this._themeListLoad = "";
    this._themeFilter = "";
    this._themeListError = "";
    this._themeDeleteAsk = "";
    this._themeEditorOpen = !!this._selectedTheme || !!(_themeElCache && _lastTab === "themes");
    this._themeEditorOpener = null;
    this._animFilter = "";
    this._animLoad = "";
    this._studioOpen = !!this._selectedAnimation;
    this._studioOpener = null;
    this._forumStatus = "";
    this._forumMessage = "";
    this._forumEl = null;
    this._forumApi = null;
    this._forumCards = null;
    this._forumListError = "";
    this._forumFilter = "";
    this._forumSort = null;
    this._selectedForumCard = null;
    this._forumColours = "both";
    this._forumLooks = false;
    this._forumBusy = false;
    this._forumError = "";
    this._forumSaved = false;
    this._forumPreview = null;
    this._animations = {};
    this._animStatus = "";
    this._animMessage = "";
    this._animError = "";
    this._studioEl = null;
    // library, icons and shapes tabs
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
    this._iconsStatus = "";
    this._iconsMessage = "";
    this._iconsEl = null;
    this._imagesStatus = "";
    this._imagesMessage = "";
    this._imagesEl = null;
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
    if (this._tab === "animations") return this._openAnimationStudio(row);
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

  async _buildPreview(row = this._viewRow) {
    const host = this.shadowRoot.querySelector(".preview-host");
    if (!host) return;
    // A newer build may start while this one awaits the card; only the latest may render.
    const build = (this._previewBuild = (this._previewBuild || 0) + 1);
    host.innerHTML = "";
    this._previewEl = null;

    // In edit mode, the preview is the Magic Card editor itself
    if (row === this._viewRow && this._viewMode === "edit") return;

    const config = row?.raw?.config || row?.raw || null;
    if (!config || typeof config !== "object") {
      this._previewError = tr("mcu-panel.panel.no-config-to-preview");
      return;
    }
    const card_type = row?.card_type || "";
    const renderConfig =
      config.type
        ? config
        : card_type
        ? { type: card_type, ...config }
        : null;
    if (!renderConfig) {
      this._previewError =
        tr("mcu-panel.panel.no-card-type-available-neither-the");
      return;
    }
    // Card helpers only exist once a dashboard has loaded; magic-card can be built directly.
    const isMagicCard = renderConfig.type === "custom:magic-card";
    if (!isMagicCard && typeof window.loadCardHelpers !== "function") {
      this._previewError =
        tr("mcu-panel.panel.lovelace-card-helpers-are-unavailable");
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
        (err && (err.message || String(err))) || tr("mcu-panel.panel.failed-to-render-preview");
    }
  }

  updated(changedProps) {
    if (this._tab === "templates" && !this._viewRow && this._templateSelected) {
      // The inspector preview host is a new element after the sheet opens, the dialog closes or the layout switches.
      const host = this.shadowRoot.querySelector(".preview-host");
      if (host && host !== this._builtPreviewHost) this._buildTemplatePreview();
    }
    if (changedProps.has("hass") && this._previewEl && this.hass) {
      this._previewEl.hass = this.hass;
    }
    if (changedProps.has("hass") && this._studioEl && this.hass) {
      this._studioEl.hass = this.hass;
    }
    if (this._forumEl && this.hass && (changedProps.has("hass") || changedProps.has("narrow"))) {
      this._forumEl.hass = this.hass;
      this._forumEl.narrow = !!this.narrow;
    }
    if (this._themeEl && this.hass && (changedProps.has("hass") || changedProps.has("narrow"))) {
      this._themeEl.hass = this.hass;
      this._themeEl.narrow = !!this.narrow;
    }
    if (changedProps.has("hass") && this.hass) {
      this._syncEditorHass();
      if (this._libraryEl) this._libraryEl.hass = this.hass;
      if (this._shapesEl) this._shapesEl.hass = this.hass;
      if (this._iconsEl) this._iconsEl.hass = this.hass;
      if (this._imagesEl) this._imagesEl.hass = this.hass;
    }
    if (this._editorOpen) {
      this._attachEditor();
    } else {
      if (this._tab === "library" && this.hass && !this._libraryEl && this._libraryStatus === "") {
        this._mountLibraryView();
      }
      if (this._tab === "library" && this._libraryStatus === "ready") this._attachLibraryView();
      if (this._tab === "icons" && this.hass && !this._iconsEl && this._iconsStatus === "") {
        this._mountIconsView();
      }
      if (this._tab === "icons" && this._iconsStatus === "ready") this._attachIconsView();
      if (this._tab === "shapes" && this.hass && !this._shapesEl && this._shapesStatus === "") {
        this._mountShapesView();
      }
      if (this._tab === "shapes" && this._shapesStatus === "ready") this._attachShapesView();
      if (this._tab === "images" && this.hass && !this._imagesEl && this._imagesStatus === "") {
        this._mountImagesView();
      }
      if (this._tab === "images" && this._imagesStatus === "ready") this._attachImagesView();
    }
    if (this._tab === "themes" && this.hass && this._themeListLoad === "") this._loadThemeFiles();
    if (this._tab === "themes" && this.hass && this._themeEditorOpen && !this._themeEl && this._themeStatus === "") {
      this._mountThemeEditor();
    }
    if (this._tab === "themes" && this._themeStatus === "ready") this._attachThemeEditor();
    if (this._tab === "forum-shot" && this.hass && !this._forumEl && this._forumStatus === "") {
      this._mountForumShot();
    }
    if (this._tab === "forum-shot" && this._forumStatus === "ready") this._attachForumShot();
    if (this._tab === "animations" && this.hass && this._animLoad === "") this._loadAnimations();
    if (this._tab === "animations" && this.hass && this._studioOpen && !this._studioEl && this._animStatus === "") {
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
          ? tr("mcu-panel.panel.magic-card-could-not-be-loaded-from-url", { url: this._magicCardUrl })
          : tr("mcu-panel.panel.magic-card-isn-t-installed-install-it"),
      };
    }
    const api = window.MagicCard;
    if (api && !(Number(api.apiVersion) >= MIN_MAGIC_CARD_API)) {
      return {
        ok: false,
        message:
          tr("mcu-panel.panel.magic-card-version-is-too-old-for-magic", { version: String(api.version || ""), min: String(MIN_MAGIC_CARD_API) }),
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
        message = tr("mcu-panel.panel.the-magic-card-editor-could-not-be");
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
      this._editError = tr("mcu-panel.panel.name-is-required");
      return;
    }
    const renamed = this._viewRow && name !== this._viewRow.name;
    if (renamed && this._templates.some((t) => t.name === name)) {
      this._editError = tr("mcu-panel.panel.a-template-named-name-already-exists", { name });
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
    if (renamed && this._viewRow.name) payload.old_name = this._viewRow.name;
    this._submitting = true;
    this._editError = "";
    try {
      await this.hass.callWS(payload);
      this._closeOverlay();
    } catch (err) {
      console.error("[magic_card_utils] save failed", err);
      this._editError = this._wsErrorMessage(err, tr("mcu-panel.panel.the-template-could-not-be-saved"));
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

  _uniqueCopyName(base, existing = new Set(this._templates.map((t) => t.name))) {
    let candidate = tr("mcu-panel.panel.name-copy", { name: base });
    let i = 2;
    while (existing.has(candidate)) {
      candidate = tr("mcu-panel.panel.name-copy-n", { name: base, n: i });
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
      this._actionError = tr("mcu-panel.panel.name-is-required");
      return;
    }
    if (this._templates.some((t) => t.name === newName)) {
      this._actionError = tr("mcu-panel.panel.a-template-named-name-already-exists", { name: newName });
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
        (err && (err.message || err.code)) || tr("mcu-panel.panel.duplicate-failed");
      this._submitting = false;
    }
  }

  async _submitDelete() {
    if (this._submitting) return;
    const row = this._actionRow;
    if (!row) return;
    if (row.linked_cards > 0) {
      this._actionError = tr("mcu-panel.panel.cannot-delete-still-linked-to-cards", { n: row.linked_cards });
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
        (err && (err.message || err.code)) || tr("mcu-panel.panel.delete-failed");
      this._submitting = false;
    }
  }

  firstUpdated() {
    this._subscribe();
  }

  // ---- Animations tab ----------------------------------------------------

  _setTab(tab) {
    // The tab that was called "editors" is the Icons tab now.
    if (tab === "editors") tab = "icons";
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
    const j = tabKeyTarget(
      e.key,
      TABS.findIndex(([t]) => t === this._tab),
      TABS.length
    );
    if (j < 0) return;
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
          tr("mcu-panel.panel.the-animation-studio-could-not-be-loaded", { file: STUDIO_FILE }),
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
      this._animMessage = tr("mcu-panel.panel.the-animation-library-could-not-be");
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
    el.addEventListener("mc-anim-close", () => this._closeStudio());
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
      if (this._studioOpen) return;
      this._animError = this._wsErrorMessage(err, tr("mcu-panel.panel.the-animation-could-not-be-saved"));
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
      if (this._studioOpen) return;
      this._animError = this._wsErrorMessage(err, tr("mcu-panel.panel.the-animation-could-not-be-deleted"));
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

  /** Loads the animation library for the list and the inspector; the studio is only mounted when one is opened. */
  async _loadAnimations() {
    if (!this.hass || this._animLoad === "loading") return;
    this._animLoad = "loading";
    try {
      await this._subscribeAnimations();
      this._animLoad = "ready";
    } catch (err) {
      console.error("[magic_card_utils] animation library unavailable", err);
      this._animLoad = "error";
      this._animError = tr("mcu-panel.panel.the-animation-library-could-not-be");
    }
  }

  _filteredAnimations() {
    const q = (this._animFilter || "").trim().toLocaleLowerCase();
    const all = Object.values(this._animations || {}).filter((d) => d && typeof d.id === "string");
    const shown = q
      ? all.filter((d) => [d.id, d.name, d.kind].some((v) => String(v || "").toLocaleLowerCase().includes(q)))
      : all.slice();
    return shown.sort((x, y) => String(x.name || x.id).localeCompare(String(y.name || y.id)));
  }

  /** Marks an animation for the inspector (and `?animation=`); below 1024 px that opens the sheet. */
  _selectAnimation(id, opener) {
    if (typeof id !== "string" || !ANIMATION_ID_RE.test(id) || !Object.prototype.hasOwnProperty.call(this._animations || {}, id)) return;
    if (this._selectedAnimation == null) this._openGroups = new Set([...this._openGroups, "preview", "details"]);
    this._selectedAnimation = id;
    this._syncTabQuery("animations");
    if (this._studioEl) this._studioEl.selectedId = id;
    this._openInspector(opener);
  }

  /** The inspector content for the selected animation: a still preview note and its details. */
  _animationInspectorModel() {
    const id = this._selectedAnimation;
    if (this._studioOpen || !id || !Object.prototype.hasOwnProperty.call(this._animations || {}, id)) return null;
    const def = this._animations[id] || {};
    const name = typeof def.name === "string" && def.name ? def.name : id;
    const kind = typeof def.kind === "string" ? def.kind : "";
    return {
      name,
      type: tr("mcu-panel.panel.animation"),
      groups: [
        {
          id: "preview",
          title: tr("mcu-panel.panel.preview"),
          summary: kind,
          body: html`<div class="item-pic"><p class="fld-help">${tr("mcu-panel.panel.open-the-animation-in-the-studio-to-play")}</p></div>`,
        },
        {
          id: "details",
          title: tr("mcu-panel.panel.details"),
          summary: id,
          fields: [
            { kind: "field", label: tr("mcu-panel.panel.name"), value: name },
            { kind: "field", label: tr("mcu-panel.panel.id"), value: id },
            { kind: "field", label: tr("mcu-panel.panel.kind"), value: kind },
          ],
        },
      ],
      footer: html`<button type="button" class="btn btn-primary" data-a="studio" @click=${(e) => this._openStudio(e.currentTarget)}>${glyph("fullscreen", 18)}${tr("mcu-panel.panel.open-in-studio")}</button>`,
    };
  }

  /** Shows the studio in place of the list, mounting it the first time. */
  _openAnimationStudio(opener) {
    this._studioOpen = true;
    this._studioOpener = opener || null;
    if (this._studioEl) {
      this._studioEl.selectedId = this._selectedAnimation;
      this._pushLibrary();
    } else {
      this._mountAnimationStudio();
    }
  }

  /** New and Import: opens the studio at its own list, which holds both actions, with no item picked. */
  _startAnimationStudio(opener) {
    this._selectedAnimation = null;
    this._syncTabQuery("animations");
    this._openAnimationStudio(opener);
  }

  _closeStudio() {
    const opener = this._studioOpener;
    this._studioOpener = null;
    this._studioOpen = false;
    this._refocus(opener, this._selectedAnimation ? `.tile[data-id="${this._selectedAnimation}"]` : ".tile");
  }

  /** Puts focus back on the control that opened a view; its node is new after the list re-renders, so fall back to `selector`. */
  _refocus(opener, selector) {
    this.updateComplete.then(() => {
      const el = opener && opener.isConnected ? opener : this.shadowRoot && this.shadowRoot.querySelector(selector);
      if (el && typeof el.focus === "function") el.focus();
    });
  }

  _renderAnimationsTab() {
    if (this._studioOpen) return this._renderStudioView();
    const shown = this._filteredAnimations();
    const total = Object.keys(this._animations || {}).length;
    return html`<div class="content">
      ${this._animError
        ? html`<div class="notice error" role="alert">
            ${glyph("error", 20)}
            <div class="body">
              <p>${this._animError}</p>
              ${this._animLoad === "error"
                ? html`<div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => { this._animError = ""; this._animLoad = ""; }}>${tr("mcu-panel.panel.try-again")}</button></div>`
                : ""}
            </div>
            <button type="button" class="icon-btn sm close-btn" aria-label=${tr("mcu-panel.panel.dismiss")} title=${tr("mcu-panel.panel.dismiss")} @click=${() => (this._animError = "")}>${glyph("close")}</button>
          </div>`
        : ""}
      <div class="bar">
        <button type="button" class="btn btn-primary" data-a="new" @click=${(e) => this._startAnimationStudio(e.currentTarget)}>
          <ha-icon icon="mdi:open-in-new"></ha-icon>${tr("mcu-panel.panel.new-animation")}
        </button>
      </div>
      <div class="field">
        <div class="field-head"><label for="mcu-anim-search">${tr("mcu-panel.panel.search-animations")}</label></div>
        <div class="with-icon">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input id="mcu-anim-search" class="input" type="search" .value=${this._animFilter || ""}
            @input=${(e) => (this._animFilter = e.target.value)} />
        </div>
      </div>
      <div role="status" aria-live="polite" class="help">${tr("mcu-panel.panel.count-animations", { n: shown.length })}</div>
      ${this._animLoad === "loading"
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : total === 0
        ? html`<div class="empty"><strong>${tr("mcu-panel.panel.no-animations-saved-yet")}</strong></div>`
        : shown.length
        ? html`<div class="tiles" role="list">${shown.map(
            (d) => html`<button type="button" class="tile" role="listitem" data-id="${d.id}" aria-current="${this._selectedAnimation === d.id ? "true" : "false"}"
              @click=${(e) => this._selectAnimation(d.id, e.currentTarget)}><b title="${d.id}">${d.name || d.id}</b><small>${d.kind || ""}</small></button>`
          )}</div>`
        : html`<p class="empty">${tr("mcu-panel.panel.no-animations-match-search")}</p>`}
    </div>`;
  }

  /** The studio in place of the list: a back button, then the card's studio in its own frame look. */
  _renderStudioView() {
    if (this._animStatus === "ready") this.updateComplete.then(() => this._attachStudio());
    return html`
      <div class="bar" ?hidden=${this._animStatus === "ready"}>
        <button type="button" class="btn btn-secondary btn-sm studio-back" @click=${() => this._closeStudio()}>${glyph("back", 18)}${tr("mcu-panel.panel.back-to-the-list")}</button>
      </div>
      ${this._animError
        ? html`<div class="notice error" role="alert">
            ${glyph("error", 20)}
            <div class="body"><p>${this._animError}</p></div>
            <button type="button" class="icon-btn sm close-btn" aria-label=${tr("mcu-panel.panel.dismiss")} title=${tr("mcu-panel.panel.dismiss")} @click=${() => (this._animError = "")}>${glyph("close")}</button>
          </div>`
        : ""}
      ${this._animStatus === "loading" || this._animStatus === ""
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : ""}
      ${this._animStatus === "error"
        ? html`<div class="notice error" role="alert">
            ${glyph("error", 20)}
            <div class="body">
              <p>${this._animMessage}</p>
              <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._mountAnimationStudio()}>${tr("mcu-panel.panel.try-again")}</button></div>
            </div>
          </div>`
        : ""}
      <div ?hidden=${this._animStatus !== "ready"} class="studio-host"></div>
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
          tr("mcu-panel.panel.the-theme-editor-could-not-be-loaded-it", { file: THEME_EDITOR_FILE, version: "2026.10.06" }),
      };
    }
    const major = parseInt(String(ctor.contractVersion || "").split(".")[0], 10);
    if (major !== 1) {
      return {
        ok: false,
        message:
          tr("mcu-panel.panel.this-magic-card-utils-version-doesn-t"),
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

  /** The theme files for the list and the inspector (`themes_list`); the editor is only mounted when one is opened. */
  async _loadThemeFiles() {
    if (!this.hass) return;
    if (this._themeListLoad !== "ready") this._themeListLoad = "loading";
    try {
      const res = await this.hass.callWS({ type: CMD_THEMES_LIST });
      if (res && Array.isArray(res.files)) this._themeFiles = res.files.filter((f) => f && typeof f.name === "string");
      this._themeListError = "";
      this._themeListLoad = "ready";
    } catch (err) {
      console.error("[magic_card_utils] theme list unavailable", err);
      this._themeListError = tr("mcu-panel.panel.the-theme-list-could-not-be-loaded");
      this._themeListLoad = "error";
    }
  }

  _filteredThemes() {
    const q = (this._themeFilter || "").trim().toLocaleLowerCase();
    const files = this._themeFiles || [];
    return q ? files.filter((f) => [f.name, f.file].some((v) => String(v || "").toLocaleLowerCase().includes(q))) : files;
  }

  /** Marks a theme file for the inspector and `?theme=`; below 1024 px that opens the sheet. */
  _selectTheme(name, opener) {
    if (typeof name !== "string" || !THEME_NAME_RE.test(name) || !(this._themeFiles || []).some((f) => f.name === name)) return;
    if (this._selectedTheme == null) this._openGroups = new Set([...this._openGroups, "theme"]);
    this._selectedTheme = name;
    this._themeDeleteAsk = "";
    this._syncTabQuery("themes");
    this._openInspector(opener);
  }

  /** The inspector content for the selected theme file: name, modes, variables and file, with Delete and Export when it is editable. */
  _themeInspectorModel() {
    const f = this._themeEditorOpen ? null : (this._themeFiles || []).find((x) => x.name === this._selectedTheme);
    if (!f) return null;
    const modes = f.has_modes ? tr("mcu-panel.panel.light-and-dark") : tr("mcu-panel.panel.one-mode");
    const count = tr("mcu-panel.panel.n-variables", { n: f.var_count || 0 });
    const row = (label, value) => html`<div class="fld"><div class="fld-head"><span class="fld-label">${label}</span></div><span class="fld-value">${value}</span></div>`;
    const ask = this._themeDeleteAsk === f.name;
    const open = html`<button type="button" class="btn btn-primary" data-a="studio" @click=${(e) => this._openThemeEditor(e.currentTarget)}>${glyph("fullscreen", 18)}${tr("mcu-panel.panel.open-in-studio")}</button>`;
    let footer = open;
    if (f.editable) {
      footer = ask
        ? html`<p class="fld-help" role="alert">${tr("mcu-panel.panel.delete-name-this-action-cannot-be-undone", { name: f.name })}</p>
            <button type="button" class="btn btn-secondary" @click=${() => (this._themeDeleteAsk = "")}>${tr("mcu-panel.panel.cancel")}</button>
            <button type="button" class="btn btn-danger" data-a="del" @click=${() => this._deleteTheme(f.name)}>${glyph("delete", 18)}${tr("mcu-panel.panel.delete")}</button>`
        : html`${open}
            <button type="button" class="btn btn-secondary" data-a="export" @click=${() => this._exportTheme(f.name)}>${tr("mcu-panel.panel.export")}</button>
            <button type="button" class="btn btn-danger" data-a="del" @click=${() => (this._themeDeleteAsk = f.name)}>${glyph("delete", 18)}${tr("mcu-panel.panel.delete")}</button>`;
    }
    return {
      name: f.name,
      type: tr("mcu-panel.panel.theme"),
      groups: [
        {
          id: "theme",
          title: tr("mcu-panel.panel.theme"),
          summary: modes,
          fields: [{ kind: "field", label: tr("mcu-panel.panel.name"), value: f.name }],
          body: html`${row(tr("mcu-panel.panel.modes"), modes)}${row(tr("mcu-panel.panel.variables"), count)}${row(tr("mcu-panel.panel.file"), `/config/${f.file}`)}${f.editable
            ? ""
            : html`<div class="notice info" role="note">${glyph("info", 20)}<div class="body"><p>${tr("mcu-panel.panel.this-theme-is-read-only-copy-it-to-edit")}</p></div></div>`}`,
        },
      ],
      footer,
    };
  }

  async _deleteTheme(name) {
    try {
      await this.hass.callWS({ type: CMD_THEMES_DELETE, name });
      this._themeDeleteAsk = "";
      if (this._selectedTheme === name) {
        this._selectedTheme = null;
        this._syncTabQuery("themes");
      }
      await this._loadThemeFiles();
    } catch (err) {
      console.error("[magic_card_utils] delete theme failed", err);
      this._themeDeleteAsk = "";
      this._themeListError = tr("mcu-panel.panel.the-theme-could-not-be-deleted");
    }
  }

  async _exportTheme(name) {
    try {
      const res = await this.hass.callWS({ type: CMD_THEMES_GET, name });
      const url = URL.createObjectURL(new Blob([JSON.stringify({ [name]: res.theme }, null, 2)], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("[magic_card_utils] export theme failed", err);
      this._themeListError = tr("mcu-panel.panel.the-theme-could-not-be-exported");
    }
  }

  /** Shows the theme editor in place of the list, mounting it the first time. */
  _openThemeEditor(opener) {
    this._themeEditorOpen = true;
    this._themeEditorOpener = opener || null;
    if (this._themeEl) {
      this._themeEl.selectedName = this._selectedTheme || null;
    } else {
      this._mountThemeEditor();
    }
  }

  /** New and Import: opens the editor at its own start view, which holds both actions, with no theme picked. */
  _startThemeEditor(opener) {
    this._selectedTheme = null;
    this._syncTabQuery("themes");
    this._openThemeEditor(opener);
  }

  _closeThemeEditor() {
    const opener = this._themeEditorOpener;
    this._themeEditorOpener = null;
    this._themeEditorOpen = false;
    this._refocus(opener, this._selectedTheme ? `.row[data-id="${this._selectedTheme}"] button` : ".row button");
    this._loadThemeFiles();
  }

  _renderThemesTab() {
    if (this._themeEditorOpen) return this._renderThemeEditorView();
    const shown = this._filteredThemes();
    return html`<div class="content">
      ${this._themeListError
        ? html`<div class="notice error" role="alert">
            ${glyph("error", 20)}
            <div class="body">
              <p>${this._themeListError}</p>
              <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => { this._themeListError = ""; this._loadThemeFiles(); }}>${tr("mcu-panel.panel.try-again")}</button></div>
            </div>
          </div>`
        : ""}
      <div class="bar">
        <button type="button" class="btn btn-primary" data-a="new" @click=${(e) => this._startThemeEditor(e.currentTarget)}>
          <ha-icon icon="mdi:open-in-new"></ha-icon>${tr("mcu-panel.panel.new-theme")}
        </button>
      </div>
      <div class="field">
        <div class="field-head"><label for="mcu-theme-search">${tr("mcu-panel.panel.search-themes")}</label></div>
        <div class="with-icon">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input id="mcu-theme-search" class="input" type="search" .value=${this._themeFilter || ""}
            @input=${(e) => (this._themeFilter = e.target.value)} />
        </div>
      </div>
      <div role="status" aria-live="polite" class="help">${tr("mcu-panel.panel.count-themes", { n: shown.length })}</div>
      ${this._themeListLoad === "loading" && !(this._themeFiles || []).length
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : !(this._themeFiles || []).length
        ? html`<div class="empty"><strong>${tr("mcu-panel.panel.no-themes-saved-yet")}</strong></div>`
        : shown.length
        ? html`<div class="rows" role="list">${shown.map((t) => {
            const sub = [
              `/config/${t.file}`,
              tr("mcu-panel.panel.n-variables", { n: t.var_count || 0 }),
              t.has_modes ? tr("mcu-panel.panel.light-and-dark") : "",
              t.editable ? "" : tr("mcu-panel.panel.read-only"),
            ].filter(Boolean).join(" · ");
            return html`<div class="row" role="listitem" data-id="${t.name}">
              <button type="button" class="name" aria-current="${this._selectedTheme === t.name ? "true" : "false"}"
                @click=${(e) => this._selectTheme(t.name, e.currentTarget)}><bdi>${t.name}</bdi><small>${sub}</small></button>
            </div>`;
          })}</div>`
        : html`<p class="empty">${tr("mcu-panel.panel.no-themes-match-search")}</p>`}
    </div>`;
  }

  /** The theme editor in place of the list: a back button, then the card's editor in its own frame look. */
  _renderThemeEditorView() {
    return html`
      <div class="bar">
        <button type="button" class="btn btn-secondary btn-sm theme-back" @click=${() => this._closeThemeEditor()}>${glyph("back", 18)}${tr("mcu-panel.panel.back-to-the-list")}</button>
      </div>
      ${this._themeStatus === "loading" || this._themeStatus === ""
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : ""}
      ${this._themeStatus === "error"
        ? html`<div class="notice error" role="alert">
            ${glyph("error", 20)}
            <div class="body">
              <p>${this._themeMessage}</p>
              <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._retryThemes()}>${tr("mcu-panel.panel.try-again")}</button></div>
            </div>
          </div>`
        : ""}
      <div ?hidden=${this._themeStatus !== "ready"} class="theme-host"></div>
    `;
  }

  _retryThemes() {
    this._themeStatus = "";
    this._themeMessage = "";
  }

  // ---- Forum shot tab -------------------------------------------------------

  /**
   * Load Magic Card, check its version, then import the forum shot entry from the folder magic-card.js came
   * from. One attempt per page load: a failure is shown and not retried. Resolves to `{ ok: true }` or `{ ok: false, message }`.
   */
  async _ensureForumShot() {
    const card = await this._ensureMagicCard();
    if (!card.ok) return card;
    const cmp = _compareCalVer(window.MagicCard && window.MagicCard.version, MIN_MAGIC_CARD_FOR_FORUM_SHOT);
    if (cmp === null || cmp < 0) return { ok: false, message: msgUpdateForumShot() };
    if (!customElements.get(FORUM_SHOT_TAG)) {
      if (!this._forumLoad) {
        this._forumLoad = (async () => {
          const url = _forumShotUrl(this._magicCardUrl);
          if (!url) return;
          try {
            await import(url);
          } catch (_err) {
            console.warn("[magic_card_utils] forum shot not loaded");
          }
        })();
      }
      await this._forumLoad;
    }
    const ctor = customElements.get(FORUM_SHOT_TAG);
    if (!ctor) {
      return {
        ok: false,
        message: tr("mcu-panel.panel.the-forum-shot-could-not-be-loaded-it", { file: FORUM_SHOT_FILE, version: MIN_MAGIC_CARD_FOR_FORUM_SHOT }),
      };
    }
    const major = parseInt(String(ctor.contractVersion || "").split(".")[0], 10);
    if (major !== FORUM_SHOT_MAJOR) return { ok: false, message: msgUpdateForumShot() };
    return { ok: true };
  }

  async _mountForumShot() {
    if (this._forumEl || this._forumStatus === "loading") return;
    this._forumStatus = "loading";
    this._forumMessage = "";
    const status = await this._ensureForumShot();
    if (!status.ok) {
      this._forumStatus = "error";
      this._forumMessage = status.message;
      return;
    }
    const ctor = customElements.get(FORUM_SHOT_TAG);
    if (ctor && typeof ctor.listCards === "function" && typeof ctor.download === "function") {
      this._forumApi = ctor;
      this._forumStatus = "ready";
      this._loadForumCards();
      return;
    }
    const el = document.createElement(FORUM_SHOT_TAG);
    el.hass = this.hass;
    el.narrow = !!this.narrow;
    this._forumEl = el;
    this._forumStatus = "ready";
    await this.updateComplete;
    this._attachForumShot();
  }

  /** The element is kept while the panel lives; put it (back) into the tab's host. */
  _attachForumShot() {
    const host = this.shadowRoot.querySelector(".forum-host");
    if (!host || !this._forumEl || this._forumEl.parentNode === host) return;
    host.innerHTML = "";
    host.appendChild(this._forumEl);
  }

  /** Reads the card list through the entry's static `listCards`; a failure shows its text with a Retry button. */
  async _loadForumCards() {
    const api = this._forumApi;
    if (!api) return;
    this._forumCards = null;
    this._forumListError = "";
    try {
      const cards = await api.listCards(this.hass);
      this._forumCards = Array.isArray(cards) ? cards : [];
    } catch (err) {
      const code = err && typeof err === "object" ? err.code : "";
      this._forumCards = [];
      if (code !== "no_cards") this._forumListError = this._forumErrorText(code);
    }
    if (this._selectedForumCard != null && !this._forumCardByKey(this._selectedForumCard)) this._selectedForumCard = null;
  }

  _forumKey(c) {
    return `${c.dashboard ?? ""}|${c.view}|${(c.path || []).join(".")}`;
  }

  _forumCardByKey(key) {
    return key == null ? null : (this._forumCards || []).find((c) => this._forumKey(c) === key) || null;
  }

  /** The dashboard's name: its title, else the default dashboard's title or text, else its address. */
  _forumDashboardName(c) {
    if (c.dashboardTitle) return c.dashboardTitle;
    if (c.dashboard === null) {
      const title = this.hass && this.hass.panels && this.hass.panels.lovelace && this.hass.panels.lovelace.title;
      return typeof title === "string" && title.trim() ? title.trim() : tr("mcu-panel.panel.default-dashboard");
    }
    return c.dashboard;
  }

  _forumLockReason(lock) {
    switch (lock) {
      case "custom_card":
        return tr("mcu-panel.panel.lock-reason-custom-card");
      case "limit":
        return tr("mcu-panel.panel.lock-reason-limit");
      case "outside_address":
        return tr("mcu-panel.panel.lock-reason-outside-address");
      default:
        return tr("mcu-panel.panel.lock-reason-cannot-judge");
    }
  }

  /** The text for an error code of the forum shot entry; `remote_asset` says why from the listed card's lock. */
  _forumErrorText(code, card) {
    switch (code) {
      case "remote_asset":
        return card && card.lock === "custom_card" ? tr("mcu-panel.panel.custom-card-lock") : tr("mcu-panel.panel.remote-asset-lock");
      case "card_not_defined":
        return tr("mcu-panel.panel.error-card-not-defined");
      case "too_large":
        return tr("mcu-panel.panel.error-too-large");
      case "font_unavailable":
        return tr("mcu-panel.panel.error-font-unavailable");
      case "hosts_changed":
        return tr("mcu-panel.panel.error-hosts-changed");
      case "config_read_failed":
        return tr("mcu-panel.panel.card-config-read-failed");
      default:
        return tr("mcu-panel.panel.error-capture-failed");
    }
  }

  /** The cards the search keeps, in the chosen sort order; with no sort they stay in dashboard order. */
  _forumRows() {
    const q = (this._forumFilter || "").trim().toLocaleLowerCase();
    const all = this._forumCards || [];
    const rows = q ? all.filter((c) => [c.cardName, this._forumDashboardName(c), c.view].some((v) => String(v || "").toLocaleLowerCase().includes(q))) : all.slice();
    const sort = this._forumSort;
    if (!sort) return rows;
    const locale = (this.hass && ((this.hass.locale && this.hass.locale.language) || this.hass.language)) || "en";
    let collator;
    try {
      collator = new Intl.Collator(locale, { numeric: true, sensitivity: "base" });
    } catch (_err) {
      collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
    }
    const order = ["custom_card", "limit", "outside_address", "cannot_judge"];
    const rank = (c) => (c.lock == null ? 0 : 1 + order.indexOf(c.lock));
    const sign = sort.dir === "descending" ? -1 : 1;
    const cmp = (a, b) =>
      sort.key === "dashboard" ? collator.compare(this._forumDashboardName(a), this._forumDashboardName(b))
      : sort.key === "view" ? collator.compare(String(a.view), String(b.view))
      : sort.key === "card" ? collator.compare(String(a.cardName), String(b.cardName))
      : rank(a) - rank(b);
    const index = new Map(rows.map((r, i) => [r, i]));
    return rows.sort((a, b) => sign * cmp(a, b) || index.get(a) - index.get(b));
  }

  /** First click sorts ascending, the next on the same column toggles. */
  _sortForumBy(key) {
    const same = this._forumSort && this._forumSort.key === key;
    this._forumSort = { key, dir: same && this._forumSort.dir === "ascending" ? "descending" : "ascending" };
  }

  _selectForumCard(key, opener) {
    if (!this._forumCardByKey(key)) return;
    if (this._selectedForumCard == null) this._openGroups = new Set([...this._openGroups, "card", "colours", "preview"]);
    this._selectedForumCard = key;
    this._forumError = "";
    this._forumSaved = false;
    this._openInspector(opener);
  }

  _dropForumPreview() {
    if (this._forumPreview && this._forumPreview.url) URL.revokeObjectURL(this._forumPreview.url);
    this._forumPreview = null;
  }

  /** Download: the entry makes and saves the picture; the panel keeps the sheet and an object URL for the preview. */
  async _downloadForumShot() {
    const key = this._selectedForumCard;
    const card = this._forumCardByKey(key);
    if (!card || card.lock != null || this._forumBusy || !this._forumApi) return;
    this._forumBusy = true;
    this._forumError = "";
    this._forumSaved = false;
    try {
      const sheet = await this._forumApi.download(this.hass, card, { mode: this._forumColours || "both", looks: !!this._forumLooks });
      const url = URL.createObjectURL(sheet.blob);
      this._dropForumPreview();
      this._forumPreview = { key, sheet, url };
      this._forumSaved = true;
    } catch (err) {
      const code = err && typeof err === "object" ? err.code : "";
      if (code === "hosts_changed" || code === "remote_asset") await this._loadForumCards();
      this._forumError = this._forumErrorText(code, this._forumCardByKey(key));
    }
    this._forumBusy = false;
  }

  _renderForumShotTab() {
    if (this._forumEl) {
      return html`
        ${this._forumStatus === "loading" || this._forumStatus === ""
          ? html`<div class="studio-status" role="status" aria-label=${tr("mcu-panel.panel.loading-the-forum-shot")}><ha-circular-progress active></ha-circular-progress></div>`
          : ""}
        ${this._forumStatus === "error"
          ? html`<div class="content">
              <div class="notice error" role="alert">
                ${glyph("error", 20)}
                <div class="body"><p>${this._forumMessage}</p></div>
              </div>
            </div>`
          : ""}
        <div class="forum-host" ?hidden=${this._forumStatus !== "ready"}></div>
      `;
    }
    if (!this._forumStatus || this._forumStatus === "loading") {
      return html`<div class="studio-status" role="status" aria-label=${tr("mcu-panel.panel.loading-the-forum-shot")}><ha-circular-progress active></ha-circular-progress></div>`;
    }
    if (this._forumStatus === "error") {
      return html`<div class="content">
        <div class="notice error" role="alert">
          ${glyph("error", 20)}
          <div class="body"><p>${this._forumMessage}</p></div>
        </div>
      </div>`;
    }
    return this._renderForumList();
  }

  /** The drafting list: search, a count, sortable columns and one ruled row per Magic Card. */
  _renderForumList() {
    const cards = this._forumCards;
    if (this._forumListError) {
      return html`<div class="content">
        <div class="notice error" role="alert">
          ${glyph("error", 20)}
          <div class="body">
            <p>${this._forumListError}</p>
            <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._loadForumCards()}>${tr("mcu-panel.panel.try-again")}</button></div>
          </div>
        </div>
      </div>`;
    }
    if (cards == null) {
      return html`<div class="content"><p class="help" role="status">${tr("mcu-panel.panel.looking-for-your-magic-cards")}</p></div>`;
    }
    const rows = this._forumRows();
    const sort = this._forumSort;
    const head = (key, label) => html`<div class="sort-col" role="columnheader" aria-sort=${sort && sort.key === key ? sort.dir : "none"}>
      <button type="button" class="sort" @click=${() => this._sortForumBy(key)}>${label}<span aria-hidden="true">${sort && sort.key === key ? (sort.dir === "ascending" ? " ▲" : " ▼") : ""}</span></button>
    </div>`;
    return html`<div class="content">
      ${this.hass && this.hass.user && this.hass.user.is_admin === false
        ? html`<div class="notice info" role="note">${glyph("info", 20)}<div class="body"><p>${tr("mcu-panel.panel.forum-admin-only")}</p></div></div>`
        : ""}
      <div class="field">
        <div class="field-head"><label for="mcu-forum-search">${tr("mcu-panel.panel.search-cards")}</label></div>
        <div class="with-icon">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input id="mcu-forum-search" class="input" type="search" .value=${this._forumFilter || ""}
            @input=${(e) => (this._forumFilter = e.target.value)} />
        </div>
      </div>
      <div role="status" aria-live="polite" class="help">${tr("mcu-panel.panel.count-cards", { n: rows.length })}</div>
      ${!cards.length
        ? html`<p class="empty">${tr("mcu-panel.panel.no-magic-cards-found")}</p>`
        : rows.length
        ? html`<div class="rows" role="table" aria-label=${tr("mcu-panel.panel.forum-shot")}>
            <div class="rows-head" role="row">
              ${head("card", tr("mcu-panel.panel.card"))}${head("dashboard", tr("mcu-panel.panel.dashboard"))}${head("view", tr("mcu-panel.panel.view"))}${head("status", tr("mcu-panel.panel.status"))}
            </div>
            ${rows.map((c) => {
              const key = this._forumKey(c);
              const on = this._selectedForumCard === key;
              return html`<div class="row ${on ? "current" : ""}" role="row" data-id="${key}" aria-current="${on ? "true" : "false"}">
                <span role="cell"><button type="button" class="name" @click=${(e) => this._selectForumCard(key, e.currentTarget)}><bdi>${c.cardName}</bdi></button></span>
                <span role="cell">${this._forumDashboardName(c)}</span>
                <span role="cell">${c.view}</span>
                <span role="cell"><span class="badge ${c.lock == null ? "ok" : "locked"}">${c.lock == null ? tr("mcu-panel.panel.available") : tr("mcu-panel.panel.locked")}</span></span>
              </div>`;
            })}
          </div>`
        : html`<p class="empty">${tr("mcu-panel.panel.no-cards-match-your-search")}</p>`}
      <p class="fld-help">${tr("mcu-panel.panel.forum-shot-intro")}</p>
    </div>`;
  }

  /** The inspector content for the selected card: the card, the colour choice and the picture preview. */
  _forumInspectorModel() {
    const c = this._forumCardByKey(this._selectedForumCard);
    if (!c) return null;
    const colours = this._forumColours || "both";
    const locked = c.lock != null;
    const fonts = Array.isArray(c.fontHosts) ? c.fontHosts : [];
    const choice = (value, label) => html`<label class="choice"><input type="radio" name="mcu-forum-colours" value=${value} .checked=${colours === value}
      @change=${() => (this._forumColours = value)} />${label}</label>`;
    const row = (label, value) => html`<div class="fld"><div class="fld-head"><span class="fld-label">${label}</span></div><span class="fld-value">${value}</span></div>`;
    const status = locked ? tr("mcu-panel.panel.locked") : tr("mcu-panel.panel.available");
    const pv = this._forumPreview && this._forumPreview.key === this._selectedForumCard ? this._forumPreview : null;
    const placeholder = pv && pv.sheet && Array.isArray(pv.sheet.notices) && pv.sheet.notices.includes("remote_placeholder");
    const modeLabel = colours === "light" ? tr("mcu-panel.panel.colours-light") : colours === "dark" ? tr("mcu-panel.panel.colours-dark") : tr("mcu-panel.panel.colours-both");
    const button = locked || this._forumBusy
      ? html`<button type="button" class="btn btn-primary" data-a="dl" disabled aria-busy=${this._forumBusy ? "true" : "false"}>${tr("mcu-panel.panel.download")}</button>`
      : html`<button type="button" class="btn btn-primary" data-a="dl" aria-busy="false" @click=${() => this._downloadForumShot()}>${tr("mcu-panel.panel.download")}</button>`;
    return {
      name: c.cardName,
      type: tr("mcu-panel.panel.card"),
      groups: [
        {
          id: "card",
          title: tr("mcu-panel.panel.card"),
          summary: status,
          body: html`${row(tr("mcu-panel.panel.card"), c.cardName)}${row(tr("mcu-panel.panel.dashboard"), this._forumDashboardName(c))}${row(tr("mcu-panel.panel.view"), c.view)}${row(tr("mcu-panel.panel.status"), status)}${locked
            ? html`<p class="warn" role="note">${this._forumLockReason(c.lock)}</p>`
            : html`<p class="fld-help">${tr("mcu-panel.panel.available-detail")}</p>`}${fonts.length
            ? html`<p class="fld-help">${tr("mcu-panel.panel.fonts-from-hosts", { hosts: fonts.join(", ") })}</p>`
            : ""}`,
        },
        {
          id: "colours",
          title: tr("mcu-panel.panel.colours"),
          summary: modeLabel,
          body: html`<fieldset class="fld"><legend class="fld-label">${tr("mcu-panel.panel.colours")}</legend>${choice("both", tr("mcu-panel.panel.colours-both"))}${choice("light", tr("mcu-panel.panel.colours-light"))}${choice("dark", tr("mcu-panel.panel.colours-dark"))}</fieldset>
            <label class="choice"><input type="checkbox" .checked=${!!this._forumLooks} @change=${(e) => (this._forumLooks = e.target.checked)} />${tr("mcu-panel.panel.show-the-quiet-living-and-glow-looks")}</label>`,
        },
        {
          id: "preview",
          title: tr("mcu-panel.panel.preview"),
          summary: "",
          body: html`<div class="forum-preview">${pv
              ? html`<img src=${pv.url} width=${pv.sheet.width / 2} height=${pv.sheet.height / 2} alt=${tr("mcu-panel.panel.preview-alt")} />`
              : html`<p class="fld-help">${tr("mcu-panel.panel.picture-shows-after-download")}</p>`}</div>
            ${this._forumBusy ? html`<p class="fld-help" role="status">${tr("mcu-panel.panel.making-the-picture")}</p>` : ""}
            ${this._forumError ? html`<p class="warn" role="alert">${this._forumError}</p>` : ""}
            ${this._forumSaved && !this._forumBusy ? html`<p class="fld-help" role="status">${tr("mcu-panel.panel.saved-to-downloads")}</p>` : ""}
            ${placeholder ? html`<p class="fld-help">${fonts.length ? tr("mcu-panel.panel.notice-remote-placeholder-font") : tr("mcu-panel.panel.notice-remote-placeholder")}</p>` : ""}
            <p class="fld-help">${tr("mcu-panel.panel.privacy-check")}</p>
            ${fonts.length
              ? html`<p class="fld-help">${tr("mcu-panel.panel.font-host-contact", { hosts: fonts.join(", ") })}</p><p class="fld-help">${tr("mcu-panel.panel.local-only-font")}</p>`
              : html`<p class="fld-help">${tr("mcu-panel.panel.local-only")}</p>`}`,
        },
      ],
      footer: button,
    };
  }

  // ---- Library, Icons and Shapes tabs ---------------------------------------------

  /**
   * Load Magic Card, then what the Library tab ('library') or an editor ('icon' / 'shape') needs from it,
   * and check the version. Resolves to `{ ok: true }` or `{ ok: false, message }`.
   */
  async _ensureEditors(what) {
    // 'image' (the editor on an image) and 'images' (the Images tab's view) have their own, later minimum and message.
    const images = what === "image" || what === "images";
    const tooOld = images ? msgUpdateImages : msgUpdateCard;
    const card = await this._ensureMagicCard();
    if (!card.ok) {
      // Not registered: not installed (no resource) or a genuine load failure (its own plain message).
      if (!customElements.get(CARD_TAG)) return { ok: false, message: this._magicCardUrl ? card.message : images ? msgNoCardImages() : msgNoCard() };
      return { ok: false, message: tooOld() }; // there, but too old to speak the panel contract
    }
    // The one version gate. A Magic Card that exposes no version predates the editors.
    const cmp = _compareCalVer(window.MagicCard && window.MagicCard.version, images ? MIN_MAGIC_CARD_FOR_IMAGES : MIN_MAGIC_CARD_FOR_EDITORS);
    if (cmp === null || cmp < 0) return { ok: false, message: tooOld() };
    if (typeof window.MagicCard.loadEditor !== "function") return { ok: false, message: tooOld() };
    const loader = what === "library" || what === "images" ? "loadTransfer" : what === "shape" ? "loadShapeEditor" : "loadSvgEditor";
    try {
      if (!(await window.MagicCard.loadEditor())) return { ok: false, message: msgEditorLoad() };
      // The editor chunk adds the loaders to window.MagicCard: read it again, never keep the object from before.
      const mc = window.MagicCard;
      if (!mc || typeof mc[loader] !== "function") return { ok: false, message: tooOld() };
      if (!(await mc[loader]())) return { ok: false, message: msgEditorLoad() };
    } catch (err) {
      console.warn("[magic_card_utils] editor chunk not loaded", err);
      return { ok: false, message: msgEditorLoad() };
    }
    const tag = what === "library" || what === "images" ? LIBRARY_VIEW_TAG : what === "shape" ? SHAPE_STUDIO_TAG : SVG_EDITOR_TAG;
    const ctor = customElements.get(tag);
    if (!ctor) return { ok: false, message: msgEditorLoad() };
    // Internal sanity check, never worded as a revision: an element below the needed contractRevision is an old build.
    if (!(Number(ctor.contractRevision) >= (images ? IMAGES_MIN_CONTRACT_REVISION : EDITORS_MIN_CONTRACT_REVISION))) return { ok: false, message: tooOld() };
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
   * The editor shell, shared by the editor tabs. `kind` is 'icon', 'shape' or 'image', `id` a saved item to edit
   * (none = new), `opener` the control to return focus to.
   */
  async _openEditor({ kind, id, opener } = {}) {
    if (this._editorOpen || this._editorBusy) return;
    if (kind !== "icon" && kind !== "shape" && kind !== "image") return;
    if (id !== undefined && !(typeof id === "string" && LIBRARY_ID_RE.test(id))) return;
    // The save commands are admin-only; the Library view shows its buttons to everyone. A saved image still opens for
    // anyone: the editor itself is view-only for a non-admin, so a new image is the only thing refused here.
    if (!this._isAdmin() && (kind !== "image" || !id)) {
      this._editorNotice = kind === "image" ? msgAdminOnlyImages() : msgAdminOnly();
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
          this._editorNotice = tr("mcu-panel.panel.that-shape-could-not-be-read-try-again");
          return;
        }
        const item = Array.isArray(res && res.shapes) ? res.shapes.find((s) => s && s.id === id) : null;
        if (!item) {
          this._editorNotice = tr("mcu-panel.panel.that-shape-no-longer-exists");
          return;
        }
        value = { shape: "custom", shape_options: item.shape };
      }
      const el = document.createElement(kind === "shape" ? SHAPE_STUDIO_TAG : SVG_EDITOR_TAG);
      el.host = "mcu";
      el.hass = this.hass;
      el.libraryAvailable = true;
      if (kind === "icon" || kind === "image") {
        const [saved, blank] = kind === "icon" ? ["library", "blank"] : ["image", "image-blank"];
        el.source = id ? { kind: saved, id } : { kind: blank };
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
      const [saveEvent, closeEvent] = kind === "shape" ? ["mc-shape-save", "mc-shape-close"] : ["mc-svg-save", "mc-svg-close"];
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
      this._iconsEl = null;
      if (this._iconsStatus !== "error") this._iconsStatus = "";
      this._imagesEl = null;
      if (this._imagesStatus !== "error") this._imagesStatus = "";
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

  /** `mc-library-open` from <mc-library-view>: detail { kind: 'icon' | 'shape' | 'image', id? }. */
  _onLibraryOpen(e) {
    const d = e && e.detail;
    if (!d || (d.kind !== "icon" && d.kind !== "shape" && d.kind !== "image")) return;
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
    el.addEventListener("mc-library-select", (e) => this._onItemSelect(e));
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
    el.addEventListener("mc-library-select", (e) => this._onItemSelect(e));
    this._shapesEl = el;
    this._shapesStatus = "ready";
    await this.updateComplete;
    this._attachShapesView();
    this._wireShapeRows(el);
  }

  /** The Icons tab: the same Library view, narrowed to the icons kind (it keeps New icon, Edit, Rename, Delete, Export). */
  async _mountIconsView() {
    if (this._iconsEl || this._iconsStatus === "loading") return;
    this._iconsStatus = "loading";
    this._iconsMessage = "";
    const status = await this._ensureEditors("library");
    if (!status.ok) {
      this._iconsStatus = "error";
      this._iconsMessage = status.message;
      return;
    }
    const el = document.createElement(LIBRARY_VIEW_TAG);
    el.context = "mcu-panel";
    el.kinds = ["icon"];
    el.hass = this.hass;
    el.presets = _createPresetBackend(_makeCall(() => this.hass));
    el.addEventListener("mc-library-open", (e) => this._onLibraryOpen(e));
    el.addEventListener("mc-library-select", (e) => this._onItemSelect(e));
    this._iconsEl = el;
    this._iconsStatus = "ready";
    await this.updateComplete;
    this._attachIconsView();
  }

  /** The Images tab: the same Library view, narrowed to the images kind (it keeps New image, Edit or View, Rename, Duplicate, Delete, Export, Export all and Import). */
  async _mountImagesView() {
    if (this._imagesEl || this._imagesStatus === "loading") return;
    this._imagesStatus = "loading";
    this._imagesMessage = "";
    const status = await this._ensureEditors("images");
    if (!status.ok) {
      this._imagesStatus = "error";
      this._imagesMessage = status.message;
      return;
    }
    const el = document.createElement(LIBRARY_VIEW_TAG);
    el.context = "mcu-panel";
    el.kinds = ["image"];
    el.hass = this.hass;
    el.addEventListener("mc-library-open", (e) => this._onLibraryOpen(e));
    el.addEventListener("mc-library-select", (e) => this._onItemSelect(e));
    this._imagesEl = el;
    this._imagesStatus = "ready";
    await this.updateComplete;
    this._attachImagesView();
  }

  _attachImagesView() {
    const host = this.shadowRoot.querySelector(".images-host");
    if (!host || !this._imagesEl || this._imagesEl.parentNode === host) return;
    host.innerHTML = "";
    host.appendChild(this._imagesEl);
    fitListElement(this._imagesEl);
  }

  _retryImages() {
    this._imagesStatus = "";
    this._imagesMessage = "";
  }

  _attachIconsView() {
    const host = this.shadowRoot.querySelector(".icons-host");
    if (!host || !this._iconsEl || this._iconsEl.parentNode === host) return;
    host.innerHTML = "";
    host.appendChild(this._iconsEl);
    fitListElement(this._iconsEl);
  }

  _retryIcons() {
    this._iconsStatus = "";
    this._iconsMessage = "";
  }

  _attachShapesView() {
    const host = this.shadowRoot.querySelector(".shapes-host");
    if (!host || !this._shapesEl || this._shapesEl.parentNode === host) return;
    host.innerHTML = "";
    host.appendChild(this._shapesEl);
    fitListElement(this._shapesEl);
  }

  /** What an edit of a saved shape does to cards, as the card resolves it (a ref follows the library, an own copy stays). */
  _shapeCopyNote() {
    return tr(
      "mcu-panel.panel.cards-that-picked-this-shape-from-the"
    );
  }

  /** After a shape save, on the tab the user returns to (the editor covers the whole page, so a line inside the shell would be hidden). */
  _shapeSavedText() {
    return tr(
      "mcu-panel.panel.saved-to-the-library-cards-with-their"
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
        this._shapeById = byId;
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
    fitListElement(this._libraryEl);
  }

  _retryLibrary() {
    this._libraryStatus = "";
    this._libraryMessage = "";
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
                <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._retryLibrary()}>${tr("mcu-panel.panel.try-again")}</button></div>
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
                <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._retryShapes()}>${tr("mcu-panel.panel.try-again")}</button></div>
              </div>
            </div>
          </div>`
        : ""}
      ${this._shapesStatus === "ready" ? this._renderShapeNote(this._shapeSavedNote ? this._shapeSavedText() : this._shapeCopyNote(), this._shapeSavedNote ? "status" : "note") : ""}
      <div class="shapes-host" ?hidden=${this._shapesStatus !== "ready"}></div>
    `;
  }

  _renderImagesTab() {
    return html`
      ${this._renderEditorNotice()}
      ${this._imagesStatus === "loading" || this._imagesStatus === ""
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : ""}
      ${this._imagesStatus === "error"
        ? html`<div class="content">
            <div class="notice error" role="alert">
              ${glyph("error", 20)}
              <div class="body">
                <p>${this._imagesMessage}</p>
                <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._retryImages()}>${tr("mcu-panel.panel.try-again")}</button></div>
              </div>
            </div>
          </div>`
        : ""}
      <div class="images-host" ?hidden=${this._imagesStatus !== "ready"}></div>
      ${this._imagesStatus === "ready"
        ? html`<p class="images-hint">${tr("mcu-panel.panel.images-are-stored-in-home-assistant-not")}</p>`
        : ""}
    `;
  }

  _renderIconsTab() {
    return html`
      ${this._renderEditorNotice()}
      ${this._iconsStatus === "loading" || this._iconsStatus === ""
        ? html`<div class="studio-status"><ha-circular-progress active></ha-circular-progress></div>`
        : ""}
      ${this._iconsStatus === "error"
        ? html`<div class="content">
            <div class="notice error" role="alert">
              ${glyph("error", 20)}
              <div class="body">
                <p>${this._iconsMessage}</p>
                <div class="actions"><button type="button" class="btn btn-secondary btn-sm" @click=${() => this._retryIcons()}>${tr("mcu-panel.panel.try-again")}</button></div>
              </div>
            </div>
          </div>`
        : ""}
      <div class="icons-host" ?hidden=${this._iconsStatus !== "ready"}></div>
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
    if (this._resizeObserver) this._resizeObserver.disconnect();
    this._resizeObserver = null;
    const animPending = this._animUnsubPromise;
    this._animUnsubPromise = undefined;
    this._animReady = undefined;
    this._studioEl = null;
    // The editor element survives in _themeElCache; this panel instance just lets go of it.
    if (this._themeEl && this._themeEl.parentNode) this._themeEl.parentNode.removeChild(this._themeEl);
    this._themeEl = null;
    if (this._forumEl && this._forumEl.parentNode) this._forumEl.parentNode.removeChild(this._forumEl);
    this._forumEl = null;
    this._dropForumPreview();
    if (this._forumStatus !== "error") this._forumStatus = "";
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
    this._iconsEl = null;
    if (this._iconsStatus !== "error") this._iconsStatus = "";
    this._imagesEl = null;
    if (this._imagesStatus !== "error") this._imagesStatus = "";
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

  connectedCallback() {
    super.connectedCallback();
    loadPanelFonts();
    if (typeof ResizeObserver === "function") {
      this._resizeObserver = new ResizeObserver(() => this._measure());
      this._resizeObserver.observe(this);
    }
  }

  _isRtl() {
    return getComputedStyle(this).direction === "rtl";
  }

  /** Reads the panel width (for the dock and sheet layout) and which edges of the tab bar hide tabs. */
  _measure() {
    const width = this.clientWidth || window.innerWidth;
    if (width !== this._viewWidth) this._viewWidth = width;
    if (layoutFor(width).docked) this._sheetOpen = false;
    const tabs = this.shadowRoot && this.shadowRoot.querySelector(".tabs");
    if (tabs) this._tabFade = fadeFor(tabs.scrollLeft, tabs.clientWidth, tabs.scrollWidth, this._isRtl());
  }

  _onTabsScroll(e) {
    const el = e.currentTarget;
    this._tabFade = fadeFor(el.scrollLeft, el.clientWidth, el.scrollWidth, this._isRtl());
  }

  /** The strings the drafting module renders, resolved here so the message tables are built from this file. */
  _draftingStrings() {
    return {
      details: tr("mcu-panel.panel.details"),
      nothing: tr("mcu-panel.panel.nothing-selected"),
      pick: tr("mcu-panel.panel.pick-an-item"),
      groups: (n) => tr("mcu-panel.panel.count-groups", { n }),
      modifiedOnly: tr("mcu-panel.panel.modified-only"),
      noChanged: tr("mcu-panel.panel.no-changed-fields-yet"),
      back: tr("mcu-panel.panel.back"),
      reset: tr("mcu-panel.panel.reset"),
      rowSize: tr("mcu-panel.panel.row-size"),
      smaller: tr("mcu-panel.panel.smaller-rows"),
      larger: tr("mcu-panel.panel.larger-rows"),
      resize: tr("mcu-panel.panel.resize-details"),
    };
  }

  /** The details of the selected item for the docked inspector, or null while the tab has none. */
  _inspectorModel() {
    if (this._tab === "templates") return this._templatesInspectorModel();
    if (this._tab === "animations") return this._animationInspectorModel();
    if (this._tab === "themes") return this._themeInspectorModel();
    if (this._tab === "forum-shot") return this._forumInspectorModel();
    return this._itemInspectorModel();
  }

  /** `mc-library-select` from a hosted view: detail { id, name, kind, svg?, thumb?, path? }. Marks the item and shows it in the inspector. */
  _onItemSelect(e) {
    const d = e && e.detail;
    if (!d || typeof d.id !== "string" || !d.id || typeof d.name !== "string" || !ITEM_KINDS.includes(d.kind)) return;
    const str = (v) => (typeof v === "string" ? v : "");
    if (!this._itemSel) this._openGroups = new Set([...this._openGroups, "preview"]);
    this._itemSel = { tab: this._tab, id: d.id, name: d.name, kind: d.kind, svg: str(d.svg), thumb: str(d.thumb), path: str(d.path) };
    const views = { library: this._libraryEl, shapes: this._shapesEl, icons: this._iconsEl, images: this._imagesEl };
    for (const tab of Object.keys(views)) if (views[tab]) views[tab].selectedId = tab === this._tab ? d.id : "";
    const path = typeof e.composedPath === "function" ? e.composedPath() : [];
    this._openInspector(path.find((n) => n && n.tagName === "BUTTON") || e.target || null);
    this.requestUpdate();
  }

  /** The inspector content for the picked Library, Icons, Shapes or Images item: its picture and its fields. */
  _itemInspectorModel() {
    const it = this._itemSel;
    if (!it || it.tab !== this._tab) return null;
    const typeText =
      it.kind === "icon"
        ? tr("mcu-panel.panel.icon")
        : it.kind === "shape"
        ? tr("mcu-panel.panel.shape")
        : it.kind === "image"
        ? tr("mcu-panel.panel.image")
        : tr("mcu-panel.panel.preset");
    const fields = [
      { kind: "field", label: tr("mcu-panel.panel.name"), value: it.name },
      { kind: "field", label: tr("mcu-panel.panel.id"), value: it.id },
    ];
    if (it.kind === "image" && it.path) fields.push({ kind: "field", label: tr("mcu-panel.panel.path"), value: it.path });
    const pic = this._itemPicture(it);
    return {
      name: it.name,
      type: typeText,
      groups: [
        { id: "preview", title: tr("mcu-panel.panel.preview"), summary: pic.caption || typeText, body: pic.body },
        { id: "details", title: tr("mcu-panel.panel.details"), summary: it.id, fields },
      ],
    };
  }

  /** The picture of an item at 96 px (icons, shapes) or its thumbnail (library, images), else a text. */
  _itemPicture(it) {
    let parts = null;
    if (it.kind === "icon") parts = _svgParts(it.svg);
    else if (it.kind === "shape") {
      parts = _svgParts(it.svg);
      const outline = !parts && this._shapeById && this._shapeById.has(it.id) ? _shapeOutline(this._shapeById.get(it.id)) : null;
      if (outline && outline.d) parts = { viewBox: `0 0 ${THUMB_W} ${THUMB_H}`, w: THUMB_W, h: THUMB_H, parts: [{ kind: "path", d: outline.d }] };
    }
    if (parts) {
      const caption = tr("mcu-panel.panel.view-box-w-h", { w: parts.w, h: parts.h });
      const label = tr("mcu-panel.panel.name-preview", { name: it.name });
      return {
        caption,
        body: html`<div class="item-pic">
          <svg role="img" aria-label="${label}" viewBox="${parts.viewBox}" width="96" height="96" fill="currentColor">${parts.parts.map((p) =>
            p.kind === "path"
              ? svg`<path d="${p.d}"></path>`
              : p.kind === "circle"
              ? svg`<circle cx="${p.v[0]}" cy="${p.v[1]}" r="${p.v[2]}"></circle>`
              : svg`<rect x="${p.v[0]}" y="${p.v[1]}" width="${p.v[2]}" height="${p.v[3]}"></rect>`
          )}</svg>
          <small>${caption}</small>
        </div>`,
      };
    }
    const src = it.kind === "icon" || it.kind === "shape" ? "" : _safeThumb(it.thumb) || _safeThumb(it.path);
    if (src) return { caption: "", body: html`<div class="item-pic"><img src="${src}" alt="${it.name}" /></div>` };
    return { caption: "", body: html`<p class="fld-help">${tr("mcu-panel.panel.no-preview-available")}</p>` };
  }

  /** Selects an item for the inspector; below 1024 px that opens the sheet, except for the first selection on load. */
  _openInspector(opener, initial = false) {
    if (!shouldOpenSheet({ sheet: layoutFor(this._viewWidth).sheet, initial })) return;
    this._sheetOpener = opener || null;
    this._sheetOpen = true;
    this.updateComplete.then(() => {
      const back = this.shadowRoot && this.shadowRoot.querySelector(".ins-back");
      if (back && typeof back.focus === "function") back.focus();
    });
  }

  _closeSheet() {
    this._sheetOpen = false;
    const opener = this._sheetOpener;
    this._sheetOpener = null;
    this.updateComplete.then(() => opener && opener.isConnected && opener.focus());
  }

  _toggleGroup(id) {
    const next = new Set(this._openGroups);
    if (!next.delete(id)) next.add(id);
    this._openGroups = next;
  }

  _gripPointerDown(e) {
    e.preventDefault();
    const rect = this.shadowRoot.querySelector(".bp-grid").getBoundingClientRect();
    const rtl = this._isRtl();
    const move = (ev) => {
      const w = rtl ? ev.clientX - rect.left : rect.right - ev.clientX;
      this._inspectorWidth = Math.min(INSPECTOR.max, Math.max(INSPECTOR.min, Math.round(w)));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }

  willUpdate(changed) {
    // One locale for the panel and every Magic Card element it hosts (they read the same hass).
    if (changed.has("hass") && this.hass) {
      setI18nLocale(this.hass);
      this.setAttribute("lang", locale());
      this.setAttribute("data-bp-mode", modeFor(this.hass));
    }
    // The same measure drives the code and the CSS, so the sheet and the narrow layout apply together.
    const layout = layoutFor(this._viewWidth);
    this.setAttribute("data-layout", layout.mode);
    this.setAttribute("data-narrow", layout.narrow ? "true" : "false");
  }

  render() {
    if (!this.hass) {
      return html`<ha-circular-progress active></ha-circular-progress>`;
    }

    const covered = this._editorCoversPanel();
    const behindSheet = this._sheetCoversPanel();
    const activeTab = TABS.find(([t]) => t === this._tab) || TABS[0];
    return html`
      <div class="header" ?inert=${covered || behindSheet}>
        <ha-menu-button
          .hass=${this.hass}
          .narrow=${this.narrow}
        ></ha-menu-button>
        <h1 class="title">${activeTab[1]()}</h1>
      </div>

      ${this._editorOpen
        ? html`<div class="editor-host"></div>`
        : html`<div class="tabs" ?inert=${covered || behindSheet} role="tablist" aria-label=${tr("mcu-panel.panel.magic-card-utils")} data-fade=${this._tabFade} @keydown=${this._onTabKeydown} @scroll=${this._onTabsScroll}>
              ${TABS.map(
                ([tab, label]) => html`<button
                  class="tab"
                  role="tab"
                  id=${`mcu-tab-${tab}`}
                  aria-controls="mcu-tabpanel"
                  data-tab=${tab}
                  aria-selected=${this._tab === tab ? "true" : "false"}
                  tabindex=${this._tab === tab ? "0" : "-1"}
                  @click=${() => this._setTab(tab)}
                >
                  ${label()}
                </button>`
              )}
            </div>

            ${this._renderDraftingBody(covered)}`}
    `;
  }

  _renderTabBody() {
    return this._tab === "animations"
      ? this._renderAnimationsTab()
      : this._tab === "forum-shot"
      ? this._renderForumShotTab()
      : this._tab === "themes"
      ? this._renderThemesTab()
      : this._tab === "library"
      ? this._renderLibraryTab()
      : this._tab === "shapes"
      ? this._renderShapesTab()
      : this._tab === "icons"
      ? this._renderIconsTab()
      : this._tab === "images"
      ? this._renderImagesTab()
      : this._renderTemplatesTab();
  }

  _renderDraftingBody(covered) {
    const layout = layoutFor(this._viewWidth);
    const strings = this._draftingStrings();
    const model = this._inspectorModel();
    const ctx = {
      width: this._inspectorWidth,
      z: stepDensity(this._density, 0).z,
      sheet: layout.sheet,
      sheetOpen: layout.sheet && this._sheetOpen && !!model,
      openGroups: this._openGroups,
      modifiedOnly: this._modifiedOnly,
      onToggleGroup: (id) => this._toggleGroup(id),
      onModifiedOnly: (on) => (this._modifiedOnly = on),
      onClose: () => this._closeSheet(),
      onKeyDown: (e) => {
        if (sheetKey(e.key, { open: this._sheetOpen, sheet: layout.sheet }) === "close") {
          e.stopPropagation();
          this._closeSheet();
        } else if (e.key === "Tab") this._holdFocusInSheet(e);
      },
    };
    const showInspector = !!model && (layout.docked || ctx.sheetOpen);
    return renderBody(ctx, {
      main: html`<div role="tabpanel" id="mcu-tabpanel" aria-labelledby=${`mcu-tab-${this._tab}`}>${this._renderTabBody()}</div>`,
      inspector: showInspector ? renderInspector(strings, ctx, model) : null,
      grip: renderGrip(strings, this._inspectorWidth, {
        pointerDown: (e) => this._gripPointerDown(e),
        keyDown: (e) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
          e.preventDefault();
          this._inspectorWidth = gripKey(e.key, this._inspectorWidth, e.shiftKey);
        },
      }),
      pill:
        ["templates", "library", "icons", "shapes", "images"].includes(this._tab) && !covered
          ? renderDensityPill(strings, this._density, (dir) => (this._density = stepDensity(this._density, dir).pct), ctx.sheetOpen)
          : null,
    });
  }

  _filteredTemplates() {
    const q = (this._templateFilter || "").trim().toLocaleLowerCase();
    if (!q) return this._templates;
    return this._templates.filter((row) =>
      [row.name, row.description, row.card_type].some((v) => String(v || "").toLocaleLowerCase().includes(q))
    );
  }

  /** True while the full-screen details sheet is open; everything behind it is then out of the focus order. */
  _sheetCoversPanel() {
    return layoutFor(this._viewWidth).sheet && this._sheetOpen && !!this._inspectorModel();
  }

  /** Keeps Tab and Shift+Tab inside the open sheet: from its last control to its first, and back. */
  _holdFocusInSheet(e) {
    const sheet = this.shadowRoot && this.shadowRoot.querySelector(".inspector.is-sheet");
    if (!sheet) return;
    const SEL = "button, input, select, textarea, a[href], [tabindex]";
    const list = [];
    const walk = (root) => {
      for (const el of root.querySelectorAll(SEL)) {
        if (el.disabled || el.tabIndex < 0 || el.closest("[hidden]") || el.closest("[inert]")) continue;
        const before = list.length;
        if (el.shadowRoot) walk(el.shadowRoot);
        if (list.length === before) list.push(el);
      }
      for (const host of root.querySelectorAll("*")) {
        if (host.shadowRoot && !host.matches(SEL) && !host.closest("[hidden]") && !host.closest("[inert]")) walk(host.shadowRoot);
      }
    };
    walk(sheet);
    let active = this.shadowRoot.activeElement;
    while (active && active.shadowRoot && active.shadowRoot.activeElement) active = active.shadowRoot.activeElement;
    const target = tabWrapTarget(e.shiftKey, active, list);
    if (!target) return;
    e.preventDefault();
    target.focus();
  }

  /** True while the Animations or Themes editor fills the screen; the header and tabs then sit behind it. */
  _editorCoversPanel() {
    const el = this._tab === "animations" ? (this._studioOpen ? this._studioEl : null) : this._tab === "themes" ? this._themeEl : null;
    return !!el && el.hasAttribute("editing");
  }

  _pickTemplate(name, on) {
    const next = new Set(this._templatePicked);
    if (on) next.add(name);
    else next.delete(name);
    this._templatePicked = next;
  }

  _pickedTemplates() {
    return this._templates.filter((row) => this._templatePicked.has(row.name));
  }

  _openNewTemplate() {
    this._templateNotice = null;
    this._openEditTemplate({ name: "", description: "", card_type: "", raw: { config: { type: "custom:magic-card" } } });
  }

  _exportTemplates() {
    const picked = this._pickedTemplates();
    const rows = picked.length ? picked : this._templates;
    const templates = rows.map((row) => ({
      name: row.name,
      description: row.description || "",
      card_type: row.card_type || "",
      config: row.raw && row.raw.config ? row.raw.config : row.raw || {},
    }));
    const url = URL.createObjectURL(new Blob([JSON.stringify({ templates }, null, 2)], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "magic-card-templates.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  async _importTemplates(e) {
    const input = e.target;
    const file = input.files && input.files[0];
    input.value = "";
    if (!file) return;
    const fail = (text) => (this._templateNotice = { tone: "error", text });
    if (file.size > MAX_TEMPLATE_IMPORT_BYTES) return fail(tr("mcu-panel.panel.that-file-is-too-big-to-import"));
    let items = null;
    try {
      const parsed = JSON.parse(await file.text());
      items = Array.isArray(parsed && parsed.templates) ? parsed.templates : null;
    } catch (_err) {
      items = null;
    }
    const usable = (items || []).filter(
      (t) => t && typeof t.name === "string" && t.name.trim() && t.config && typeof t.config === "object" && !Array.isArray(t.config)
    );
    if (!usable.length) return fail(tr("mcu-panel.panel.that-file-has-no-templates-to-import"));
    const taken = new Set(this._templates.map((t) => t.name));
    let saved = 0;
    for (const t of usable) {
      const base = t.name.trim();
      const name = taken.has(base) ? this._uniqueCopyName(base, taken) : base;
      const payload = {
        type: "magic_card_utils/save_template",
        name,
        template: { config: t.config, description: typeof t.description === "string" ? t.description : "" },
      };
      if (typeof t.card_type === "string" && t.card_type) payload.card_type = t.card_type;
      try {
        await this.hass.callWS(payload);
        taken.add(name);
        saved += 1;
      } catch (err) {
        console.error("[magic_card_utils] import failed", err);
      }
    }
    this._templateNotice =
      saved === usable.length
        ? { tone: "success", text: tr("mcu-panel.panel.imported-n-templates", { n: saved }) }
        : { tone: "error", text: tr("mcu-panel.panel.imported-n-of-total-templates", { n: saved, total: usable.length }) };
  }

  /** Selects a template for the inspector and renders its live preview there. */
  _selectTemplate(name, opener) {
    if (this._templateSelected == null) this._openGroups = new Set([...this._openGroups, "preview"]);
    this._templateSelected = name;
    this._openInspector(opener);
    this.updateComplete.then(() => this._buildTemplatePreview());
  }

  /** The inspector content for the selected template: its details and the live card. */
  _templatesInspectorModel() {
    const row = this._templateSelected == null ? null : this._templates.find((r) => r.name === this._templateSelected);
    if (!row) return null;
    const config = (row.raw && (row.raw.config || row.raw)) || {};
    const type = row.card_type || (config && config.type) || "";
    const fields = [
      { kind: "field", label: tr("mcu-panel.panel.description"), value: row.description || "" },
      { kind: "field", label: tr("mcu-panel.panel.card-type"), value: type },
      { kind: "field", label: tr("mcu-panel.panel.n-linked-cards", { n: row.linked_cards }), value: String(row.linked_cards) },
      { kind: "field", label: tr("mcu-panel.panel.updated-date", { date: this._formatDate(row.last_updated) }), value: this._formatDate(row.last_updated) },
    ];
    return {
      name: row.name,
      type,
      groups: [
        { id: "details", title: tr("mcu-panel.panel.details"), summary: row.description || row.name, fields },
        {
          id: "preview",
          title: tr("mcu-panel.panel.preview"),
          summary: type,
          body: html`${this._previewError
              ? html`<div class="notice error preview-note" role="alert">${glyph("error", 20)}<div class="body"><p>${this._previewError}</p></div></div>`
              : ""}${this._viewRow ? "" : html`<div class="preview-host"></div>`}`,
        },
      ],
    };
  }

  async _buildTemplatePreview() {
    const row = this._templates.find((r) => r.name === this._templateSelected);
    if (!row || this._viewRow) return;
    this._builtPreviewHost = this.shadowRoot.querySelector(".preview-host");
    this._previewError = "";
    await this._buildPreview(row);
  }

  _renderTemplateRow(row) {
    const checkId = `mcu-template-${this._templates.indexOf(row)}`;
    const checked = this._templatePicked.has(row.name);
    const sub = [
      row.description,
      row.card_type,
      tr("mcu-panel.panel.n-linked-cards", { n: row.linked_cards }),
      tr("mcu-panel.panel.updated-date", { date: this._formatDate(row.last_updated) }),
    ].filter(Boolean).join(" · ");
    return html`
      <div class="row ${checked ? "selected" : ""} ${this._templateSelected === row.name ? "current" : ""}" role="listitem">
        <input type="checkbox" class="check" id=${checkId} aria-label=${tr("mcu-panel.panel.select-name", { name: row.name })}
          .checked=${checked} @change=${(e) => this._pickTemplate(row.name, e.target.checked)} />
        <button type="button" class="name" aria-current="${this._templateSelected === row.name ? "true" : "false"}"
          @click=${(e) => this._selectTemplate(row.name, e.currentTarget)}><bdi>${row.name}</bdi><small>${sub}</small></button>
        <span class="acts">
          <button type="button" class="icon-btn xs action-btn studio" title=${tr("mcu-panel.panel.open-in-studio")}
            aria-label=${tr("mcu-panel.panel.open-name-in-studio", { name: row.name })} @click=${() => this._openStudio(row)}>${glyph("fullscreen")}</button>
          <button type="button" class="icon-btn xs action-btn edit" title=${tr("mcu-panel.panel.edit")}
            aria-label=${tr("mcu-panel.panel.edit-name", { name: row.name })} @click=${() => this._openTemplate(row)}>${glyph("pencil")}</button>
          <button type="button" class="icon-btn xs action-btn duplicate" title=${tr("mcu-panel.panel.duplicate")}
            aria-label=${tr("mcu-panel.panel.duplicate-name", { name: row.name })} @click=${() => this._openDuplicate(row)}>${glyph("copy")}</button>
          <button type="button" class="icon-btn xs danger action-btn"
            title=${row.linked_cards > 0 ? tr("mcu-panel.panel.cannot-delete-linked-cards", { n: row.linked_cards }) : tr("mcu-panel.panel.delete")}
            aria-label=${row.linked_cards > 0
              ? tr("mcu-panel.panel.cannot-delete-name-linked-cards", { name: row.name, n: row.linked_cards })
              : tr("mcu-panel.panel.delete-name", { name: row.name })}
            ?disabled=${row.linked_cards > 0} @click=${() => this._openDelete(row)}>${glyph("delete")}</button>
        </span>
      </div>
    `;
  }

  _renderTemplatesTab() {
    const shown = this._filteredTemplates();
    const picked = this._pickedTemplates().length;
    const notice = this._templateNotice;
    return html`
      <div class="content">
        ${this._error
          ? html`<div class="notice error" role="alert">${glyph("error", 20)}<div class="body"><p>${this._error}</p></div></div>`
          : ""}
        <div class="field">
          <div class="field-head"><label for="mcu-template-search">${tr("mcu-panel.panel.search-templates")}</label></div>
          <div class="with-icon">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <input id="mcu-template-search" class="input" type="search" .value=${this._templateFilter}
              @input=${(e) => (this._templateFilter = e.target.value)} />
          </div>
        </div>
        <div class="bar">
          <button type="button" class="btn btn-secondary" ?disabled=${!this._templates.length} @click=${this._exportTemplates}>
            <ha-icon icon="mdi:export-variant"></ha-icon>${picked ? tr("mcu-panel.panel.export-n-selected", { n: picked }) : tr("mcu-panel.panel.export-all")}
          </button>
          <button type="button" class="btn btn-primary" @click=${this._openNewTemplate}>
            <ha-icon icon="mdi:plus"></ha-icon>${tr("mcu-panel.panel.new-template")}
          </button>
          <button type="button" class="btn btn-secondary" @click=${(e) => e.currentTarget.nextElementSibling.click()}>
            <ha-icon icon="mdi:import"></ha-icon>${tr("mcu-panel.panel.import")}
          </button>
          <input type="file" accept=".json,application/json" hidden @change=${this._importTemplates} />
        </div>
        ${notice
          ? html`<div class="notice ${notice.tone}" role=${notice.tone === "error" ? "alert" : "status"}>${glyph(notice.tone, 20)}<div class="body"><p>${notice.text}</p></div></div>`
          : ""}
        <div role="status" aria-live="polite" class="help">${tr("mcu-panel.panel.count-templates", { n: shown.length })}</div>
        ${this._templates.length === 0
          ? html`<div class="empty"><strong>${tr("mcu-panel.panel.no-templates-saved-yet")}</strong></div>`
          : shown.length
          ? html`<div class="rows" role="list">${shown.map((row) => this._renderTemplateRow(row))}</div>`
          : html`<p class="help">${tr("mcu-panel.panel.no-templates-match-search")}</p>`}
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
                aria-label=${this._viewMode === "edit" ? tr("mcu-panel.panel.edit-template") : tr("mcu-panel.panel.template-preview")}
                @click=${(e) => e.stopPropagation()}
              >
                <div class="dialog-header">
                  <div class="dialog-title">
                    <span class="dialog-title-name">${this._viewRow.name || tr("mcu-panel.panel.new-template")}</span>
                    ${this._viewRow.card_type
                      ? html`<span class="chip mono">${this._viewRow.card_type}</span>`
                      : ""}
                  </div>
                  <div class="dialog-header-actions">
                    ${this._viewMode === "yaml"
                      ? html`<button type="button" class="icon-btn sm" title=${tr("mcu-panel.panel.edit")} aria-label=${tr("mcu-panel.panel.edit-template-2")} @click=${() => this._openEditTemplate(this._viewRow)}>
                          ${glyph("pencil")}
                        </button>`
                      : ""}
                    <button type="button" class="icon-btn sm close-btn" @click=${this._closeOverlay} title=${tr("mcu-panel.panel.close")} aria-label=${tr("mcu-panel.panel.close")}>${glyph("close")}</button>
                  </div>
                </div>
                <div class="dialog-body">
                  ${this._viewMode === "edit"
                    ? html`
                        <div class="pane metadata-pane">
                          <div class="pane-header">${tr("mcu-panel.panel.template")}</div>
                          <div class="meta-body">
                            <div class="field">
                              <div class="field-head"><label for="mcu-meta-name">${tr("mcu-panel.panel.name")}</label></div>
                              <input id="mcu-meta-name" class="input" type="text" .value=${this._editMeta.name}
                                @input=${(e) => (this._editMeta = { ...this._editMeta, name: e.target.value })} />
                            </div>
                            <div class="field">
                              <div class="field-head"><label for="mcu-meta-description">${tr("mcu-panel.panel.description")}</label></div>
                              <input id="mcu-meta-description" class="input" type="text" .value=${this._editMeta.description}
                                @input=${(e) => (this._editMeta = { ...this._editMeta, description: e.target.value })} />
                            </div>
                            <div class="field">
                              <div class="field-head"><label for="mcu-meta-type">${tr("mcu-panel.panel.card-type")}</label></div>
                              <input id="mcu-meta-type" class="input mono" type="text" placeholder=${"custom:magic-card"} .value=${this._editMeta.card_type}
                                @input=${(e) => (this._editMeta = { ...this._editMeta, card_type: e.target.value })} />
                            </div>
                            <p class="help">${tr("mcu-panel.panel.edit-the-card-using-the-editor-on-the")}</p>
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
                    <div class="pane-header">${this._viewMode === "edit" ? tr("mcu-panel.panel.editor") : tr("mcu-panel.panel.preview")}</div>
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
                    <button type="button" class="btn btn-secondary" @click=${this._closeOverlay}>${tr("mcu-panel.panel.cancel")}</button>
                    <button type="button" class="btn btn-primary" @click=${this._saveEditedTemplate} ?disabled=${this._submitting}>${this._submitting ? tr("mcu-panel.panel.saving") : tr("mcu-panel.panel.save")}</button>
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
                  ? tr("mcu-panel.panel.duplicate-template")
                  : tr("mcu-panel.panel.delete-template")}
              </span>
              <span class="chip mono">${row.name}</span>
            </div>
            <button
              type="button"
              class="icon-btn sm close-btn"
              @click=${this._closeAction}
              ?disabled=${this._submitting}
              title=${tr("mcu-panel.panel.close")}
              aria-label=${tr("mcu-panel.panel.close")}
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
              ${tr("mcu-panel.panel.cancel")}
            </button>
            ${this._actionMode === "duplicate"
              ? html`<button
                  type="button"
                  class="btn btn-primary"
                  @click=${this._submitDuplicate}
                  ?disabled=${this._submitting}
                >
                  ${this._submitting ? tr("mcu-panel.panel.duplicating") : tr("mcu-panel.panel.duplicate")}
                </button>`
              : ""}
            ${this._actionMode === "delete"
              ? html`<button
                  type="button"
                  class="btn btn-danger"
                  @click=${this._submitDelete}
                  ?disabled=${this._submitting || row.linked_cards > 0}
                >
                  ${this._submitting ? tr("mcu-panel.panel.deleting") : tr("mcu-panel.panel.delete")}
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
        <div class="field-head"><label for="mcu-duplicate-name">${tr("mcu-panel.panel.new-template-name")}</label></div>
        <input
          id="mcu-duplicate-name"
          class="input"
          type="text"
          .value=${this._duplicateName}
          @input=${(e) => (this._duplicateName = e.target.value)}
          ?disabled=${this._submitting}
        />
        <p class="help">${tr("mcu-panel.panel.copies-the-config-description-and-card")}</p>
      </div>
    `;
  }

  _renderDeleteForm(row) {
    if (row.linked_cards > 0) {
      return html`
        <div class="notice warn" role="status">
          ${glyph("warn", 20)}
          <div class="body">
            <p>${tr("mcu-panel.panel.this-template-is-still-linked-to-cards", { n: row.linked_cards })}</p>
          </div>
        </div>
      `;
    }
    return html`
      <div>${trx("mcu-panel.panel.delete-name-this-action-cannot-be-undone", { name: html`<strong>${row.name}</strong>` })}</div>
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
    return draftingStyles;
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
  FOCUS_KEY_RE,
  MIN_MAGIC_CARD_FOR_EDITORS,
  EDITORS_MIN_CONTRACT_REVISION,
  MIN_MAGIC_CARD_FOR_IMAGES,
  MIN_MAGIC_CARD_FOR_FORUM_SHOT,
  forumShotUrl: _forumShotUrl,
  IMAGES_MIN_CONTRACT_REVISION,
  TABS,
};
