// Runtime consumer fixture: the executable sibling of consumer.mts and
// consumer.cts, which cover the `types` conditions of the `exports` map.
// This one covers the `default` conditions — it is run, not compiled.
//
// It must execute from a directory where the packed tarball is installed, so
// that `ts-fake` resolves through the published `exports` map exactly as it
// would for a consumer. `smoke-harness.mjs` sets that up.
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// Both conditions are checked in one process so that a condition collapsing
// onto the other build is caught: Node loads the CJS bundle through `import`
// without complaint, via named-export detection, so a broken `exports` map
// fails silently unless the resolved path is asserted.
const conditions = [
  {
    label: "require",
    expected: "dist/index.js",
    resolved: require.resolve("ts-fake"),
    fake: require("ts-fake").fake,
  },
  {
    label: "import",
    expected: "dist/index.mjs",
    resolved: import.meta.resolve("ts-fake"),
    fake: (await import("ts-fake")).fake,
  },
];

for (const { label, expected, resolved, fake } of conditions) {
  if (!resolved.endsWith(expected)) {
    throw new Error(`${label} condition resolved to ${resolved}, expected ${expected}`);
  }
  if (typeof fake !== "function") {
    throw new Error(`${label} condition did not export fake()`);
  }
  if (fake({ id: 7 }).id !== 7) {
    throw new Error(`${label} condition: fake() did not preserve its input`);
  }
  console.log(`${label} -> ${expected} ok on ${process.version}`);
}
