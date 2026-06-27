import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/index.ts",
  // Dual CJS + ESM output. With `fixedExtension: false` (and no
  // `"type": "module"` in package.json) the emitted files match the names
  // the `exports` map and `main`/`types` fields point at: CJS -> index.js /
  // index.d.ts, ESM -> index.mjs / index.d.mts.
  format: ["cjs", "esm"],
  fixedExtension: false,
  dts: { sourcemap: false },
  // Match the previous tsup output: ship only the declaration + JS files,
  // no source/declaration maps (the maps would reference `src/`, which is
  // not part of the published package).
  sourcemap: false,
});
