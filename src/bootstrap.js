// ==========================================================
// AKA BMW ISGM
// Bootstrap Engine
// Enterprise v3.1.0
// ==========================================================

import { App } from "./core/app.js";
import { Logger } from "./core/logger.js";

class BootstrapEngine {

    async start() {

        console.clear();

        Logger.success("========================================");
        Logger.success(" AKA BMW ISGM Enterprise");
        Logger.success(" Integrated System Gateway Management");
        Logger.success(" Boot Sequence Started");
        Logger.success("========================================");

        try {

            await App.boot();

            Logger.success("Application Ready.");

        } catch (error) {

            Logger.error("BOOT FAILED");

            Logger.error(error);

            throw error;

        }

    }

}

const Bootstrap = new BootstrapEngine();

window.addEventListener("DOMContentLoaded", async () => {

    try {

        await Bootstrap.start();

    } catch (error) {

        console.error(error);

    }

});

export {

    Bootstrap,

    BootstrapEngine

};