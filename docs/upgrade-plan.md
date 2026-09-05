# Docusaurus Upgrade Plan

This project is currently built with an old Docusaurus alpha stack and a GitHub Actions workflow pinned to Node 12. That combination is the reason the site fails under newer local Node versions.

## Why this needs upgrading

- `package.json` uses `@docusaurus/core` and `@docusaurus/preset-classic` at `^2.0.0-alpha.58`
- GitHub Actions is pinned to `node-version: '12.x'`
- local builds on modern Node (for example Node 23) fail with runtime incompatibilities such as:
  - `TypeError: utils_1.parseMarkdownFile is not a function`

This is not a QR-code page bug; it is a framework/runtime compatibility issue.

## Recommended upgrade path

### 1. Standardize on a supported LTS runtime

Target Node 20 LTS first. It is a safe stepping stone for modern Docusaurus releases and is much more stable than Node 22/23 for this older codebase.

Recommended CI setup:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'yarn' # or 'pnpm' if the repo is migrated
```

### 2. Upgrade Docusaurus in stages

Do not jump directly from `alpha.58` to the newest Docusaurus release in one step.

Preferred order:

1. Upgrade from the old alpha release to the latest stable 2.x release
2. Resolve Docusaurus config/plugin compatibility issues
3. Upgrade from 2.x to the latest 3.x stable release
4. Validate builds, theme behavior, deployment flow, and static site generation

This reduces the risk of configuration breakage and plugin incompatibility.

### 3. Choose the package manager intentionally

Decision point:

- Keep Yarn for the lowest-risk path
- Switch to pnpm as a second, deliberate modernization step

Recommended strategy:

- First get the site to build successfully on Node 20 + modern Docusaurus using Yarn
- Then, if desired, migrate to pnpm in a separate PR/branch after the app is stable

This keeps the upgrade deterministic and easier to debug.

## Suggested implementation order

1. Update local runtime to Node 20 LTS
2. Update GitHub Actions to `actions/setup-node@v4` and Node 20
3. Upgrade Docusaurus from `alpha.58` to the latest supported 2.x stable version
4. Validate `yarn build`
5. Resolve any Docusaurus config/theme/plugin issues
6. Move to Docusaurus 3.x
7. Re-run the build and deployment checks
8. If desired, migrate from Yarn to pnpm

## Example commands

### If staying on Yarn

```bash
corepack enable
node -v
yarn install
yarn build
```

### If moving to pnpm later

```bash
corepack enable
corepack prepare pnpm@latest --activate
pnpm install
pnpm build
```

## Important notes

- The project should be treated as a legacy Docusaurus site that needs a compatibility upgrade, not as a modern app that can be upgraded in-place without planning.
- The QR-code page is already fixed separately in the `feature/qrcode` branch; the runtime upgrade work belongs in this `upgrade-libs` branch.
- Keep the Node/Docusaurus upgrade separate from feature work so that debugging remains straightforward.

## Summary

The safest path is:

- Node 20 LTS
- modern Docusaurus 2.x first
- then Docusaurus 3.x
- optional pnpm migration after the build is stable

This plan minimizes churn and makes the upgrade tractable.
