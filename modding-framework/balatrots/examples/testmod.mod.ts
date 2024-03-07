import { Mod } from "@balatrots/mod";

// function createMainMenuButton() {
//     const exit_button = UIBox_button({
// 		minw = 5,
// 		button = "reload_mods",
// 		label = {
// 			"Reload Mods"
// 		}
// 	})
// 	table.insert(contents.nodes[1].nodes[1].nodes[1].nodes, #contents.nodes[1].nodes[1].nodes[1].nodes + 1, exit_button)
// }

export class TestMod extends Mod {
  constructor() {
    super({
      mod_id: "test-mod-0001",
      name: "TestMod",
      version: "0.0.3",
      url: "https://github.com/DigitalEthosGlobalGaming/balatro-modding-ts",
      author: "stinkfire",
      description: [],
      enabled: false,
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
    debugMessage(message);
  }
}
