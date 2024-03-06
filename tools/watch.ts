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

const modDirectory = envConfig.parsed?.MOD_DIRECTORY ?? "";
const modName = envConfig.parsed?.MOD_NAME ?? "";

function deployFile(pathDir: string) {
  try {
    const toPath = join(modDirectory, modName + ".mod.lua");

    console.log("Starting copy");
    copyFile(pathDir, toPath, () => {
      console.table({ time: Date.now(), from: pathDir, to: toPath });
    });
  } catch (e) {
    console.error("Error deploying file", e);
  }
}

// Add event listeners.
watcher.on("add", deployFile).on("change", deployFile).on("unlink", deployFile);
