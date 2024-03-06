import { injectFunction } from "@balatrots/utilities";

const planet_multiplicator_strength = '998';
export const planetsMultiplicator: ModDefinition = {
    mod_id: "planets_multiplicator-ts",
    name: "Planets Multiplicator",
    version: "0.0.1",
    author: "stinkfire",
    description: [
        "Example plants multiplicator ts mod."
    ],
    enabled: true,
    on_enable: () => {
        const toReplace = 'amount = amount or 1'
        const replacement = 'amount = ' + planet_multiplicator_strength;
        injectFunction("level_up_hand", toReplace, replacement);
    },
    on_disable: () => {
        const replacement = 'amount = amount or 1';
        const toReplace = 'amount = ' + planet_multiplicator_strength;
        injectFunction("level_up_hand", toReplace, replacement);
    }
}