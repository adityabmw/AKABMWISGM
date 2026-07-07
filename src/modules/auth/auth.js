// ==========================================================
// AKA BMW ISGM
// Login Module
// Enterprise v3.1.0
// ==========================================================

import { Authentication } from "../../core/auth.js";
import { Router } from "../../core/router.js";
import { Notification } from "../../core/notification.js";
import { Logger } from "../../core/logger.js";

class LoginModule {

    initialize() {

        const button = document.getElementById("btnLogin");

        if (!button) {

            Logger.warning("Button Login tidak ditemukan.");

            return;

        }

        button.addEventListener("click", () => {

            this.login();

        });

    }

    async login() {

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        if (!email || !password) {

            Notification.warning(
                "Login",
                "Email dan Password wajib diisi."
            );

            return;

        }

        try {

            await Authentication.login(
                email,
                password
            );

            Notification.success(
                "Login",
                "Selamat datang."
            );

            Router.navigate("dashboard");

        }

        catch (error) {

            Logger.error(error);

            Notification.error(
                "Login Gagal",
                error.message
            );

        }

    }

}

const Login = new LoginModule();

export {

    Login,

    LoginModule

};