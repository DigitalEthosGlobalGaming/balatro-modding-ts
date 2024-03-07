import { Mod } from "@balatrots/mod";
import { ButtonEvent, UIButton } from "@balatrots/ui/ui-button";
import { UICard } from "@balatrots/ui/ui-card";
import { UIText } from "@balatrots/ui/ui-text";

export class UIExampleMod extends Mod {
  constructor() {
    super({
      mod_id: "ui-example-mod-0001",
      name: "UI Example Mod",
      version: "0.0.1",
      url: "https://github.com/DigitalEthosGlobalGaming/balatro-modding-ts",
      author: "stinkfire",
      description: [],
      enabled: true,
    });
  }

  handleButtonClick(e: ButtonEvent) {
    debugMessage("Handling button click");
  }

  onLoad() {
    const label = new UIText();
    label.text = "Hello world!";

    const button = new UIButton(undefined, (e: ButtonEvent) => {
      debugMessage("Button clicked!");
      this.handleButtonClick(e);
    });

    button.text = "Hello world!";

    const panel = new UICard();
    panel.addChild(label);
    panel.addChild(button);

    this.addUIElement(panel);
  }
}
