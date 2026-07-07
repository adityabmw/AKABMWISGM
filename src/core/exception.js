// ==========================================================
// AKA BMW ISGM
// File      : exception.js
// Layer     : Core Foundation
// Version   : 3.0.0-alpha
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

class AppException extends Error {

    constructor(message, code = "UNKNOWN_ERROR", status = 500) {

        super(message);

        this.name = this.constructor.name;

        this.code = code;

        this.status = status;

        this.timestamp = new Date();

    }

}

class ValidationException extends AppException {

    constructor(message) {

        super(

            message,

            "VALIDATION_ERROR",

            400

        );

    }

}

class AuthenticationException extends AppException {

    constructor(message = "Authentication Failed") {

        super(

            message,

            "AUTHENTICATION_ERROR",

            401

        );

    }

}

class AuthorizationException extends AppException {

    constructor(message = "Access Denied") {

        super(

            message,

            "AUTHORIZATION_ERROR",

            403

        );

    }

}

class DatabaseException extends AppException {

    constructor(message = "Database Error") {

        super(

            message,

            "DATABASE_ERROR",

            500

        );

    }

}

class NetworkException extends AppException {

    constructor(message = "Network Error") {

        super(

            message,

            "NETWORK_ERROR",

            503

        );

    }

}

export {

    AppException,

    ValidationException,

    AuthenticationException,

    AuthorizationException,

    DatabaseException,

    NetworkException

};