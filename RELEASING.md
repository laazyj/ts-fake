# Releasing ts-fake

This project uses git tags to trigger automated releases via GitHub Actions. When a tag matching `v*` is pushed, the [release workflow](.github/workflows/release.yml) runs all checks, publishes to npm (with provenance), and creates a GitHub Release.

## Prerequisites

- Push access to the `main` branch
- `NPM_TOKEN` secret configured in GitHub repo settings (Settings > Secrets and variables > Actions)

## Release Steps

1. **Decide the new version** using [Semantic Versioning](https://semver.org/):
   patch (bug fix), minor (new feature), or major (breaking change).
2. **Run the prerelease check**: `npm run prerelease` (runs lint, format, build, tests, type-check).
3. **Update [`CHANGELOG.md`](CHANGELOG.md)**: move `[Unreleased]` items into a new version section with the release date, and update the comparison links at the bottom.
4. **Bump version and commit**:
   ```bash
   npm version <major|minor|patch> --no-git-tag-version
   git add package.json CHANGELOG.md
   git commit -m "chore(release): v<version>"
   ```
5. **Tag and push**:
   ```bash
   git tag v<version>
   git push && git push --tags
   ```
6. **Verify** the workflow completes on the [Actions tab](https://github.com/laazyj/ts-fake/actions).

## Troubleshooting

- **Publish fails**: check that `NPM_TOKEN` is valid and has publish permissions.
- **Tag already exists**: delete it locally and remotely (`git tag -d v<version> && git push origin :refs/tags/v<version>`), fix the issue, then re-tag and push.
