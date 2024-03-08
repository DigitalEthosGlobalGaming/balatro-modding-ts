import { initialiseEvents } from "@balatrots/events";
import { TestMod } from "@balatrots/examples/testmod.mod";
import { UIExampleMod } from "@balatrots/examples/ui-example.mod";
import { loadMods, unloadMods } from "@balatrots/utilities";

unloadMods();
initialiseEvents();

const mods = loadMods([new TestMod(), new UIExampleMod()]);

export default mods;
