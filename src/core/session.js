// ================================================================
// AKA BMW ISGM
// Enterprise Session Engine
// Version : 3.1.0
// ================================================================

class SessionEngine {

    constructor(prefix = "AKABMW") {

        this.prefix = prefix;

    }

    key(name) {

        return `${this.prefix}:${name}`;

    }

    set(name, value) {

        sessionStorage.setItem(
            this.key(name),
            JSON.stringify(value)
        );

        return true;

    }

    get(name, defaultValue = null) {

        const value = sessionStorage.getItem(
            this.key(name)
        );

        if (value === null) {

            return defaultValue;

        }

        try {

            return JSON.parse(value);

        }

        catch {

            return value;

        }

    }

    has(name) {

        return sessionStorage.getItem(
            this.key(name)
        ) !== null;

    }

    remove(name) {

        sessionStorage.removeItem(
            this.key(name)
        );

    }

    clear() {

        Object.keys(sessionStorage)

            .filter(key => key.startsWith(this.prefix))

            .forEach(key => sessionStorage.removeItem(key));

    }

}

const Session = new SessionEngine();

export {

    Session,

    SessionEngine

};