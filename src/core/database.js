// ==========================================================
// AKA BMW ISGM
// File      : database.js
// Layer     : Core Foundation
// Version   : 3.1.0 Enterprise
// Status    : REBUILD
// ==========================================================

import { Firestore } from "./firestore.js";

class DatabaseEngine {

    constructor() {

        this.driver = Firestore;

    }

    driverInstance() {

        return this.driver;

    }

    setDriver(driver) {

        this.driver = driver;

        return this;

    }

    async create(collection, data) {

        return await this.driver.create(
            collection,
            data
        );

    }

    async createWithId(collection, id, data) {

        return await this.driver.createWithId(
            collection,
            id,
            data
        );

    }

    async update(collection, id, data) {

        return await this.driver.update(
            collection,
            id,
            data
        );

    }

    async delete(collection, id) {

        return await this.driver.delete(
            collection,
            id
        );

    }

    async find(collection, id) {

        return await this.driver.find(
            collection,
            id
        );

    }

    async all(collection) {

        return await this.driver.all(
            collection
        );

    }

}

const Database = new DatabaseEngine();

export {

    Database,

    DatabaseEngine

};