# CommDesk Tauri Auto-Update (Production Guide)

This guide documents a production-ready updater setup for CommDesk using:

- Tauri v2 updater plugin
- Signed update artifacts
- GitHub Releases as update hosting
- GitHub Actions for automated cross-platform builds and publishing

---

## 1) Implemented project structure

```text
CommDesk/
├── .github/
│   └── workflows/
│       └── tauri-all-platforms.yml
├── docs/
│   ├── Tauri_Auto_Update_Production_Guide.md
│   └── latest.json.example
├── src/
│   ├── App.tsx
│   └── system/
│       └── updater/
│           └── autoUpdater.ts
└── src-tauri/
    ├── Cargo.toml
    ├── tauri.conf.json
    ├── src/
    │   └── lib.rs
    └── capabilities/
        └── default.json
```

---

## 2) Updater plugin installation and configuration

### JavaScript dependencies

```bash
pnpm add @tauri-apps/plugin-updater @tauri-apps/plugin-process
```

### Rust dependencies (`src-tauri/Cargo.toml`)

```toml
[dependencies]
tauri = { version = "2", features = [] }
tauri-plugin-opener = "2"
tauri-plugin-process = "2"
tauri-plugin-updater = "2"
```

### Rust plugin registration (`src-tauri/src/lib.rs`)

```rust
tauri::Builder::default()
  .plugin(tauri_plugin_opener::init())
  .plugin(tauri_plugin_process::init())
  .plugin(tauri_plugin_updater::init())
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
```

### Tauri config (`src-tauri/tauri.conf.json`)

```json
{
  "bundle": {
    "active": true,
    "targets": "all",
    "createUpdaterArtifacts": true
  },
  "plugins": {
    "updater": {
      "pubkey": "REPLACE_WITH_TAURI_UPDATER_PUBLIC_KEY",
      "endpoints": [
        "https://github.com/NexGenStudioDev/CommDesk/releases/latest/download/latest.json"
      ],
      "windows": {
        "installMode": "passive"
      }
    }
  }
}
```

### Tauri capability permissions (`src-tauri/capabilities/default.json`)

```json
{
  "permissions": ["core:default", "opener:default", "updater:default", "process:default"]
}
```

---

## 3) Frontend auto-update implementation

`src/system/updater/autoUpdater.ts` runs startup checks, downloads/install updates, and relaunches.

`src/App.tsx` starts updater once with `useEffect()`.

Key behavior:

- Runs only in Tauri runtime (not plain browser)
- Skips update checks in dev mode
- Performs background checks every 6 hours
- Automatically installs found updates
- Relaunches app after install

---

## 4) Generate signing keys securely

Run once on a secure machine:

```bash
pnpm tauri signer generate -w ~/.tauri/commdesk.key
```

This outputs:

- Private key file: `~/.tauri/commdesk.key` (secret, never commit)
- Public key text: put this into `tauri.conf.json` `plugins.updater.pubkey`

### GitHub repository secrets

Set these in **Settings → Secrets and variables → Actions**:

- `TAURI_SIGNING_PRIVATE_KEY` → full private key content (or key path content)
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` → password if key is encrypted (can be empty)

---

## 5) `latest.json` update manifest

For GitHub Releases, `tauri-action` generates and uploads `latest.json` automatically when `uploadUpdaterJson: true` is set.

Reference format is in `docs/latest.json.example`.

Required fields are:

- `version`
- `platforms.<os>-<arch>.url`
- `platforms.<os>-<arch>.signature`

Platform keys usually include:

- `linux-x86_64` (AppImage)
- `windows-x86_64` (MSI/EXE)
- `darwin-x86_64` or `darwin-aarch64` (macOS)

---

## 6) Hosting updates on GitHub Releases

Updater endpoint is configured as:

```text
https://github.com/NexGenStudioDev/CommDesk/releases/latest/download/latest.json
```

Flow at runtime:

1. App downloads `latest.json`
2. Tauri selects matching platform entry
3. App downloads bundle from release asset URL
4. Signature verified against configured public key
5. Install proceeds only if signature is valid

---

## 7) GitHub Actions auto build + publish

Workflow: `.github/workflows/tauri-all-platforms.yml`

Capabilities:

- Matrix build on Linux, Windows, macOS
- Creates/updates release for tag
- Uploads bundles and signatures
- Uploads `latest.json` for updater

### Release command flow

```bash
# 1) bump versions in package.json and src-tauri/tauri.conf.json
git add .
git commit -m "release: v0.1.1"

# 2) tag + push
git tag v0.1.1
git push origin master --tags
```

Workflow can also run manually via `workflow_dispatch` with `tag_name`.

---

## 8) Security best practices (production)

1. Never commit private signing keys.
2. Rotate keys only with a planned migration path (old clients trust old pubkey).
3. Keep updater endpoint HTTPS-only.
4. Keep `dangerousInsecureTransportProtocol` disabled.
5. Restrict GitHub Actions permissions and protect release tags.
6. Enable branch protection + required reviews for release branches.
7. Verify release artifacts and signatures before publishing to users.
8. Log updater failures (without leaking secrets) for diagnostics.

---

## 9) Cross-platform update behavior

- **Linux**: AppImage updater artifacts (`.AppImage` + `.sig`)
- **Windows**: MSI/EXE artifacts with configurable install mode
  - `passive` = progress UI, minimal interaction
  - `quiet` = silent mode (works for non-admin/user-level installs)
- **macOS**: updater package and signature per architecture

For broad macOS coverage, publish both Intel and Apple Silicon builds.

---

## 10) Optional improvements

### Background checks

Already enabled in `autoUpdater.ts` with interval checks. Adjust interval per your policy.

### Silent updates

- Set `silent: true` in updater startup logic (download + install without auto relaunch)
- On Windows, set updater `installMode` to `quiet` for less UI (only where appropriate)

### Delta updates

Tauri updater is signature-first and bundle-based by default. Binary delta patching is not enabled out-of-the-box in this setup.
If you need delta delivery, add a dedicated update backend/CDN strategy and keep signature validation unchanged.

---

## 11) Open-source project best practices

- Document release steps in CONTRIBUTING/README.
- Publish checksums/signatures in release notes.
- Keep reproducible builds (`pnpm-lock.yaml`, pinned toolchain versions).
- Validate auto-update flow in CI on every tagged release.
- Keep release notes clear about breaking changes and rollback plans.

---

## 12) Verification checklist

1. `pnpm tauri build` succeeds locally with signing env variables.
2. Release workflow publishes bundles + `.sig` + `latest.json`.
3. Installed older app detects update and downloads it.
4. Signature verification passes.
5. App restarts into new version.
