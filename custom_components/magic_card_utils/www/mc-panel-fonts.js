// The two faces the panel draws its text in. Both load from www/fonts through the FontFace API, once per page.
export const FONT_FACES = [
  { family: "MCU Space Grotesk", file: "./fonts/space-grotesk-latin-wght-normal.woff2" },
  { family: "MCU JetBrains Mono", file: "./fonts/jetbrains-mono-latin-wght-normal.woff2" },
];

let loading = null;

async function loadFaces() {
  try {
    if (typeof FontFace !== "function" || !document.fonts) return false;
    const faces = FONT_FACES.map((f) => {
      const url = new URL(f.file, import.meta.url).href;
      return new FontFace(f.family, `url("${url}") format("woff2")`, { weight: "300 700", display: "swap" });
    });
    await Promise.all(faces.map((face) => face.load()));
    faces.forEach((face) => document.fonts.add(face));
    return true;
  } catch (_err) {
    return false;
  }
}

/** Adds both faces to the document once. Resolves false when a face or the API is missing (a later call tries again); the system fonts then stay. */
export function loadPanelFonts() {
  if (!loading) {
    loading = loadFaces().then((ok) => {
      if (!ok) loading = null;
      return ok;
    });
  }
  return loading;
}
