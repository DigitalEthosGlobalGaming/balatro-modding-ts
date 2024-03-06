const testMod: ModDefinition = {
  mod_id: "testmod",
  name: "TestMod",
  version: "0.0.10",
  author: "stinkfire",
  description: ["Test Mod 1"],
  enabled: true,
  on_pre_load: () => {
    debugMessage("on_pre_load");
  },
  on_enable: () => {
    debugMessage("on_enable");
  },
  on_disable: () => {
    debugMessage("on_disable");
  },
  on_pre_update: () => {
    // debugMessage("on_pre_update");
  },
  on_post_update: () => {
    // debugMessage("on_post_update");
  },
  on_pre_render: () => {
    // debugMessage("on_pre_render");
  },
  on_post_render: () => {
    // debugMessage("on_post_render");
  },
  on_key_pressed: (keyName: string) => {
    if (keyName == undefined) {
      keyName = "nil";
    }
    debugMessage("on_key_pressed " + keyName);
  },
  on_mouse_pressed: (x: number, y: number, button: string, touches: number) => {
    const parts = [x, y, button, touches];
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] == undefined) {
        parts[i] = "nil";
      }
    }
    debugMessage("on_mouse_pressed " + parts.join(", "));
  },
};
export { testMod };
