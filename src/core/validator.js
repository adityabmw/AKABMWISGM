// ==========================================================
// AKA BMW ISGM
// File      : validator.js
// Layer     : Core Foundation
// Version   : 3.0.0-alpha
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

class ValidatorEngine {

    required(value) {

        return value !== undefined &&
               value !== null &&
               value !== "";

    }

    email(value) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(value);

    }

    phone(value) {

        const regex =
            /^[0-9]{10,15}$/;

        return regex.test(value);

    }

    number(value) {

        return !isNaN(value);

    }

    integer(value) {

        return Number.isInteger(Number(value));

    }

    minLength(value, length) {

        return String(value).length >= length;

    }

    maxLength(value, length) {

        return String(value).length <= length;

    }

    between(value, min, max) {

        const number = Number(value);

        return number >= min &&
               number <= max;

    }

    object(value) {

        return typeof value === "object" &&
               value !== null;

    }

    array(value) {

        return Array.isArray(value);

    }

    date(value) {

        return !isNaN(Date.parse(value));

    }

    boolean(value) {

        return typeof value === "boolean";

    }

}

const Validator = new ValidatorEngine();

export {

    Validator,

    ValidatorEngine

};