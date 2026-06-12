# Releasing ts-fake

This project uses git tags to trigger automated releases via GitHub Actions. When a tag matching `v*` is pushed, the [release workflow](.github/workflows/release.yml) runs all checks, publishes to npm (with provenance), and creates a GitHub Release.

## Prerequisites

- Permission to open and merge pull requests on `main`. Direct pushes to `main` are rejected by branch protection — CI and CodeQL must pass via a PR, so the release commit lands through a pull request.
- Trusted Publishing configured on npmjs.com for the `ts-fake` package (linked to the `release.yml` workflow in the `laazyj/ts-fake` repo)

## Release Steps

1. **Decide the new version** using [Semantic Versioning](https://semver.org/):
   patch (bug fix), minor (new feature), or major (breaking change).
2. **Run the prerelease check**: `npm run prerelease` (runs lint, format, build, tests, type-check).
3. **Update [`CHANGELOG.md`](CHANGELOG.md)**: move `[Unreleased]` items into a new version section with the release date, and update the comparison links at the bottom.
4. **Bump the version on a release branch**:
   ```bash
   git checkout -b release/v<version>
   npm version <major|minor|patch> --no-git-tag-version
   git add package.json package-lock.json CHANGELOG.md
   git commit -m "chore(release): v<version>"
   git push -u origin release/v<version>
   ```
5. **Open a PR and merge it into `main`.** Wait for CI and CodeQL to pass, then merge. **Do not tag yet** — the release commit must be on `main` first (the tag is what publishes, so it has to point at a commit that is actually on `main`).
6. **Tag the merged commit and push the tag.** This — and only this — triggers the [release workflow](.github/workflows/release.yml) (npm publish + GitHub Release):
   ```bash
   git checkout main && git pull
   git tag v<version>
   git push origin v<version>
   ```
7. **Verify** the workflow completes on the [Actions tab](https://github.com/laazyj/ts-fake/actions).

## Troubleshooting

- **Publish fails**: check that Trusted Publishing is configured on npmjs.com for the `release.yml` workflow.
- **Tag already exists**: delete it locally and remotely (`git tag -d v<version> && git push origin :refs/tags/v<version>`), fix the issue, then re-tag and push.
- **Tagged before the release commit reached `main`**: the workflow still publishes from the tag, but `main` won't reflect the release. The published tag already points at the correct tree, so do **not** re-publish — just land the release commit on `main` via its PR (merge, don't squash, so the tagged commit stays on `main`).
