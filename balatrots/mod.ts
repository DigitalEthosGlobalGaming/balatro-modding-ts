import { getData } from "./data";

export class Mod {
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
    onKeyPressed(keyName: string | undefined) {

    }
    onMousePressed(x: number, y: number, button: string | undefined, touches: number) {

    }

}

export function loadModFromClass(mod: Mod) {
    const definition: ModDefinition = mod.definition;
    definition.on_pre_load = () => {
        mod.onPreLoad();
    }
    definition.on_enable = () => {
        mod.onEnable();
    }
    definition.on_disable = () => {
        mod.onDisable();
    }
    definition.on_pre_update = () => {
        mod.onPreUpdate();
    }
    definition.on_post_update = () => {
        mod.onPostUpdate();
    }
    definition.on_pre_render = () => {
        mod.onPreRender();
    }
    definition.on_post_render = () => {
        mod.onPostRender();
    }
    definition.on_key_pressed = (keyName: string) => {
        mod.onKeyPressed(keyName);
    }
    definition.on_mouse_pressed = (x: number, y: number, button: string, touches: number) => {
        mod.onMousePressed(x, y, button, touches);
    }
    return definition;
}

