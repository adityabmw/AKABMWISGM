import {
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs
} from "firebase/firestore";

import { db } from "../config/firebase.config.js";

export class QueryBuilder {

    constructor(collectionName){

        this.collectionName = collectionName;
        this.constraints = [];

    }

    where(field,operator,value){

        this.constraints.push(where(field,operator,value));
        return this;

    }

    order(field,direction="asc"){

        this.constraints.push(orderBy(field,direction));
        return this;

    }

    limit(value){

        this.constraints.push(limit(value));
        return this;

    }

    startAfter(docRef){

        this.constraints.push(startAfter(docRef));
        return this;

    }

    async get(){

        const q=query(
            collection(db,this.collectionName),
            ...this.constraints
        );

        const snap=await getDocs(q);

        return snap.docs.map(doc=>({
            id:doc.id,
            ...doc.data()
        }));

    }

}
