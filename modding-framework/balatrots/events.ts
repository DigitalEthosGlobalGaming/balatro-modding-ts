import { Hotloadable } from "./Hotloadable";

type PrePost<T extends string> = `pre${T}` | T;
export type Events = PrePost<"KeyPressUpdate"> | "load" | "unload";

export type Subscription = {
  id: number;
  event: string;
  callback: (...args: any) => void;
};
export class SubscriptionManager implements Hotloadable {
  id: number;
  currentId: number;
  subscriptions: { [key: string]: Subscription[] };
  constructor() {
    this.id = Math.random();
    this.currentId = 0;
    this.subscriptions = {};
    this.onLoad();
  }
  onLoad() {
    this.currentId = 0;
    this.subscriptions = {};
  }
  onUnload() {
    this.unsubscribeAll();
    this.triggerEvent("unload");
  }
  triggerEvent(event: Events, args: any = []) {
    try {
      if (this.subscriptions[event] != undefined) {
        this.subscriptions[event].forEach((subscription: Subscription) => {
          subscription.callback(args);
        });
      }
    } catch (e: any) {
      debugMessage(e);
    }
  }
  subscribe(event: Events, callback: any) {
    if (this.subscriptions[event] == undefined) {
      this.subscriptions[event] = [];
    }

    this.currentId = this.currentId + 1;
    const subscription = {
      id: this.currentId,
      event: event,
      callback: callback,
    };
    this.subscriptions[event].push(subscription);
    return subscription;
  }
  unsubscribe(subscription: Subscription) {
    const subscriptions = this.subscriptions[subscription.event];
    if (subscriptions == undefined) {
      return;
    }

    this.subscriptions[subscription.event] = this.subscriptions[
      subscription.event
    ].filter((s: Subscription) => {
      return s.id !== subscription.id;
    });
  }
  unsubscribeAll() {
    this.subscriptions = {};
  }
  remove() {}
}

function initialiseEvents(this: void) {
  debugMessage("------Initialising Event Hooks------");
  if (G.BALATROTS == undefined) {
    G.BALATROTS = {};
  }

  if (G.BALATROTS.originalFunctions == undefined) {
    G.BALATROTS.originalFunctions = {};
  }

  if (G.BALATROTS?.originalFunctions?.KeyPressUpdate == undefined) {
    const originalFunction: (this: void, ...args: any) => void =
      Controller.key_press_update;
    G.BALATROTS.originalFunctions.KeyPressUpdate = originalFunction;
    Controller.key_press_update = function newKeyPressUpdate(
      this,
      key: any,
      dt: any
    ) {
      try {
        const localSubManager: SubscriptionManager =
          G.BALATROTS?.subscriptionManager;
        localSubManager.triggerEvent("preKeyPressUpdate", [key, dt]);

        originalFunction(this, key, dt);

        localSubManager.triggerEvent("KeyPressUpdate", [key, dt]);
      } catch (e) {
        debugMessage(e as any);
      }
    };
  }

  const currentSubscriptionManager: SubscriptionManager | undefined =
    G.BALATROTS.subscriptionManager;

  if (currentSubscriptionManager != undefined) {
    currentSubscriptionManager.onUnload();
  }

  G.BALATROTS.subscriptionManager = new SubscriptionManager();
}
export { initialiseEvents };
