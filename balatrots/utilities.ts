import { Mod, loadModFromClass } from "./mod";

export const FunctionsMap = {
    "level_up_hand": {
        "file_name": "functions/common_events.lua",
        fun_name: "level_up_hand",
    }
}


export function injectFunction(this: void,name: keyof typeof FunctionsMap, toReplace: string, replacement: string) {
    const { file_name, fun_name } = FunctionsMap[name];
    inject(file_name, fun_name, toReplace, replacement);    
}

export function loadMods(this: void,modsToLoad: (ModDefinition | Mod)[]) {
    for (const mod of modsToLoad) {
        if (mod instanceof Mod) {
            loadMod(loadModFromClass(mod));
        } else {
            loadMod(mod);
        }
    }
}

export function loadMod(this: void, mod: ModDefinition | Mod) {
    if (mod instanceof Mod) {
        mod = loadModFromClass(mod);
    }
    table.insert(mods, mod);
}


export function addEvent(this: void, opt: EventProperties) {
    G.E_MANAGER.addEvent(Event(opt));
}