// ==========================================================
// AKA BMW ISGM
// Application Kernel
// Enterprise v3.1.0
// ==========================================================

import { Logger } from "./logger.js";
import { Router } from "./router.js";
import { Helper } from "./helper.js";
import { Validator } from "./validator.js";
import { Notification } from "./notification.js";
import { Permission } from "./permission.js";
import { Database } from "./database.js";
import { Repository } from "./repository.js";
import { Identity } from "./identity.js";
import { Audit } from "./audit.js";
import { Authentication } from "./auth.js";
import { Transaction } from "./transaction.js";
import { Cache } from "./cache.js";
import { Session } from "./session.js";
import { Loader } from "./loader.js";
import { Startup } from "./startup.js";
import { AppEvent } from "./event.js";

class AppKernel {

    constructor() {

        this.name = "AKA BMW ISGM";

        this.version = "3.1.0 Enterprise";

        this.ready = false;

        this.logger = Logger;
        this.router = Router;
        this.helper = Helper;
        this.validator = Validator;
        this.notification = Notification;
        this.permission = Permission;
        this.database = Database;
        this.repository = Repository;
        this.identity = Identity;
        this.audit = Audit;
        this.auth = Authentication;
        this.transaction = Transaction;
        this.cache = Cache;
        this.session = Session;
        this.loader = Loader;
        this.startup = Startup;
        this.event = AppEvent;

    }

    async boot() {

        Logger.success("================================");
        Logger.success(this.name);
        Logger.success(this.version);
        Logger.success("================================");

        await this.startup.initialize();

        this.ready = true;

        Logger.success("Application Ready");

        return true;

    }

    isReady() {

        return this.ready;

    }

}

const App = new AppKernel();

export {

    App,

    AppKernel

};