type ModDefinition = {
  mod_id: string;
  name: string;
  version: string;
  author: string;
  description: string[];
  enabled: boolean;
  on_pre_load?: () => void;
  on_enable?: () => void;
  on_disable?: () => void;
  on_pre_update?: () => void;
  on_post_update?: () => void;
  on_pre_render?: () => void;
  on_post_render?: () => void;
  on_key_pressed?: (...args: any[]) => void;
  on_mouse_pressed?: (
    x: number,
    y: number,
    button: string,
    touches: number
  ) => void;
};

declare function debugMessage(this: void, message: string): void;
declare function inject(
  this: void,
  file_name: string,
  func_name: string,
  to_replace: string,
  replacement: string
): void;
declare const mods: ModDefinition[];

type EventTriggers = "immediate" | "before";
type EventProperties = {
  delay?: number;
  trigger?: EventTriggers;
  func: () => boolean;
};
declare function Event(this: void, event: EventProperties): EventProperties;

declare function get_next_tag_key(this: void): any;
declare function delay(this: void, amount: number): any;

type GameSounds = "cancel";
declare function play_sound(this: void, sounds: GameSounds): void;

declare function create_UIBox_blind_select(this: void): any;

type UIBoxGenericOptionsProps = {
  contents: any;
};
declare function create_UIBox_generic_options(
  this: void,
  props: UIBoxGenericOptionsProps
): any;

type CreateTabsProps = {
  tabs: {
    label: string;
    chosen: boolean;
    tab_definition_function: () => any;
  }[];
};
declare function create_tabs(this: void, props: any): any;

type UIBoxProperties = {
  definition: any;
  config: any;
};

declare function UIBox(this: void, props: UIBoxProperties): any;

type GameTag = {
  apply_to_run: (props: { type: "immediate" | "new_blind_choice" }) => boolean;
};
type GlobalState = {
  jokers: {
    T: {
      h: number;
      w: number;
      x: number;
      y: number;
    };
  };
  ROOM: {
    jiggle: number;
    T: {
      h: number;
      w: number;
      x: number;
      y: number;
    };
  };
  CONTROLLER: {
    lock_input: boolean;
  };
  hand: any;
  E_MANAGER: {
    addEvent: (event: EventProperties) => void;
  };
  GAME: {
    tags: GameTag[];
    round_resets: {
      ante: number;
      blind_tags: {
        Small: any;
        Big: any;
      };
    };
  };
  blind_select: {
    T: {
      h: number;
      w: number;
      x: number;
      y: number;
    };
    remove: () => void;
    alignment: {
      offset: {
        y: number;
        x: number;
      };
    };
  } | null;
  blind_prompt_box: {
    T: {
      h: number;
      w: number;
      x: number;
      y: number;
    };
    remove: () => void;
    alignment: {
      offset: {
        y: number;
        x: number;
      };
    };
  } | null;
};
declare const G: GlobalState;
