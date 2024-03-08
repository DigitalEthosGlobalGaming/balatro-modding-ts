import { config } from "dotenv";
import { join } from "path";
import { watch } from "chokidar";
import { copyFile } from "fs";

const envConfig = config();

const pathToWatch = join(
  __dirname,
  "../",
  "modding-framework/dist/bundle.mod.lua"
);
// Initialize watcher.
const watcher = watch(pathToWatch, { persistent: true });
const debug: any = false;

function moveFile(from: string, to: string) {
  if (debug as any) {
    console.table({ time: Date.now(), from, to });
    return;
  }
  copyFile(from, to, () => {
    console.table({ time: Date.now(), from, to });
  });
}

const modDirectory = envConfig.parsed?.MOD_DIRECTORY ?? "";
const modName = envConfig.parsed?.MOD_NAME ?? "";

function deployFile(pathDir: string) {
  try {
    const toPath = join(modDirectory, modName + ".mod.lua");
    moveFile(pathDir, toPath);
  } catch (e) {
    console.error("Error deploying file", e);
  }
}

const delployModLoaderExtensionPath = join(
  __dirname,
  "../",
  "mod-loader-extension/mod-loader-extention.lua"
);
const watchModLoaderExtension = watch(delployModLoaderExtensionPath, {
  persistent: true,
});
function delployModLoaderExtension(pathDir: string) {
  pathDir = pathDir.replaceAll("\\", "/");
  try {
    const toPath = join(modDirectory, pathDir.split("/").pop());
    moveFile(pathDir, toPath);
  } catch (e) {
    console.error("Error deploying file", e);
  }
}

// Add event listeners.
watcher.on("add", deployFile).on("change", deployFile).on("unlink", deployFile);
watchModLoaderExtension
  .on("add", delployModLoaderExtension)
  .on("change", delployModLoaderExtension)
  .on("unlink", delployModLoaderExtension);
