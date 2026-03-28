# ts-fake

## Project Overview

ts-fake is a TypeScript library that provides a type-safe `fake<T>()` utility for creating partial test objects. It is published to npm as `ts-fake`.

## Releases

See [RELEASING.md](RELEASING.md) for the full release process. Key points:

- This project uses Semantic Versioning
- Releases are triggered by pushing a git tag matching `v*`
- The release workflow (`.github/workflows/release.yml`) handles npm publishing and GitHub Release creation
- Always update `CHANGELOG.md` and bump `package.json` version before tagging

## Conventions

- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/) format: `<type>(<scope>): <description>`
- Changelog follows [Keep a Changelog](https://keepachangelog.com/) format
- Tests use Vitest and live in `tests/`
- Examples live in `examples/` and must compile (`npm run test:examples`)
