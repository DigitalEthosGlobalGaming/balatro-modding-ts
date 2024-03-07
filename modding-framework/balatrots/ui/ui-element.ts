import { getUniqueId } from "@balatrots/utilities";

export type ConfigurationProperties = {
    align?: any;
    padding?: any;
    colour?: any;
    r?: any;
    emboss?: any;
    minh?: any;
    minw?: any;
    offset?: any;
    parent?: any;
    id?: any;
    object?: any;
    oid?: any;
    old_chosen?: any;
    chosen?: any;
    hover?: any;
    button?: any;
    shadow?: any;
}

export class UIElement {
    children: UIElement[] = [];
    parent: UIElement | null = null;
    nodeType: any;
    events: any = {};
    id?: string;
    canHaveChildren: boolean = true;
    constructor(nodeType: any, id: string = "") {
        this.nodeType = nodeType;   
        if (id == undefined || id == null) {
            id = "";
        }

        if (id == "") {
            this.id = "ui_" + getUniqueId();
        }
    }

    protected createEvent(callback: any) {
        const eventId = this.id + "_" + getUniqueId();
        G.FUNCS[eventId] = (e: any) => {
            callback(e);
        }
    }

    addChild(node: UIElement) {
        if (!this.canHaveChildren) {
            return;
        }
        if (node.parent != null) {
            node.parent.removeChild(node);
        }
        node.parent = this;
        this.children.push(node);
        this.render();
    }
    removeChild(node: UIElement | string) {
        if (!this.canHaveChildren) {
            return;
        }
        const before = this.children.length;
        this.children = this.children.filter((child: any) => {
            return child.id != node || child == node;
        });
        const after = this.children.length;
        if (after != before) {
            this.render();
        }
    }

    onDestroy() {

    }

    destroy() {
        this.onDestroy();
        for(const event in this.events) {
            G.FUNCS[event] = undefined;
        }
        for(const child of this.children) {
            child.destroy();
        }
    }

    getConfiguration(): ConfigurationProperties {
        return {};
    }

    renderChildren() {
        return this.children.map((child) => {
            return child.render();
        });
    }
    render(): any {        
        const results: any = {};
        results.n = this.nodeType;
        const children  = this.renderChildren() ?? [];
        results.config = this.getConfiguration();
        if (children?.length > 0) {
            results.nodes = children;
        }
        return null;
    }

}