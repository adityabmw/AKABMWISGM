/**
 * AKA BMW ISGM
 * Enterprise Session Manager
 * Version : 1.0.0
 */

class SessionManager {
    constructor() {
        this.KEY = "AKABMW_SESSION";
    }

    save(user) {
        localStorage.setItem(this.KEY, JSON.stringify({
            uid: user.uid,
            email: user.email,
            role: user.role,
            displayName: user.displayName || "",
            loginAt: new Date().toISOString()
        }));
    }

    get() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : null;
    }

    isLoggedIn() {
        return this.get() !== null;
    }

    getRole() {
        return this.get()?.role || null;
    }

    clear() {
        localStorage.removeItem(this.KEY);
    }
}

export default new SessionManager();
