import { addEvent } from "@balatrots/utilities";

export const quickRestartMod: ModDefinition = {
    mod_id: "prototyping-stuff-ts",
    name: "Quick Restart",
    version: "0.0.1",
    author: "stinkfire",
    description: [
        "Adds in a quick restart."
    ],
    enabled: true,
    on_key_pressed: (keyName: string) => {
        if (keyName == "f3") {
            
        }
    }
}