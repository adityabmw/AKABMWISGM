import { ModuleRegistry } from "../core/module.registry.js";

const modules = import.meta.glob("../modules/**/index.js", {
    eager: true
});

Object.entries(modules).forEach(([path, mod]) => {

    const name = path.split("/").slice(-2, -1)[0];

    ModuleRegistry.register(
        name,
        mod.default || mod
    );

});

console.log(
    "Registered Modules:",
    ModuleRegistry.all()
);

export default ModuleRegistry;
