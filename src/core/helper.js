// ==========================================================
// AKA BMW ISGM
// File      : helper.js
// Layer     : Core Foundation
// Version   : 3.0.0-alpha
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

class HelperEngine {

    uuid() {

        return crypto.randomUUID();

    }

    now() {

        return new Date();

    }

    today() {

        return new Date()

            .toISOString()

            .substring(0, 10);

    }

    timestamp() {

        return Date.now();

    }

    clone(object) {

        return structuredClone(object);

    }

    money(value = 0) {

        return Number(value)

            .toLocaleString(

                "id-ID"

            );

    }

    number(value = 0) {

        return Number(value);

    }

    string(value = "") {

        return String(value);

    }

    upper(text = "") {

        return text.toUpperCase();

    }

    lower(text = "") {

        return text.toLowerCase();

    }

    capitalize(text = "") {

        return text

            .charAt(0)

            .toUpperCase()

            +

            text.slice(1);

    }

    sleep(ms = 1000) {

        return new Promise(

            resolve =>

                setTimeout(

                    resolve,

                    ms

                )

        );

    }

}

const Helper = new HelperEngine();

export {

    Helper,

    HelperEngine

};