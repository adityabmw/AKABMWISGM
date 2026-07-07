// ================================================================
// AKA BMW ISGM
// Enterprise Storage Engine
// Version : 3.0.0
// ================================================================

class StorageEngine {

    constructor(prefix = "AKABMW") {

        this.prefix = prefix;

    }

    key(name) {

        return `${this.prefix}:${name}`;

    }

    set(name, value) {

        try {

            localStorage.setItem(

                this.key(name),

                JSON.stringify(value)

            );

            return true;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    }

    get(name, defaultValue = null) {

        try {

            const value = localStorage.getItem(

                this.key(name)

            );

            if (value === null) {

                return defaultValue;

            }

            return JSON.parse(value);

        }

        catch (error) {

            console.error(error);

            return defaultValue;

        }

    }

    remove(name) {

        localStorage.removeItem(

            this.key(name)

        );

    }

    has(name) {

        return localStorage.getItem(

            this.key(name)

        ) !== null;

    }

    clear() {

        const keys = [];

        for (

            let i = 0;

            i < localStorage.length;

            i++

        ) {

            const key = localStorage.key(i);

            if (

                key.startsWith(

                    this.prefix + ":"

                )

            ) {

                keys.push(key);

            }

        }

        keys.forEach(key =>

            localStorage.removeItem(key)

        );

    }

    keys() {

        const result = [];

        for (

            let i = 0;

            i < localStorage.length;

            i++

        ) {

            const key = localStorage.key(i);

            if (

                key.startsWith(

                    this.prefix + ":"

                )

            ) {

                result.push(key);

            }

        }

        return result;

    }

}

const Storage = new StorageEngine();

export {

    Storage,

    StorageEngine

};