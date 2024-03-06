
type ModDefinitionMetadata = {
    mod_id:string;
    name: string;
    version: string;
    author: string;
    url: string;
    description:string[];
    enabled: boolean;
}
type ModDefinition = ModDefinitionMetadata & {
    on_pre_load?: () => void;
    on_enable?: () => void;
    on_disable?: () => void;
    on_pre_update?: () => void;
    on_post_update?: () => void;
    on_pre_render?: () => void;
    on_post_render?: () => void;
    on_key_pressed?: (keyName: string) => void;
    on_mouse_pressed?: (x: number, y: number, button: string, touches: number) => void;
}

declare function debugMessage(this: void, message: string): void;
declare function inject(this: void, file_name: string, func_name: string, to_replace: string, replacement:string): void;
declare const mods: ModDefinition[];
declare const Controller: {
  key_press_update: (key:string, dt: any) => void;
}

type EventTriggers = "immediate" | "before";
type EventProperties = {
    delay?: number;
    trigger?: EventTriggers;
    func: () => boolean;
}
declare function Event(this: void, event: EventProperties): EventProperties;

declare function get_next_tag_key(this: void): any;
declare function delay(this: void, amount: number): any;


type GameSounds = "cancel";
declare function play_sound(this: void, sounds: GameSounds): void;

declare function create_UIBox_blind_select(this: void): any;



type UIBoxProperties = {
    definition: any;
    config: any
}


declare function UIBox(this: void, props: UIBoxProperties): any;


type GameTag = {
    apply_to_run: (props: {type:"immediate" | "new_blind_choice"}) => boolean;
}
type GlobalState = {
  BALATROTS?: {
    mods?: {[id: string] :any};
    subscriptionManager?: any;
    originalFunctions?: any;
  };
    modData: any;
    jokers: {
        T: {
            h: number;
            w: number;
            x: number;
            y: number
        }
    }
    ROOM: {
        jiggle: number;
        T: {
            h: number;
            w: number;
            x: number;
            y: number
        }
    },
    CONTROLLER: {
        lock_input: boolean;
    }
    hand: any;
    E_MANAGER: {
        addEvent: (event: EventProperties) => void;
    }
    GAME: {
        tags: GameTag[];
        round_resets: {
            ante: number;
            blind_tags: {
                Small: any;
                Big: any;
            }
        }
    }
    blind_select: {
        T: {
            h: number;
            w: number;
            x: number;
            y: number
        };
        remove: () => void;
        alignment: {
            offset: {
                y: number;
                x: number;
            }
        }
    } | null
    blind_prompt_box: {
        T: {
            h: number;
            w: number;
            x: number;
            y: number
        };
        remove: () => void;
        alignment: {
            offset: {
                y: number;
                x: number;
            }
        }
    } | null;
    localization: {
        [pool: string]: {
            [id: string]: string;
        }
    }
    P_CENTERS: {
        [slug:string]: Deck
    }
    P_CENTERS_POOLS: Deck[]
}

declare const G: GlobalState;


declare type Joker = {
    order: number;
    unlocked: boolean;
    discovered: boolean;
    blueprint_compat: boolean;
    eternal_compat: boolean;
    rarity: number;
    cost: number;
    name: string;
    set: string;
    config: {
        extra?: number;
        x_mult?: number;
    };
    pos: {
        x: number;
        y: number;
    }
}

declare type Deck =  {
    slug: string;
    name: string;
    discovered: boolean;
    unlocked: boolean;
    spritePos: {
        x: number;
        y: number;
    };
    config: {
        extra?: number;
        x_mult?: number;
    };
}