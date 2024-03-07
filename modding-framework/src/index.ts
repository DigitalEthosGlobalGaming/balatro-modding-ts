import { initialiseEvents } from "@balatrots/events";
import { TestMod } from "@balatrots/examples/testmod.mod";
import { loadMods, unloadMods } from "@balatrots/utilities";

unloadMods();
initialiseEvents();

const mods = loadMods([new TestMod()]);

export default mods;
