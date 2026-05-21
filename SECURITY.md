# Security Policy

`ts-fake` is a tiny, zero-dependency TypeScript test utility. The runtime code
does almost nothing — `fake<T>()` casts a partial object to `T` — so the library
has very little intrinsic attack surface. The realistic security concern is
**supply chain**: `ts-fake` is installed as a `devDependency` and runs on
developer machines and in CI, so a compromised release could execute in a lot of
build pipelines. We take reports about that seriously and want them routed
privately.

If you believe you've found a security issue, please report it through the
process below rather than opening a public issue.

## Reporting a vulnerability

Use GitHub's **Private Vulnerability Reporting** flow:

[**Report a vulnerability →**](https://github.com/laazyj/ts-fake/security/advisories/new)

(Or: navigate to the **Security** tab on the repository, then choose
_Report a vulnerability_.)

Helpful things to include:

- Affected version(s) of `ts-fake` (e.g. `ts-fake@1.0.0`).
- A minimal reproduction.
- Your assessment of impact and any known mitigations.

## Response expectations

This is a small, volunteer-maintained project, so timelines are best-effort
targets rather than guarantees:

- **Acknowledgement** within 3 working days.
- **Triage decision** (accept / decline / need more info) within 7 working days.
- **Fix or mitigation** targeted within 30 days for high-severity issues, 90 days
  for everything else. Where exploitation is active or trivial, we'll move
  faster and may issue an interim advisory.

## Supported versions

`ts-fake` follows Semantic Versioning. Security fixes are released against the
**latest published version**. There are no long-term support branches for older
majors — if a fix is needed, it ships in a new release and users should upgrade.

## Scope

### In scope

- The published `ts-fake` package on npm (latest release).
- The release pipeline under `.github/workflows/` — anything that produces or
  publishes an artifact, including the npm provenance / OIDC (`id-token`) trust
  configuration in `release.yml`. Issues that could allow an unauthorized or
  tampered package to be published are the highest-priority category for this
  project.
- Any behaviour that causes the package to execute unexpected code at install or
  import time. `ts-fake` ships no install scripts and no runtime side effects, so
  anything of this kind would be a defect.

### Out of scope

- **The intentional type escape hatch.** `fake<T>()` deliberately returns a
  partial object cast to `T` and performs no runtime validation. Using a fake in
  production code, or relying on it to enforce invariants at runtime, is a misuse
  of a test helper — not a vulnerability. Keep `ts-fake` in `devDependencies`.
- Vulnerabilities in upstream dependencies (for example the `devDependencies`
  used to build and test the project). Please report those upstream; Dependabot
  picks them up here automatically.
- Bugs or type-soundness gaps that don't have a security impact — for example a
  `DeepPartial<T>` edge case that type-checks something it shouldn't. These are
  valuable bug reports; please open a normal issue.
- The `examples/` and `tests/` contents. They are illustrative and are not a
  security boundary.
- Findings against forks or third-party copies of this code.
- Reports requiring physical access, social engineering, or compromise of
  maintainer or npm accounts.

## Coordinated disclosure

- Accepted reports are tracked as GitHub Security Advisories. A CVE will be
  requested via GHSA for any high-severity issue.
- We default to a **90-day embargo** from acknowledgement, shortened if a fix
  ships sooner or if the issue is being actively exploited.
- Reporters are credited in the advisory by name or handle, unless you ask us
  not to. Anonymous reports are welcome.

## Using ts-fake safely

A short checklist for downstream users:

- **Keep it a dev dependency.** Install with `npm install --save-dev ts-fake` so
  it never ships in your production runtime.
- **Verify package integrity.** `ts-fake` is published with npm provenance, so
  `npm audit signatures` validates that an installed copy was built and published
  from this repository's CI rather than tampered with.
- **Pin with a lockfile.** Committing `package-lock.json` (or your package
  manager's equivalent) and reviewing changelog entries before bumping keeps
  unexpected releases out of your pipeline.
- **Watch advisories.** Subscribe to this repository's security advisories on
  GitHub, or follow Dependabot alerts in your own repo.

Thanks for taking the time to report responsibly.
