// ==========================================================
// AKA BMW ISGM
// Startup Engine
// Enterprise v3.1.0
// ==========================================================

import { Login } from "../modules/auth/login.js";
import { Logger } from "./logger.js";
import { Notification } from "./notification.js";
import { Router } from "./router.js";
import { Authentication } from "./auth.js";

class StartupEngine {

    constructor() {

        this.initialized = false;

    }

    async initialize() {

        if (this.initialized) {

            return;

        }

        Logger.success("Startup Engine Initializing...");

        try {

            await this.loadCore();

            await this.loadFirebase();

            await this.restoreSession();

            await this.loadRouter();

            Login.initialize();

            await this.openInitialPage();

            this.initialized = true;

            Logger.success("Startup Complete.");

        } catch (error) {

            Logger.error(error);

            Notification.error(

                "Startup Error",

                error.message

            );

            throw error;

        }

    }

    async loadCore() {

        Logger.info("Loading Core Engine");

    }

    async loadFirebase() {

        Logger.info("Loading Firebase Services");

    }

    async restoreSession() {

        Logger.info("Checking Authentication");

        Authentication.watch((user) => {

            Authentication.user = user;

        });

    }

    async loadRouter() {

        Logger.info("Loading Router");

    }

    async openInitialPage() {

        if (Authentication.currentUser()) {

            Logger.success("User Session Found");

            Router.navigate("dashboard");

            return;

        }

        Logger.info("User Not Logged In");

        Router.navigate("login");

    }

}

const Startup = new StartupEngine();

export {

    Startup,

    StartupEngine

};