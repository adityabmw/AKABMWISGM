// ==========================================================
// AKA BMW ISGM
// Cache Engine + Validation Utilities
// Enterprise v3.1.0
// ==========================================================

class CacheEngine {

    constructor() {

        this.storage = new Map();

    }

    set(key, value) {

        this.storage.set(key, value);

        return value;

    }

    get(key) {

        return this.storage.get(key);

    }

    has(key) {

        return this.storage.has(key);

    }

    remove(key) {

        this.storage.delete(key);

    }

    clear() {

        this.storage.clear();

    }

}

const Cache = new CacheEngine();

export {

    Cache,

    CacheEngine

};

// ============================================================
// VALIDATION UTILITIES (dipertahankan agar kompatibel)
// ============================================================

export function validateEmail(email) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone) {
    if (!phone) return false;
    const cleaned = phone.replace(/[^0-9]/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
}

export function validatePlate(plate) {
    if (!plate) return false;
    return /^[A-Z]{1,2}[0-9]{1,4}[A-Z]{1,2}$/
        .test(plate.replace(/\s/g, "").toUpperCase());
}

export function validateVIN(vin) {
    if (!vin) return false;
    return /^[A-HJ-NPR-Z0-9]{17}$/
        .test(vin.replace(/\s/g, "").toUpperCase());
}

export function validateRequired(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
}

export function validateMinLength(value, min) {
    return String(value ?? "").length >= min;
}

export function validateMaxLength(value, max) {
    return String(value ?? "").length <= max;
}

export function validateNumberRange(value, min, max) {
    const n = Number(value);
    return !isNaN(n) && n >= min && n <= max;
}

export function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export function validateDate(date) {
    return !isNaN(new Date(date).getTime());
}

export function validateAlphanumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value ?? "");
}

export function validatePasswordMatch(password, confirmPassword) {
    return password === confirmPassword &&
           String(password).length >= 6;
}

export function validateYear(year) {
    const n = Number(year);
    const current = new Date().getFullYear();
    return !isNaN(n) && n >= 1900 && n <= current + 1;
}

export function validateCurrency(value) {
    const n = Number(value);
    return !isNaN(n) && n >= 0;
}

export function sanitizeInput(value) {

    if (typeof value !== "string") return value;

    return value
        .trim()
        .replace(/[<>]/g, "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

}

export function sanitizeObject(obj) {

    const output = {};

    for (const [k, v] of Object.entries(obj)) {

        output[k] =
            typeof v === "object" && v !== null
                ? sanitizeObject(v)
                : sanitizeInput(v);

    }

    return output;

}