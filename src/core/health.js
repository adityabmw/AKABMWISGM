import { ModuleRegistry } from "./module.registry.js";

export function healthCheck(){

    return {
        modules: ModuleRegistry.all().length,
        registered: ModuleRegistry.all(),
        status: "OK"
    };

}
