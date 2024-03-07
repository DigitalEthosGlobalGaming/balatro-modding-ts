import { UIElement } from "./ui-element";



export class UIText extends UIElement {
    public text: string = "";
    public scale: number = 1;
    public colour: any = G.C.UI.TEXT_LIGHT;
    constructor(id?: string) {
        super(G.UIT.T, id);
        this.canHaveChildren = false;
    }

  getConfiguration() {
      return {
        text: this.text,
        scale: this.scale,
        colour: this.colour
      }
  }
}