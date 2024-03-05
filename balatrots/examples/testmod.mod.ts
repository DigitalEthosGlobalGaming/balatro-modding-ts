import { Mod } from "@balatrots/mod";

export class TestMod extends Mod {
    constructor() {
        super({
            mod_id: "test-mod-0001",
            name: "TestMod",
            version: "0.0.2",
            url: "https://github.com/DigitalEthosGlobalGaming/balatro-modding-ts",
            author: "stinkfire",
            description: [],
            enabled: false
        });
    }

    // The idea is that every time you press a key it should increase the count.
    // This is a way we can test setting data across reloads.
    onKeyPressed(keyName: string | undefined): void {
        this.setData("keyPressed", this.getData("keyPressed", 0) + 1);
        sendDebugMessage(this.getData("keyPressed", 0).toString());
    }
}