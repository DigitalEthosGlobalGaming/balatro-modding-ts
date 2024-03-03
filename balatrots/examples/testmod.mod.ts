const testMod: ModDefinition = {
    mod_id: "test-mod-0001",
    name: "TestMod",
    version: "0.0.2",
    author: "stinkfire",
    description: [
        "Test Mod 1"
    ],
    enabled: true,
    on_pre_load: () => {        
        sendDebugMessage("on_pre_load");
    },
    on_enable: () => {
        sendDebugMessage("on_enable");
    },
    on_disable: () => {
        sendDebugMessage("on_disable");
    },
    on_pre_update: () => {
        sendDebugMessage("on_pre_update");
    },
    on_post_update: () => {
        sendDebugMessage("on_post_update");
    },
    on_pre_render: () => {
        sendDebugMessage("on_pre_render");
    },
    on_post_render: () => {
        sendDebugMessage("on_post_render");
    },
    on_key_pressed: (keyName: string) => {
        sendDebugMessage("on_key_pressed");
    },
    on_mouse_pressed: (x: number, y: number, button: string, touches: number) => {
        sendDebugMessage("on_mouse_pressed");
    }
}
export { testMod };