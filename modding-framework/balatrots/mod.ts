import { getData, setData } from "./data";
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
    setData(key, defaultValue);
  }

  getData(key: string, defaultValue: any) {
    if (key == undefined) {
      return defaultValue;
    }
    key = this.getId() + "_" + key;
    return getData(key, defaultValue);
  }

  unload() {
    debugMessage("Unloading mod: " + this.getId());
    try {
      this.onUnload();
      const subscriptionManager = G.BALATROTS?.subscriptionManager;
      if (subscriptionManager != undefined) {
        for (const subscription of this.subscriptions) {
          subscriptionManager.unsubscribe(subscription);
        }
      }
      debugMessage("Mod Unloaded: " + this.getId());
    } catch (e: any) {
      debugMessage("Error Unloading mod: " + this.getId());
      debugMessage(e);
    }
  }

  onUnload() {}

  load() {
    debugMessage("Loading Mod: " + this.getId());
    try {
      this.onPreLoad();
      const me = this;
      const subscriptionManager = G.BALATROTS?.subscriptionManager;
      if (subscriptionManager != undefined) {
        const subscription = subscriptionManager.subscribe(
          "KeyPressUpdate",
          (args: any[]) => {
            me.onKeyPressed(args[0], args[1]);
          }
        );
        this.subscriptions.push(subscription);
      }
      this.onLoad();

      debugMessage("Mod Loaded: " + this.getId());
    } catch (e: any) {
      debugMessage("Error loading mod: " + this.getId());
      debugMessage(e);
    }
  }

  onLoad() {}

  onPreLoad() {}

  onEnable() {}
  onDisable() {}
  onPreUpdate() {}
  onPostUpdate() {}
  onPreRender() {}
  onPostRender() {}
  onKeyPressed(keyName: string, dt: number) {}
  onMousePressed(
    x: number,
    y: number,
    button: string | undefined,
    touches: number
  ) {}
}
