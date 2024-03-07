import { Mod } from "./mod";

if (G.BALATROTS == undefined) {
  G.BALATROTS = {};
}

if (G.BALATROTS?.mods == undefined) {
  if (G.BALATROTS != undefined) {
    G.BALATROTS.mods = {};
  }
}

export const FunctionsMap = {
  level_up_hand: {
    file_name: "functions/common_events.lua",
    fun_name: "level_up_hand",
  },
};

export function injectFunction(
  this: void,
  name: keyof typeof FunctionsMap,
  toReplace: string,
  replacement: string
) {
  const { file_name, fun_name } = FunctionsMap[name];
  inject(file_name, fun_name, toReplace, replacement);
}

export function unloadMods() {
  if (G.BALATROTS?.mods != undefined) {
    for (const modId in G.BALATROTS.mods) {
      const mod = G.BALATROTS.mods[modId];
      unloadMod(mod);
    }
  }
}
export function loadMods(this: void, modsToLoad: Mod[]) {
  const modsList: Mod[] = [];
  for (const mod of modsToLoad) {
    const modInstance = loadMod(mod);
    if (modInstance != null) {
      modsList.push(modInstance);
    }
  }

  return modsList;
}

function getModById(id: string) {
  return G.BALATROTS?.mods?.[id] ?? undefined;
}

function unloadMod(mod: Mod) {
  mod.unload();
}

export function loadMod(this: void, mod: Mod) {
  if (G.BALATROTS?.mods == undefined) {
    return null;
  }
  const existingMod = getModById(mod.getId());
  if (existingMod != undefined) {
    unloadMod(existingMod);
  }

  G.BALATROTS.mods[mod.getId()] = mod;
  mod.load();
  return mod;
}


export function getUniqueId(): string {
  if (G.BALATROTS == undefined) {
    throw "BALATROTS is not initialised";
  }
  
  G.BALATROTS.uniqueId = (G.BALATROTS?.uniqueId ?? 0) + 0.0001;
  const uniqueId = G.BALATROTS.uniqueId;
  return uniqueId.toString();
}