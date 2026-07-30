import { ModuleRegistry } from "./module.registry.js";

class ModuleManager {

    async initialize() {

        for (const name of ModuleRegistry.all()) {

            const module = ModuleRegistry.get(name);

            if (module && typeof module.init === "function") {

                await module.init();

            }

        }

    }

}

export const ModuleManager = new ModuleManager();
