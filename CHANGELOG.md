# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed

- Upgraded build toolchain to TypeScript 6.x. Switched `moduleResolution`
  to `bundler` and set `ignoreDeprecations: "6.0"` to satisfy TypeScript
  6.0 promoting deprecated-option warnings to hard errors. No change to
  the published API or the `>=5.0.0` TypeScript peer range.

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

[Unreleased]: https://github.com/laazyj/ts-fake/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/laazyj/ts-fake/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/laazyj/ts-fake/releases/tag/v0.1.0
