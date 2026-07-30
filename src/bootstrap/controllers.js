import { Container } from "../core/container.js";

const controllers = import.meta.glob("../modules/**/*.controller.js", {
    eager: true
});

Object.entries(controllers).forEach(([file, mod]) => {

    const controller = mod.default;

    if (controller) {

        const name = file
            .split("/")
            .pop()
            .replace(".controller.js", "");

        Container.register(name + "Controller", controller);

    }

});

console.log(
    "Controllers:",
    Container.all().filter(x => x.endsWith("Controller"))
);
