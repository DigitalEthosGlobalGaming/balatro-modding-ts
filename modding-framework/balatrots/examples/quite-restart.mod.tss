import { addEvent } from "@balatrots/utilities";

export const quickRestartMod: ModDefinition = {
    mod_id: "quick-restart-ts",
    name: "Quick Restart",
    version: "0.0.1",
    author: "stinkfire",
    description: [
        "Adds in a quick restart."
    ],
    enabled: true,
    on_key_pressed: (keyName: string) => {
        if (keyName == "f2") {
            if (G.GAME.round_resets.ante == 1) {
                G.GAME.round_resets.blind_tags.Small = get_next_tag_key();
                G.GAME.round_resets.blind_tags.Big = get_next_tag_key();

                addEvent({
                    trigger: "before",
                    delay: 0.2,
                    func: () => {
                        if (G.blind_prompt_box != null) {
                            G.blind_prompt_box.alignment.offset.y = -10;
                        }
                        if (G.blind_select != null) {
                            G.blind_select.alignment.offset.y = 40
                            G.blind_select.alignment.offset.x = 0
                        }
                        return true;
                    }
                });
                addEvent({
                    trigger: "immediate",
                    func: () => {
                        G.blind_select?.remove();
                        G.blind_prompt_box?.remove();
                        G.blind_select = null;
                        delay(0.2)
                        return true;
                    }
                });

                addEvent({
                    func: () => {
                        addEvent({
                            func: () => {
                                play_sound('cancel');
                                G.blind_select = UIBox({
                                    definition: create_UIBox_blind_select(),
                                    config: { align: "bmi", offset: { x: 0, y: G.ROOM.T.y + 29 }, major: G.hand, bond: 'Weak' }
                                });
                                if (G.blind_select != null) {
                                    G.blind_select.alignment.offset.y = 0.8 - (G.hand.T.y - G.jokers.T.y) +
                                        G.blind_select.T.h
                                    G.ROOM.jiggle = G.ROOM.jiggle + 3
                                    G.blind_select.alignment.offset.x = 0
                                    G.CONTROLLER.lock_input = false
                                    for (let i = 0; i < G.GAME.tags.length; i++) {
                                        G.GAME.tags[i].apply_to_run({ type: 'immediate' });
                                    }
                                    for (let i = 0; i < G.GAME.tags.length; i++) {
                                        if (G.GAME.tags[i].apply_to_run({ type: 'new_blind_choice' })) break;
                                    }
                                    return true;
                                }
                                return true;
                            }
                        })
                        G.blind_select?.remove();
                        G.blind_prompt_box?.remove();
                        G.blind_select = null;
                        delay(0.2)
                        return true;
                    }
                });
            }
        }
    }
}