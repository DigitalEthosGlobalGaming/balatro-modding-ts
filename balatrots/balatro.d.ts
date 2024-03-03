
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
    on_key_pressed?: (keyName: string) => void;
    on_mouse_pressed?: (x: number, y: number, button: string, touches: number) => void;
}

declare function sendDebugMessage(this: void, message: string): void;
declare function inject(this: void, file_name: string, func_name: string, to_replace: string, replacement:string): void;
declare const mods: ModDefinition[];
