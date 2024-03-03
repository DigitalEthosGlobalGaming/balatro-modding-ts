
export const FunctionsMap = {
    "level_up_hand": {
        "file_name": "functions/common_events.lua",
        fun_name: "level_up_hand",
    }
}


export function injectFunction(name: keyof typeof FunctionsMap, toReplace: string, replacement: string) {
    const { file_name, fun_name } = FunctionsMap[name];
    inject(file_name, fun_name, toReplace, replacement);    
}

export function loadMods(modsToLoad: ModDefinition[]) {
    for (const mod of modsToLoad) {
        loadMod(mod);
    }
}

export function loadMod(mod: ModDefinition) {
    table.insert(mods, mod);
}