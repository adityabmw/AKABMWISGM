// ==========================================================
// AKA BMW ISGM
// File      : notification.js
// Layer     : Core Foundation
// Version   : 3.0.0-alpha
// Status    : DEVELOPMENT
// Author    : AKA Development Team
// Architect : Pak Adit
// ==========================================================

class NotificationEngine {

    constructor() {

        this.notifications = [];

        this.listeners = [];

    }

    subscribe(callback) {

        if (typeof callback !== "function") {

            throw new Error(
                "Notification subscriber must be a function."
            );

        }

        this.listeners.push(callback);

        callback(this.notifications);

        return () => {

            this.listeners = this.listeners.filter(

                listener => listener !== callback

            );

        };

    }

    notify() {

        this.listeners.forEach(listener => {

            try {

                listener([...this.notifications]);

            }

            catch (error) {

                console.error(error);

            }

        });

    }

    add(type, title, message = "") {

        const notification = {

            id: crypto.randomUUID(),

            type,

            title,

            message,

            read: false,

            createdAt: new Date()

        };

        this.notifications.unshift(notification);

        this.notify();

        return notification;

    }

    success(title, message = "") {

        return this.add(

            "success",

            title,

            message

        );

    }

    info(title, message = "") {

        return this.add(

            "info",

            title,

            message

        );

    }

    warning(title, message = "") {

        return this.add(

            "warning",

            title,

            message

        );

    }

    error(title, message = "") {

        return this.add(

            "error",

            title,

            message

        );

    }

    all() {

        return [...this.notifications];

    }

    unread() {

        return this.notifications.filter(

            notification => !notification.read

        );

    }

    markAsRead(id) {

        const notification = this.notifications.find(

            item => item.id === id

        );

        if (notification) {

            notification.read = true;

            this.notify();

        }

    }

    remove(id) {

        this.notifications = this.notifications.filter(

            item => item.id !== id

        );

        this.notify();

    }

    clear() {

        this.notifications = [];

        this.notify();

    }

}

const Notification = new NotificationEngine();

export {

    Notification,

    NotificationEngine

};