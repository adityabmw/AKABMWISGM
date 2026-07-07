// ==========================================================
// AKA BMW ISGM
// File      : repository.js
// Layer     : Database Foundation
// Version   : 3.0.0-alpha
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

import { Firestore } from "./firestore.js";

class Repository {

    constructor(collectionName) {

        this.collection = collectionName;

    }

    async create(data) {

        return await Firestore.create(

            this.collection,

            data

        );

    }

    async createWithId(id, data) {

        return await Firestore.createWithId(

            this.collection,

            id,

            data

        );

    }

    async update(id, data) {

        return await Firestore.update(

            this.collection,

            id,

            data

        );

    }

    async delete(id) {

        return await Firestore.delete(

            this.collection,

            id

        );

    }

    async find(id) {

        return await Firestore.find(

            this.collection,

            id

        );

    }

    async all() {

        return await Firestore.all(

            this.collection

        );

    }

}

export {

    Repository

};