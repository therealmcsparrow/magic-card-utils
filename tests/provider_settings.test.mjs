// The every-page provider publishes the Google Fonts switch and loads the fonts of the active theme.
// Run with `node --test tests/provider_settings.test.mjs`.
import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";

const file = path.join(import.meta.dirname, "..", "custom_components", "magic_card_utils", "www", "magic_card_utils_library.js");

// The script is a classic script, so each scenario runs a fresh copy of its source against its own fake page.
const source = fs.readFileSync(file, "utf8");
const load = async (reply) => {
  const events = [];
  const listeners = {};
  const links = [];
  let release;
  const gate = new Promise((r) => (release = r));
  const ha = { hass: { themes: { theme: "T" } } };
  globalThis.CSS = { escape: (s) => s.replace(/["\\]/g, "\\$&") };
  globalThis.document = {
    head: {
      querySelector: (sel) => links.find((l) => sel === `link[data-mc-font="${l.dataset.mcFont}"]`) || null,
      appendChild: (l) => links.push(l),
    },
    querySelector: (sel) => (sel === "home-assistant" ? ha : null),
    createElement: () => ({ dataset: {} }),
  };
  globalThis.window = {
    dispatchEvent: (e) => events.push(e),
    addEventListener: (type, fn) => (listeners[type] = fn),
    hassConnection: Promise.resolve({
      conn: {
        subscribeMessage: async () => {},
        sendMessagePromise: async (msg) => {
          if (msg.type !== "magic_card_utils/get_settings") return {};
          await gate;
          if (reply instanceof Error) throw reply;
          return reply;
        },
      },
    }),
  };
  new Function(source)();
  const mcu = window.magicCardUtils;
  const tick = () => new Promise((r) => setTimeout(r, 20));
  await tick();
  const before = mcu.settings;
  release();
  await tick();
  return { mcu, before, events, links, ha, listeners, tick };
};
const settingsEvents = (events) => events.filter((e) => e.type === "mcu-settings");

test("switch off: settings say false, the event fires and no link is added", async () => {
  const p = await load({ google_fonts: false, theme_fonts: { T: [{ name: "Lato", weights: [400] }] } });
  assert.equal(p.before, undefined);
  assert.deepEqual(p.mcu.settings, { googleFonts: false });
  assert.equal(settingsEvents(p.events).length, 1);
  assert.deepEqual(settingsEvents(p.events)[0].detail, { googleFonts: false });
  assert.equal(p.links.length, 0);
  assert.equal(p.listeners.settheme, undefined);
  assert.ok(p.mcu.shapes && p.mcu.ready, "the other members stay");
});

test("switch on: the active theme's font gets one link; a theme change adds only new families", async () => {
  const p = await load({
    google_fonts: true,
    theme_fonts: {
      T: [{ name: "Lato", weights: [100, 300, 400, 900] }],
      U: [{ name: "Lato", weights: [400] }, { name: "Pacifico", weights: [400] }, { name: "Open Sans", weights: [] }],
    },
  });
  assert.equal(p.before, undefined);
  assert.deepEqual(p.mcu.settings, { googleFonts: true });
  assert.equal(p.links.length, 1);
  assert.equal(p.links[0].href, "https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap");
  assert.equal(p.links[0].rel, "stylesheet");
  assert.equal(p.links[0].dataset.mcFont, "Lato");
  p.ha.hass.themes.theme = "U";
  p.listeners.settheme();
  assert.deepEqual(p.links.map((l) => l.dataset.mcFont), ["Lato", "Pacifico", "Open Sans"]);
  assert.equal(p.links[1].href, "https://fonts.googleapis.com/css2?family=Pacifico:wght@400&display=swap");
  assert.equal(p.links[2].href, "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
  p.ha.hass.selectedTheme = { theme: "T" };
  p.listeners.settheme();
  assert.equal(p.links.length, 3);
});

test("only names from the reply are used; a theme without fonts adds nothing", async () => {
  const p = await load({ google_fonts: true, theme_fonts: { T: [{ name: "Lato", weights: [400] }] } });
  p.ha.hass.themes.theme = "Segoe";
  p.listeners.settheme();
  assert.deepEqual(p.links.map((l) => l.dataset.mcFont), ["Lato"]);
});

test("a failed websocket call leaves googleFonts false, fires the event and does not throw", async () => {
  const p = await load(new Error("boom"));
  assert.deepEqual(p.mcu.settings, { googleFonts: false });
  assert.equal(settingsEvents(p.events).length, 1);
  assert.equal(p.links.length, 0);
});

test("Backend-selected (an empty user pick) uses the default theme", async () => {
  const p = await load({ google_fonts: true, theme_fonts: { T: [{ name: "Lato", weights: [400] }], U: [{ name: "Pacifico", weights: [400] }] } });
  p.ha.hass.selectedTheme = { theme: "" };
  p.ha.hass.themes.theme = "U";
  p.listeners.settheme();
  assert.deepEqual(p.links.map((l) => l.dataset.mcFont), ["Lato", "Pacifico"]);
});

test("dark mode uses the default dark theme when one is set", async () => {
  const p = await load({
    google_fonts: true,
    theme_fonts: { T: [{ name: "Lato", weights: [400] }], D: [{ name: "Pacifico", weights: [400] }], P: [{ name: "Inter", weights: [400] }] },
  });
  Object.assign(p.ha.hass.themes, { darkMode: true, default_dark_theme: "D" });
  p.listeners.settheme();
  assert.deepEqual(p.links.map((l) => l.dataset.mcFont), ["Lato", "Pacifico"]);
  // the user's own pick still wins
  p.ha.hass.selectedTheme = { theme: "P" };
  p.listeners.settheme();
  assert.deepEqual(p.links.map((l) => l.dataset.mcFont), ["Lato", "Pacifico", "Inter"]);
});

test("a name outside letters, digits and spaces is never turned into a link", async () => {
  const p = await load({
    google_fonts: true,
    theme_fonts: { T: [{ name: 'Lato" onload="x', weights: [400] }, { name: "A".repeat(65), weights: [400] }, { name: "Open Sans 2", weights: [400] }] },
  });
  assert.deepEqual(p.links.map((l) => l.dataset.mcFont), ["Open Sans 2"]);
});
