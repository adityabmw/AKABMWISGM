import sessionManager from "../../core/session/session.manager.js";

export function getActiveSession() {
    return sessionManager.getCurrentSession();
}

export function destroySession() {
    sessionManager.clear();
    window.location.href = "/src/ui/pages/login.html";
}

export default {
    getActiveSession,
    destroySession
};
