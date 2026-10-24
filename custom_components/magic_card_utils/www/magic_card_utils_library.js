// Magic Card Utils library provider (contract mcu-library 1.1.0). Loaded on every HA page.
// Registers window.customIcons.mcu (merge, never replace) and window.magicCardUtils.
// Touches no DOM. Reads the saved library over HA's own websocket connection.
try {
  const PREFIX = "mcu";
  const CMD = "magic_card_utils/";
  const POLL_MS = 50;
  const WAIT_MS = 30000;
  const BLANK = { path: "", viewBox: "0 0 24 24" };
  const ID_RE = /^[a-z0-9][a-z0-9_-]{0,63}$/;

  const items = new Map(); // id -> SavedIcon (fetched lazily)
  const pending = new Map(); // id -> [resolve]
  let shapes = new Map(); // id -> shape options
  let connPromise = null;
  let timer = 0;
  let batchTimer = 0;

  const announce = (kind, ids) => {
    try {
      window.dispatchEvent(new CustomEvent("iconset-registered", { detail: { prefix: PREFIX } }));
      window.dispatchEvent(new CustomEvent("mcu-library-changed", { detail: { kind, ids } }));
    } catch (e) { /* ignore */ }
  };

  // Resolves { conn } or null after WAIT_MS. One timer, started on first use.
  const getConn = () => {
    if (connPromise) return connPromise;
    connPromise = new Promise((resolve) => {
      const t0 = Date.now();
      const check = () => {
        timer = 0;
        if (window.hassConnection) {
          Promise.resolve(window.hassConnection).then((c) => resolve(c && c.conn ? c.conn : null), () => resolve(null));
        } else if (Date.now() - t0 >= WAIT_MS) {
          resolve(null);
        } else {
          timer = setTimeout(check, POLL_MS);
        }
      };
      check();
    });
    return connPromise;
  };

  const send = async (msg) => {
    const conn = await getConn();
    if (!conn) throw new Error("no connection");
    return conn.sendMessagePromise(msg);
  };

  const flush = async () => {
    batchTimer = 0;
    const ids = [...pending.keys()];
    const waiting = new Map(pending);
    pending.clear();
    let got = {};
    try {
      const r = await send({ type: CMD + "icons_get", ids });
      for (const icon of r.icons || []) {
        items.set(icon.id, icon);
        got[icon.id] = icon;
      }
    } catch (e) { /* answer blank */ }
    for (const [id, resolvers] of waiting) resolvers.forEach((fn) => fn(got[id] || null));
  };

  const fetchItem = (id) => {
    if (items.has(id)) return Promise.resolve(items.get(id));
    return new Promise((resolve) => {
      if (!pending.has(id)) pending.set(id, []);
      pending.get(id).push(resolve);
      if (!batchTimer) batchTimer = setTimeout(flush, 0);
    });
  };

  const toProviderIcon = (icon) => {
    const out = { path: icon.path || "", viewBox: icon.view_box || BLANK.viewBox, mc_svg: icon.svg };
    if (icon.secondary_path) out.secondaryPath = icon.secondary_path;
    return out;
  };

  const getIcon = async (name) => {
    try {
      const id = String(name);
      if (!ID_RE.test(id)) return { ...BLANK };
      const icon = await fetchItem(id);
      return icon ? toProviderIcon(icon) : { ...BLANK };
    } catch (e) {
      return { ...BLANK };
    }
  };

  const getIconList = async () => {
    try {
      const r = await send({ type: CMD + "icons_list" });
      return (r.icons || []).map((i) => ({ name: i.id, keywords: [i.name, ...(i.keywords || [])] }));
    } catch (e) {
      return [];
    }
  };

  // Library images are read by the cards that show them; the provider only tells the page that one changed.
  const onImageEvent = (ev) => {
    const id = ev.action === "saved" ? ev.image && ev.image.id : ev.action === "deleted" ? ev.id : null;
    if (typeof id !== "string" || !ID_RE.test(id)) return;
    window.dispatchEvent(new CustomEvent("mcu-library-changed", { detail: { kind: "images", ids: [id] } }));
  };

  const onEvent = (ev) => {
    try {
      if (ev && ev.kind === "images") return onImageEvent(ev);
      if (!ev || (ev.kind !== "icons" && ev.kind !== "shapes")) return;
      if (ev.kind === "icons") {
        const id = ev.action === "saved" ? ev.icon && ev.icon.id : ev.id;
        if (!id) return;
        items.delete(id);
        announce("icons", [id]);
      } else {
        const id = ev.action === "saved" ? ev.shape && ev.shape.id : ev.id;
        if (!id) return;
        if (ev.action === "saved") shapes.set(id, ev.shape.shape);
        else shapes.delete(id);
        announce("shapes", [id]);
      }
    } catch (e) { /* ignore */ }
  };

  // Subscribe first so nothing is missed. The shapes (up to 1.6 MB) are NOT read here: this script runs on
  // every HA page for every user, so they load on the first shapes.get / shapes.ids (a card with a ref).
  const ready = (async () => {
    try {
      const conn = await getConn();
      if (!conn) return;
      await conn.subscribeMessage(onEvent, { type: CMD + "subscribe_library" });
    } catch (e) { /* keep an empty library */ }
  })();

  // Once per page (no retry storm after a failure): the list is read after the subscription, so nothing is missed.
  let shapesLoad = null;
  const loadShapes = () => {
    if (shapesLoad) return;
    shapesLoad = (async () => {
      try {
        await ready;
        const conn = await getConn();
        if (!conn) return;
        const r = await conn.sendMessagePromise({ type: CMD + "shapes_list" });
        shapes = new Map((r.shapes || []).map((s) => [s.id, s.shape]));
        announce("shapes", []);
      } catch (e) { /* keep an empty library */ }
    })();
  };

  // Synchronous registration. Merge into an existing object, never replace it.
  window.customIcons = window.customIcons || {};
  window.customIcons[PREFIX] = { getIcon, getIconList };
  window.magicCardUtils = {
    apiVersion: 1,
    ready,
    shapes: {
      get: (id) => (loadShapes(), shapes.get(id)),
      ids: () => (loadShapes(), [...shapes.keys()]),
    },
  };
  getConn();
  announce("icons", []);
} catch (e) {
  try { console.warn("magic_card_utils library provider failed", e); } catch (e2) { /* ignore */ }
}
