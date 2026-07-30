import "./controllers.js";
import "./routes.js";
import "./repositories.js";
import "./events.js";
import "./services.js";
import "../config/roles.js";
import "./register.js";
import { App } from "../core/app.js";
import { ModuleManager } from "../core/module.manager.js";

window.addEventListener("DOMContentLoaded", async () => {

    try {

        await App.boot();
        await ModuleManager.initialize();

        console.log("AKA BMW ISGM Started");

    } catch (e) {

        console.error(e);

    }

});
