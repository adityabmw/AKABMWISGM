import Router from "../core/router.js";

const routes = import.meta.glob("../modules/**/*.routes.js", {
    eager: true
});

Object.entries(routes).forEach(([file, mod]) => {

    const route = mod.default;

    if (route && typeof route === "object") {

        const name = file
            .split("/")
            .pop()
            .replace(".routes.js", "");

        Router.register(name, route);
    }

});

console.log(
    "Routes:",
    Router.list()
);
