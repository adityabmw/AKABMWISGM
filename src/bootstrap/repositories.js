import { Container } from "../core/container.js";

const repositories = import.meta.glob("../modules/**/*.repository.js", {
    eager: true
});

Object.entries(repositories).forEach(([file, mod]) => {

    const repo = mod.default;

    if (repo) {

        const name = file
            .split("/")
            .pop()
            .replace(".repository.js", "");

        Container.register(name + "Repository", repo);

    }

});

console.log(
    "Repositories:",
    Container.all().filter(x => x.endsWith("Repository"))
);
