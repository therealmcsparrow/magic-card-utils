// Themes tab: a refused delete or save because the file was edited by hand is explained in plain words,
// in en-GB, en-US and nl. Run with `node --test tests/panel_theme_hand_edit.test.mjs`.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

class FakeEl {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.attrs = {};
    this.children = [];
    this.dataset = {};
  }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  getAttribute(k) { return this.attrs[k] ?? null; }
  addEventListener() {}
  removeEventListener() {}
  appendChild(c) { this.children.push(c); return c; }
  focus() {}
}
globalThis.window = globalThis;
window.addEventListener ||= () => {};
window.removeEventListener ||= () => {};
window.dispatchEvent ||= () => true;
globalThis.HTMLElement = FakeEl;
globalThis.document = { createElement: (t) => new FakeEl(t), createElementNS: (ns, t) => new FakeEl(t), createTreeWalker: () => ({}), addEventListener() {} };
const registry = new Map();
globalThis.customElements = { define: (n, c) => registry.set(n, c), get: (n) => registry.get(n) };

const root = path.join(import.meta.dirname, "..");
const www = path.join(root, "custom_components", "magic_card_utils", "www");
await import(pathToFileURL(path.join(www, "magic_card_utils_panel.js")).href);
const Panel = customElements.get("magic-card-utils-panel");
const cat = (l) => JSON.parse(fs.readFileSync(path.join(root, "i18n", `${l}.json`), "utf8"));
const GB = cat("en-GB");
const GENERIC = GB["mcu-panel.panel.the-theme-could-not-be-deleted"].text;

function makePanel(wsError) {
  const p = Object.create(Panel.prototype);
  p.requestUpdate = () => {};
  Object.defineProperty(p, "shadowRoot", { value: { querySelector: () => null, querySelectorAll: () => [] } });
  p.hass = {
    user: { is_admin: true },
    language: "en-GB",
    locale: { language: "en-GB" },
    callWS: async () => { throw wsError; },
  };
  p._loadThemeFiles = async () => {};
  p._themeListError = "";
  return p;
}

const handKeys = () =>
  Object.keys(GB).filter((k) => k.startsWith("mcu-panel.panel.") && /by hand/i.test(GB[k].text));

test("a delete refused with edited_by_hand does not say the generic 'could not be deleted'", async () => {
  const p = makePanel({ code: "edited_by_hand", message: "themes/t.yaml was edited by hand." });
  await p._deleteTheme("t", true);
  assert.ok(p._themeListError, "an error is shown");
  assert.notEqual(p._themeListError, GENERIC);
  assert.match(p._themeListError, /by hand/i);
});

test("other delete failures keep the generic text", async () => {
  const p = makePanel({ code: "save_failed", message: "no" });
  await p._deleteTheme("t", true);
  assert.equal(p._themeListError, GENERIC);
});

test("the by-hand message has an entry in en-GB, en-US and nl with a note and a length limit", () => {
  const keys = handKeys();
  assert.ok(keys.length >= 1, "no mcu-panel.panel.* entry that says 'edited by hand'");
  for (const k of keys) {
    assert.ok(GB[k].note && GB[k].max, `${k}: note and max`);
    for (const l of ["en-US", "nl"]) assert.ok(cat(l)[k]?.text?.trim(), `${l} text missing for ${k}`);
    assert.notEqual(cat("nl")[k].text, GB[k].text, `${k}: nl is not translated`);
    assert.ok(GB[k].text.length <= GB[k].max, `${k}: over its limit`);
  }
});

test("the message says what to do next (save under a new name)", () => {
  const texts = handKeys().map((k) => GB[k].text);
  assert.ok(texts.some((x) => /new name|another name|copy/i.test(x)), "no way forward in the text");
});

test("British spelling in the English text", () => {
  for (const k of handKeys()) assert.doesNotMatch(GB[k].text, /\b(color|center)\b/i);
});
