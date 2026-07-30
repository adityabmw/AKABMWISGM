import UnitOfWork from "./unitofwork.js";

class TransactionManager {

    constructor() {
        this.database = null;
    }

    initialize(db) {
        this.database = db;
    }

    async run(callback) {

        const uow = new UnitOfWork(this.database);

        return uow.execute(callback);

    }

}

export const Transaction = new TransactionManager();

export default Transaction;
