/**
 * AKA BMW ISGM
 * Enterprise Logger Manager
 * Version 1.0.0
 */

class LoggerManager {

    info(message, data = null) {
        console.log("[INFO]", message, data ?? "");
    }

    warn(message, data = null) {
        console.warn("[WARN]", message, data ?? "");
    }

    error(message, error = null) {
        console.error("[ERROR]", message, error ?? "");
    }

    success(message) {
        console.log("[SUCCESS]", message);
    }

    debug(message, data = null) {
        if (import.meta.env.DEV) {
            console.debug("[DEBUG]", message, data ?? "");
        }
    }

}

export default new LoggerManager();
