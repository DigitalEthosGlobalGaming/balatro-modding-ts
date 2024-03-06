
import { getData } from "./data";
import { Subscription } from "./events";

export class Mod {
    subscriptions: Subscription[] = [];
    definition: ModDefinitionMetadata;
    constructor(definition: ModDefinitionMetadata) {
        this.definition = definition;
    }    
    isEnabled() {
        return this.definition.enabled;
    }
    getId() {
        return this.definition.mod_id;
    }
    getName() {
        return this.definition.name;
    }
    getVersion() {
        return this.definition.version;
    }
    setData(key: string, defaultValue: any) {
        if (key == undefined) {
            return defaultValue;
        }
        key = this.getId() + "_" + key;
        this.setData(key, defaultValue);
    }

    getData(key: string, defaultValue: any) {
        if (key == undefined) {
            return defaultValue;
        }
        key = this.getId() + "_" + key;
        return getData(key, defaultValue);
    }
    
    unload() {
        this.onUnload();     
        const subscriptionManager = G.BALATROTS?.subscriptionManager;
        if (subscriptionManager != undefined) {
            for (const subscription of this.subscriptions) {
                subscriptionManager.unsubscribe(subscription);
            }
        }   
    }

    onUnload() {

    }

    load() {
        this.onPreLoad();
        const me = this;
        const subscriptionManager = G.BALATROTS?.subscriptionManager;
        if (subscriptionManager != undefined) {
            const subscription = subscriptionManager.subscribe("KeyPressUpdate", (key: string, dt: any) => {
                me.onKeyPressed(key,dt);
            });
            this.subscriptions.push(subscription);
        }
        this.onLoad();
    }

    onLoad() {

    }

    onPreLoad() {

    }
    
    onEnable() {
        
    }
    onDisable() {

    }
    onPreUpdate() {

    }
    onPostUpdate() {

    }
    onPreRender() {

    }
    onPostRender() {

    }
    onKeyPressed(keyName: string | undefined, dt: any) {

    }
    onMousePressed(x: number, y: number, button: string | undefined, touches: number) {

    }

}
