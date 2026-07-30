// ==========================================================
// AKA BMW ISGM
// File      : firestore.js
// Layer     : Core Foundation
// Version   : 3.0.0-alpha
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

import {

    collection,

    doc,

    getDoc,

    getDocs,

    addDoc,

    updateDoc,

    deleteDoc,

    setDoc,

    query,

    where,

    orderBy,

    limit,

    Timestamp,

    onSnapshot

} from

"firebase/firestore";

import { DB } from "../config/firebase.config.js";

class FirestoreEngine {

    collection(name) {

        return collection(DB, name);

    }

    document(collectionName, documentId) {

        return doc(

            DB,

            collectionName,

            documentId

        );

    }

    timestamp() {

        return Timestamp.now();

    }

    async create(collectionName, data) {

        return await addDoc(

            this.collection(collectionName),

            data

        );

    }

    async createWithId(

        collectionName,

        documentId,

        data

    ) {

        return await setDoc(

            this.document(

                collectionName,

                documentId

            ),

            data

        );

    }

    async update(

        collectionName,

        documentId,

        data

    ) {

        return await updateDoc(

            this.document(

                collectionName,

                documentId

            ),

            data

        );

    }

    async delete(

        collectionName,

        documentId

    ) {

        return await deleteDoc(

            this.document(

                collectionName,

                documentId

            )

        );

    }

    async find(

        collectionName,

        documentId

    ) {

        return await getDoc(

            this.document(

                collectionName,

                documentId

            )

        );

    }

    async all(collectionName) {

        return await getDocs(

            this.collection(collectionName)

        );

    }

    query(...args) {

        return query(...args);

    }

    where(...args) {

        return where(...args);

    }

    orderBy(...args) {

        return orderBy(...args);

    }

    limit(number) {

        return limit(number);

    }

    watch(reference, callback) {

        return onSnapshot(

            reference,

            callback

        );

    }

}

const Firestore = new FirestoreEngine();

export {

    Firestore,

    FirestoreEngine

};