// Installs the packed tarball into a throwaway fixture and runs smoke.mjs
// inside it, so `ts-fake` resolves through the published `exports` map the
// way a consumer's would.
//
// Takes a prebuilt tarball as its first argument — CI passes the one the
// `build` job uploaded — and packs the working tree when given none.
//
// Uses only Node builtins and the npm CLI, so it runs without `npm ci`.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const fixture = mkdtempSync(join(tmpdir(), "ts-fake-smoke-"));

const run = (file, args, cwd) => execFileSync(file, args, { cwd, stdio: "inherit" });

let tarball = process.argv[2];
if (tarball) {
  tarball = resolve(tarball);
} else {
  const packed = execFileSync(npm, ["pack", "--pack-destination", fixture, "--json"], {
    cwd: resolve(here, ".."),
    encoding: "utf8",
  });
  tarball = join(fixture, JSON.parse(packed)[0].filename);
}

// `--omit=peer` keeps the `typescript` peer out: this checks runtime loading,
// and the compiler would otherwise dominate the install. `--ignore-scripts`
// keeps the package's own `prepare` hook from running in the fixture, where
// its dev tooling does not exist.
writeFileSync(
  join(fixture, "package.json"),
  `${JSON.stringify({ name: "ts-fake-smoke-fixture", private: true })}\n`
);
run(
  npm,
  ["install", "--no-audit", "--no-fund", "--omit=peer", "--ignore-scripts", tarball],
  fixture
);

copyFileSync(join(here, "smoke.mjs"), join(fixture, "smoke.mjs"));
run(process.execPath, ["smoke.mjs"], fixture);
