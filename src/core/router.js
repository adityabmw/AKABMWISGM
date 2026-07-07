// ==========================================================
// AKA BMW ISGM
// Enterprise Router Engine
// Version : 3.1.0
// ==========================================================

import { Logger } from "./logger.js";

class RouterEngine {

    constructor() {

        this.routes = new Map();

        this.current = null;

        this.registerDefaultRoutes();

    }

    registerDefaultRoutes() {

        this.register({

            name: "login",

            render: () => {

                document.getElementById("authPage")?.classList.remove("d-none");

                document.getElementById("dashboardPage")?.classList.add("d-none");

                Logger.info("Login Page Loaded");

            }

        });

        this.register({

            name: "dashboard",

            render: () => {

                document.getElementById("authPage")?.classList.add("d-none");

                document.getElementById("dashboardPage")?.classList.remove("d-none");

                Logger.info("Dashboard Loaded");

            }

        });

    }

    register(route) {

        if (!route.name) {

            throw new Error("Route name is required.");

        }

        this.routes.set(route.name, route);

    }

    navigate(name, data = null) {

        const route = this.routes.get(name);

        if (!route) {

            Logger.warning(`Route "${name}" not found.`);

            return;

        }

        this.current = name;

        if (typeof route.beforeEnter === "function") {

            route.beforeEnter(data);

        }

        route.render(data);

        if (typeof route.afterEnter === "function") {

            route.afterEnter(data);

        }

    }

    currentRoute() {

        return this.current;

    }

    exists(name) {

        return this.routes.has(name);

    }

}

const Router = new RouterEngine();

export {

    Router,

    RouterEngine

};