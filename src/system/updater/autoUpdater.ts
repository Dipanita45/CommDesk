import type { DownloadEvent } from "@tauri-apps/plugin-updater";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

const DEFAULT_CHECK_INTERVAL_MS = 6 * 60 * 60 * 1000;
const DEFAULT_TIMEOUT_MS = 30_000;

let isUpdaterStarted = false;

type AutoUpdaterOptions = {
  checkIntervalMs?: number;
  silent?: boolean;
};

function isTauriRuntime(): boolean {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

function onDownloadEvent(event: DownloadEvent): void {
  switch (event.event) {
    case "Started":
      console.info(`[updater] started downloading ${event.data.contentLength} bytes`);
      break;
    case "Progress":
      console.info(`[updater] downloaded chunk ${event.data.chunkLength} bytes`);
      break;
    case "Finished":
      console.info("[updater] download finished");
      break;
  }
}

async function checkAndInstallUpdate(silent: boolean): Promise<void> {
  try {
    const update = await check({ timeout: DEFAULT_TIMEOUT_MS });
    if (!update) {
      console.info("[updater] no update available");
      return;
    }

    console.info(`[updater] update found: ${update.version}`);
    await update.downloadAndInstall(onDownloadEvent, {
      timeout: DEFAULT_TIMEOUT_MS,
    });
    console.info("[updater] update installed");

    if (!silent) {
      await relaunch();
    }
  } catch (error) {
    console.error("[updater] update check/install failed", error);
  }
}

export async function startAutoUpdater(options: AutoUpdaterOptions = {}): Promise<void> {
  if (isUpdaterStarted || import.meta.env.DEV || !isTauriRuntime()) {
    return;
  }

  isUpdaterStarted = true;

  const silent = options.silent ?? false;
  const checkIntervalMs =
    options.checkIntervalMs === undefined ? DEFAULT_CHECK_INTERVAL_MS : options.checkIntervalMs;

  await checkAndInstallUpdate(silent);

  if (checkIntervalMs > 0) {
    window.setInterval(() => {
      void checkAndInstallUpdate(silent);
    }, checkIntervalMs);
  }
}
