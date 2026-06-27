# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- Migrated the build from [tsup](https://github.com/egoist/tsup) (no longer
  maintained) to [tsdown](https://tsdown.dev/) (Rolldown + oxc). The build
  still emits the same dual CJS/ESM output (`dist/index.js`, `dist/index.mjs`)
  with separate type declarations (`dist/index.d.ts`, `dist/index.d.mts`), and
  `are-the-types-wrong` stays green across node10/node16/bundler. tsup
  hardcoded a deprecated `baseUrl` in its `.d.ts` build, which forced the
  `ignoreDeprecations: "6.0"` workaround in `tsconfig.build.json` and would
  stop working under TypeScript 7.0; tsdown does not, so both the workaround
  and `tsconfig.build.json` have been removed. No change to the published API
  or the `>=5.0.0` TypeScript peer range (#32).

### Security

- Removed the temporary `overrides.esbuild` entry that forced the transitive
  `esbuild` to `^0.28.1`. It existed only to lift the stale `esbuild: ^0.27.0`
  range pinned by the now-removed, unmaintained `tsup` past two high-severity
  advisories
  ([GHSA-gv7w-rqvm-qjhr](https://github.com/advisories/GHSA-gv7w-rqvm-qjhr),
  [GHSA-g7r4-m6w7-qqqr](https://github.com/advisories/GHSA-g7r4-m6w7-qqqr))
  affecting esbuild `<= 0.28.0`. tsdown builds on Rolldown/oxc rather than
  esbuild, and the remaining transitive esbuild (via `tsx`/`vite`) already
  resolves to the patched `0.28.1`, so the override is no longer needed.
  Dev-dependency only; no change to the published package (#32).

## [1.1.0] - 2026-06-12

### Added

- Continuous TypeScript compatibility checks for consumers. The published
  type declarations are validated for correct ESM/CJS resolution, and the
  example suite is compiled against both the lowest published release in
  the supported `typescript` peer range (`5.0.2`) and the latest release in
  CI — guarding the compatibility advertised to consumers rather than only
  the pinned build-time version.

### Changed

- Upgraded build toolchain to TypeScript 6.x. Switched `moduleResolution`
  to `bundler` and set `ignoreDeprecations: "6.0"` to satisfy TypeScript
  6.0 promoting deprecated-option warnings to hard errors. No change to
  the published API or the `>=5.0.0` TypeScript peer range.

### Fixed

- Corrected the `exports` map so ESM consumers resolve ESM type
  declarations (`index.d.mts`) instead of the CommonJS `index.d.ts`.
  Previously the types masqueraded as CommonJS under `import`, which
  could surface spurious type errors in ESM/`node16`/`nodenext`
  projects.
- `fake<T>()` now type-checks function-valued members. The `DeepPartial`
  function guard matched typed-parameter functions against
  `(...args: unknown[]) => unknown`, which fails under `strictFunctionTypes`,
  so such members collapsed to `{}` and accepted any value. They are now
  preserved and checked against their declared signature.

## [1.0.0] - 2026-03-28

### Changed

- Lowered minimum Node.js version from 22 to 20 for broader compatibility
- Updated author metadata

### Added

- Automated release workflow via GitHub Actions with npm provenance
- `CHANGELOG.md` now included in published npm package
- `prerelease` script for local validation before publishing
- CI testing on Node.js 20, 22, and 24

## [0.1.0] - 2025-06-29

### Added

- Type-safe `fake<T>()` function for creating partial test objects
- `DeepPartial<T>` type for deep partial support on nested objects
- Dual CJS/ESM package distribution with TypeScript declarations

[Unreleased]: https://github.com/laazyj/ts-fake/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/laazyj/ts-fake/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/laazyj/ts-fake/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/laazyj/ts-fake/releases/tag/v0.1.0
