// ==========================================================
// AKA BMW ISGM
// File      : transaction.js
// Layer     : Database Foundation
// Version   : 3.0.0 Enterprise
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

import { Logger } from "./logger.js";

class TransactionEngine {

    constructor() {

        this.running = false;

    }

    async run(callback) {

        if (this.running) {

            throw new Error(
                "Transaction already running."
            );

        }

        this.running = true;

        Logger.info("Transaction Started");

        try {

            const result = await callback();

            Logger.success(
                "Transaction Committed"
            );

            return result;

        }

        catch (error) {

            Logger.error(
                "Transaction Rollback",
                error
            );

            throw error;

        }

        finally {

            this.running = false;

        }

    }

    isRunning() {

        return this.running;

    }

}

const Transaction = new TransactionEngine();

export {

    Transaction,

    TransactionEngine

};