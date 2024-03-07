import { UICard } from "./ui-card";

export type ButtonEvent = {

}

type ButtonOnClick = (e: ButtonEvent) => void;
export class UIButton extends UICard {
  onClickCallback: ButtonOnClick | undefined;
  constructor(id?: string, onClick?: ButtonOnClick) {
    super(id);
    this.onClickCallback = onClick
  }

  onClick(e: ButtonEvent) {

  }

  click(e: ButtonEvent) {
    this.onClick(e);
    if (this.onClickCallback != undefined) {
      this.onClickCallback(e);
    }
  }

  getConfiguration() {
    const configuration = super.getConfiguration();
    configuration.button = this.createEvent(this.click.bind(this));
    return configuration;
  }
}
