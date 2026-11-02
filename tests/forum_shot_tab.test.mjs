// Forum shot tab, run with `node --test tests/forum_shot_tab.test.mjs`.
// The panel is plain JS; a few DOM globals are enough to import it and the tab's methods run on a bare prototype.
import test from "node:test";
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";

class FakeEl {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.children = [];
    this.parentNode = null;
  }
  addEventListener() {}
  removeEventListener() {}
  appendChild(c) {
    c.parentNode = this;
    this.children.push(c);
    return c;
  }
  removeChild(c) {
    this.children = this.children.filter((x) => x !== c);
    c.parentNode = null;
  }
  set innerHTML(_v) {
    for (const c of this.children) c.parentNode = null;
    this.children = [];
  }
}

globalThis.window = globalThis;
window.addEventListener ||= () => {};
window.removeEventListener ||= () => {};
window.dispatchEvent ||= () => true;
window.location = { href: "http://ha.local:8123/magic-card-utils", origin: "http://ha.local:8123", search: "" };
globalThis.HTMLElement = FakeEl;
globalThis.document = { createElement: (t) => new FakeEl(t), createElementNS: (ns, t) => new FakeEl(t), createTreeWalker: () => ({}), addEventListener() {} };
const registry = new Map();
globalThis.customElements = { define: (n, c) => registry.set(n, c), get: (n) => registry.get(n) };

const www = path.join(import.meta.dirname, "..", "custom_components", "magic_card_utils", "www");
const mod = await import(pathToFileURL(path.join(www, "magic_card_utils_panel.js")).href);
const T = mod._testing;
const Panel = customElements.get("magic-card-utils-panel");
const MIN = T.MIN_MAGIC_CARD_FOR_FORUM_SHOT;

function makePanel({ cardOk = true, cardUrl = "http://ha.local:8123/hacsfiles/magic-card/magic-card.js" } = {}) {
  const p = Object.create(Panel.prototype);
  const host = new FakeEl("div");
  const root = new FakeEl("root");
  root.querySelector = (sel) => (sel === ".forum-host" ? host : null);
  Object.defineProperty(p, "shadowRoot", { value: root });
  p.requestUpdate = () => {};
  Object.defineProperty(p, "updateComplete", { value: Promise.resolve() });
  p.hass = { user: { is_admin: true }, callWS: async () => ({}) };
  p.narrow = true;
  p._magicCardUrl = cardUrl;
  p._forumStatus = "";
  p._forumMessage = "";
  p._forumEl = null;
  p._ensureMagicCard = async () => (cardOk ? { ok: true } : { ok: false, message: "Magic Card isn't installed. Install it from HACS and add it as a dashboard resource." });
  p.__host = host;
  return p;
}

function installCard({ version = MIN, contract = "1.0.0", element = true } = {}) {
  window.MagicCard = { version, apiVersion: 1 };
  registry.set("magic-card", class {});
  if (element) {
    const C = class extends FakeEl {
      constructor() {
        super("magic-card-forum-shot");
      }
    };
    C.contractVersion = contract;
    registry.set("magic-card-forum-shot", C);
  }
}

function reset() {
  delete window.MagicCard;
  registry.delete("magic-card");
  registry.delete("magic-card-forum-shot");
}

test("the tab bar lists the Forum shot tab last", () => {
  const last = T.TABS[T.TABS.length - 1];
  assert.equal(last[0], "forum-shot");
  assert.equal(last[1](), "Forum shot");
});

test("the minimum card version is a version the panel can compare", () => {
  assert.equal(T.compareCalVer(MIN, MIN), 0);
  assert.ok(T.compareCalVer("2026.10.12-beta.12", MIN) < 0);
});

test("the entry URL is the sibling of magic-card.js on the same origin under /local/ or /hacsfiles/", () => {
  assert.equal(
    T.forumShotUrl("/hacsfiles/magic-card/magic-card.js?v=3"),
    "http://ha.local:8123/hacsfiles/magic-card/magic-card-forum-shot.js?v=3"
  );
  assert.equal(T.forumShotUrl("/local/magic-card.js"), "http://ha.local:8123/local/magic-card-forum-shot.js");
  assert.equal(T.forumShotUrl("http://ha.local:8123/local/magic-card.js"), "http://ha.local:8123/local/magic-card-forum-shot.js");
});

test("the entry URL is null for another origin, another folder, another scheme or no card URL", () => {
  assert.equal(T.forumShotUrl("https://cdn.example.com/local/magic-card.js"), null);
  assert.equal(T.forumShotUrl("//cdn.example.com/local/magic-card.js"), null);
  assert.equal(T.forumShotUrl("http://ha.local:9999/local/magic-card.js"), null);
  assert.equal(T.forumShotUrl("/api/something/magic-card.js"), null);
  assert.equal(T.forumShotUrl("/local/../api/magic-card.js"), null);
  assert.equal(T.forumShotUrl("javascript:/local/magic-card.js"), null);
  assert.equal(T.forumShotUrl("/local/other.js"), null);
  assert.equal(T.forumShotUrl(null), null);
});

test("a card older than the minimum names the minimum version", async () => {
  reset();
  installCard({ version: "2026.10.12-beta.12" });
  const r = await makePanel()._ensureForumShot();
  assert.equal(r.ok, false);
  assert.ok(r.message.includes(MIN));
  assert.match(r.message, /needs Magic Card/);
});

test("a card that reports no version is treated as too old", async () => {
  reset();
  installCard({ version: null });
  const r = await makePanel()._ensureForumShot();
  assert.equal(r.ok, false);
  assert.match(r.message, /needs Magic Card/);
});

test("a missing Magic Card passes its own message through", async () => {
  reset();
  const r = await makePanel({ cardOk: false })._ensureForumShot();
  assert.equal(r.ok, false);
  assert.match(r.message, /isn't installed/);
});

test("a registered element at contract 1.x loads", async () => {
  reset();
  installCard({ contract: "1.4.0" });
  assert.deepEqual(await makePanel()._ensureForumShot(), { ok: true });
});

test("an element on another contract major shows the minimum version", async () => {
  reset();
  installCard({ contract: "2.0.0" });
  const r = await makePanel()._ensureForumShot();
  assert.equal(r.ok, false);
  assert.ok(r.message.includes(MIN));
});

test("no element and no usable URL names the file and the minimum, and the load is tried once", async () => {
  reset();
  installCard({ element: false });
  const p = makePanel({ cardUrl: "https://cdn.example.com/local/magic-card.js" });
  const a = await p._ensureForumShot();
  const first = p._forumLoad;
  const b = await p._ensureForumShot();
  assert.equal(a.ok, false);
  assert.match(a.message, /magic-card-forum-shot\.js/);
  assert.ok(a.message.includes(MIN));
  assert.equal(b.message, a.message);
  assert.equal(p._forumLoad, first);
});

test("mounting creates the element with hass and narrow and puts it in the host", async () => {
  reset();
  installCard();
  const p = makePanel();
  await p._mountForumShot();
  assert.equal(p._forumStatus, "ready");
  assert.equal(p._forumEl.hass, p.hass);
  assert.equal(p._forumEl.narrow, true);
  assert.equal(p.__host.children[0], p._forumEl);
});

test("a failed mount sets the error state and does not retry on its own", async () => {
  reset();
  installCard({ version: "2020.1.1" });
  const p = makePanel();
  let calls = 0;
  const inner = p._ensureForumShot.bind(p);
  p._ensureForumShot = async () => (calls++, inner());
  await p._mountForumShot();
  assert.equal(p._forumStatus, "error");
  assert.match(p._forumMessage, /needs Magic Card/);
  await p._mountForumShot();
  assert.equal(calls, 2, "only a new call from the user's side mounts again; the status stays error");
  assert.equal(p._forumEl, null);
});
