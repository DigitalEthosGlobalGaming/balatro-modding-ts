export const FunctionsMap = {
  level_up_hand: {
    file_name: "functions/common_events.lua",
    fun_name: "level_up_hand",
  },
};

export function injectFunction(
  name: keyof typeof FunctionsMap,
  toReplace: string,
  replacement: string
) {
  const { file_name, fun_name } = FunctionsMap[name];
  inject(file_name, fun_name, toReplace, replacement);
}

export function loadMods(this: void, modsToLoad: ModDefinition[]) {
  for (const mod of modsToLoad) {
    loadMod(mod);
  }
}

export function loadMod(this: void, mod: ModDefinition) {
  table.insert(mods, mod);
}

export function addEvent(opt: EventProperties) {
  G.E_MANAGER.addEvent(Event(opt));
}