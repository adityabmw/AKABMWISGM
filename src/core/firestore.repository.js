import {
    collection,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
} from "firebase/firestore";

import { db } from "../config/firebase.config.js";
import { QueryBuilder } from "./query.builder.js";

export class FirestoreRepository {

    constructor(collectionName){

        this.collectionName = collectionName;

    }

    collection(){

        return collection(db,this.collectionName);

    }

    async create(data){

        const ref = await addDoc(this.collection(),data);

        return ref.id;

    }

    async find(id){

        const snap = await getDoc(doc(db,this.collectionName,id));

        return snap.exists() ? {id:snap.id,...snap.data()} : null;

    }

    async all(){

        const snap = await getDocs(this.collection());

        return snap.docs.map(d=>({
            id:d.id,
            ...d.data()
        }));

    }

    async update(id,data){

        await updateDoc(doc(db,this.collectionName,id),data);

        return true;

    }

    async delete(id){

        await deleteDoc(doc(db,this.collectionName,id));

        return true;

    }


    query(){

        return new QueryBuilder(this.collectionName);

    }

}
