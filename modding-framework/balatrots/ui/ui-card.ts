import { ConfigurationProperties, UIElement } from "./ui-element";



export class UICard extends UIElement {
    public text: string = "";
    public scale: number = 1;    

    public align: UIAlignments = "cm";
    public padding: number = 0;
    public minHeight: number = 1;
    public radius: number = 0.1;
    public hover: boolean = true;
    public colour: any = G.C.WHITE;
    public shadow: boolean = true;
    public id: string = "";
    constructor(id?: string) {
        super(G.UIT.C, id);
    }

  getConfiguration() {
    const configuration: ConfigurationProperties = {};
    if (this.align != undefined) {
      configuration.align = this.align;
    }
    if (this.padding != undefined) {
      configuration.padding = this.padding;
    }
    if (this.minHeight != undefined) {
      configuration.minh = this.minHeight;
    }
    if (this.radius != undefined) {
      configuration.r = this.radius;
    }
    if (this.hover != undefined) {
      configuration.hover = this.hover;
    }
    if (this.colour != undefined) {
      configuration.colour = this.colour;
    }
    if (this.shadow != undefined) {
      configuration.shadow = this.shadow;
    }
    if (this.id != undefined) {
      configuration.id = this.id;
    }

    return configuration;
  }
}