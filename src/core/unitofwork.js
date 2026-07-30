export class UnitOfWork {

    constructor(db) {
        this.db = db;
    }

    async execute(callback) {

        if (!this.db || !this.db.runTransaction) {
            return callback(null);
        }

        return this.db.runTransaction(async (tx) => {
            return callback(tx);
        });

    }

}

export default UnitOfWork;
