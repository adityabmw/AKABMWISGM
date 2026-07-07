// ==========================================================
// AKA BMW ISGM
// File      : audit.js
// Layer     : Core Foundation
// Version   : 3.0.0 Enterprise
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

import { Firestore } from "./firestore.js";

class AuditEngine {

    constructor() {

        this.collection = "auditLogs";

    }

    async write({

        module,

        action,

        documentId,

        userId,

        userName,

        before = null,

        after = null,

        description = ""

    }) {

        const log = {

            module,

            action,

            documentId,

            userId,

            userName,

            before,

            after,

            description,

            createdAt: Firestore.timestamp()

        };

        return await Firestore.create(

            this.collection,

            log

        );

    }

}

const Audit = new AuditEngine();

export {

    Audit,

    AuditEngine

};