// ==========================================================
// AKA BMW ISGM
// Authentication Engine
// Enterprise v3.1.0
// ==========================================================

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import { Auth } from "../config/firebase.config.js";
import { Database } from "./database.js";
import { Logger } from "./logger.js";

class AuthenticationEngine {

    constructor() {

        this.user = null;

    }

    async login(email, password) {

        const credential =
            await signInWithEmailAndPassword(
                Auth,
                email,
                password
            );

        this.user = credential.user;

        Logger.success("Login Success");

        return credential.user;

    }

    async logout() {

        await signOut(Auth);

        this.user = null;

        Logger.info("Logout Success");

    }

    currentUser() {

        return this.user;

    }

    async profile(uid) {

        const doc =
            await Database.find(
                "users",
                uid
            );

        if (!doc.exists()) {

            return null;

        }

        return doc.data();

    }

    watch(callback) {

        return onAuthStateChanged(
            Auth,
            (user) => {

                this.user = user;

                Logger.info(
                    user
                        ? "User Authenticated"
                        : "User Not Authenticated"
                );

                if (callback) {

                    callback(user);

                }

            }
        );

    }

}

const Authentication =
    new AuthenticationEngine();

export {

    Authentication,

    AuthenticationEngine

};