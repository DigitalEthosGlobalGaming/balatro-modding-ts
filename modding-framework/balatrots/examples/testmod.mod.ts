import { Mod } from "@balatrots/mod";

export class TestMod extends Mod {
  count: number = 0;
  constructor() {
    super({
      mod_id: "test-mod-0001",
      name: "TestMod",
      version: "0.0.4",
      url: "https://github.com/DigitalEthosGlobalGaming/balatro-modding-ts",
      author: "stinkfire",
      description: [],
      enabled: true,
    });
  }

  // The idea is that every time you press a key it should increase the count.
  // This is a way we can test setting data across reloads.
  onKeyPressed(keyName: string | undefined): void {
    this.setData("keyPressed", this.getData("keyPressed", 0) + 1);
    const message =
      "Key Pressed: " +
      keyName +
      " - total key presses: " +
      this.getData("keyPressed", 0).toString();
    this.count = this.count + 1;
  }
}
