// ================================================================
// AKA BMW ISGM
// Enterprise Event Bus Engine
// Version : 3.0.0
// ================================================================

class EventEngine {

    constructor() {

        this.events = new Map();

    }

    on(eventName, callback) {

        if (typeof callback !== "function") {

            throw new Error(
                `Event callback for "${eventName}" must be a function.`
            );

        }

        if (!this.events.has(eventName)) {

            this.events.set(eventName, []);

        }

        this.events.get(eventName).push(callback);

        return () => this.off(eventName, callback);

    }

    once(eventName, callback) {

        const unsubscribe = this.on(

            eventName,

            (...args) => {

                unsubscribe();

                callback(...args);

            }

        );

    }

    off(eventName, callback) {

        if (!this.events.has(eventName)) {

            return;

        }

        const listeners = this.events.get(eventName);

        const filtered = listeners.filter(

            listener => listener !== callback

        );

        if (filtered.length === 0) {

            this.events.delete(eventName);

            return;

        }

        this.events.set(eventName, filtered);

    }

    emit(eventName, payload = null) {

        if (!this.events.has(eventName)) {

            return;

        }

        const listeners = [...this.events.get(eventName)];

        listeners.forEach(listener => {

            try {

                listener(payload);

            }

            catch (error) {

                console.error(

                    `[EVENT ERROR] ${eventName}`,

                    error

                );

            }

        });

    }

    clear(eventName) {

        this.events.delete(eventName);

    }

    clearAll() {

        this.events.clear();

    }

    has(eventName) {

        return this.events.has(eventName);

    }

    listenerCount(eventName) {

        if (!this.events.has(eventName)) {

            return 0;

        }

        return this.events.get(eventName).length;

    }

    registeredEvents() {

        return [...this.events.keys()];

    }

}

const EventBus = new EventEngine();

const AppEvent = EventBus;

export {

    AppEvent,

    EventBus,

    EventEngine

};