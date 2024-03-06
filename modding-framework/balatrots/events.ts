import { Hotloadable } from "./Hotloadable";

type PrePost<T extends string> = `pre${T}` | T;
export type Events = PrePost<"KeyPressUpdate"> | "load" | "unload";


export type Subscription = {
    id: number;
    event: string;
    callback: any;
}
export class SubscriptionManager implements Hotloadable {
    currentId: number;
    subscriptions: {[key: string] : Subscription[]}
    constructor() {
        this.currentId = 0;
        this.subscriptions = {};
        this.onLoad();
    }
    onLoad()  {
        this.currentId = 0;
        this.subscriptions = {};        
    };
    onUnload()  {
        this.unsubscribeAll();
        this.triggerEvent("unload");
    };
    triggerEvent(event: Events, ...args: any) {
        const preEvents = this.subscriptions[`pre${event}`];
        if (preEvents != undefined) {
            this.subscriptions[event].forEach((subscription: Subscription) => {
                subscription.callback(args);
            });
        }
        if (G?.BALATROTS?.originalFunctions != undefined) {
            if (G.BALATROTS.originalFunctions[event] != undefined) {
                G.BALATROTS.originalFunctions[event](...args);
            }
        }

        if (this.subscriptions[event] != undefined) {
            this.subscriptions[event].forEach((subscription: Subscription) => {
                subscription.callback(args);
            });
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
            callback: callback
        }
        this.subscriptions[event].push(subscription);
        return subscription;
    }
    unsubscribe(subscription: Subscription) {
        this.subscriptions[subscription.event] = this.subscriptions[subscription.event].filter((s: Subscription) => {
            return s.id !== subscription.id;
        });
    }
    unsubscribeAll() {
        this.subscriptions = {};
    }
    remove() {
        
    }
}

if (G.BALATROTS == undefined) {
    G.BALATROTS = {
        subscriptionManager: undefined,
        originalFunctions: {
            "KeyPressUpdate": Controller.key_press_update,
        }
    };
}

if (G.BALATROTS.originalFunctions != undefined) {
    G.BALATROTS.originalFunctions = {
        "KeyPressUpdate": Controller.key_press_update,
    }
}

if (G.BALATROTS.subscriptionManager != undefined) {
    G.BALATROTS.subscriptionManager.unload();
}

G.BALATROTS.subscriptionManager = new SubscriptionManager();

function wrapOriginalFunction(event: Events) {
    return function(...args: any) {
        G.BALATROTS?.subscriptionManager.triggerEvent(event, args);
    }
}

Controller.key_press_update = wrapOriginalFunction("KeyPressUpdate");