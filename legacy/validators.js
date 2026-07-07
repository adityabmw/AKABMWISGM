// ============================================================
// AKA BMW ISGM — VALIDATION UTILITIES
// Sprint 4: Input Validation
// ============================================================

// ============================================================
// 1. EMAIL VALIDATION
// ============================================================
export function validateEmail(email) {
  if (!email) return false;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.trim());
}

// ============================================================
// 2. PHONE VALIDATION
// ============================================================
export function validatePhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

// ============================================================
// 3. PLATE VALIDATION
// ============================================================
export function validatePlate(plate) {
  if (!plate) return false;
  const cleaned = plate.replace(/\s/g, '').toUpperCase();
  const pattern = /^[A-Z]{1,2}[0-9]{1,4}[A-Z]{1,2}$/;
  return pattern.test(cleaned);
}

// ============================================================
// 4. VIN VALIDATION
// ============================================================
export function validateVIN(vin) {
  if (!vin) return false;
  const cleaned = vin.replace(/\s/g, '').toUpperCase();
  const pattern = /^[A-HJ-NPR-Z0-9]{17}$/;
  return pattern.test(cleaned);
}

// ============================================================
// 5. REQUIRED VALIDATION
// ============================================================
export function validateRequired(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return true;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

// ============================================================
// 6. MIN LENGTH VALIDATION
// ============================================================
export function validateMinLength(value, min) {
  if (!value) return false;
  return String(value).length >= min;
}

// ============================================================
// 7. MAX LENGTH VALIDATION
// ============================================================
export function validateMaxLength(value, max) {
  if (!value) return true;
  return String(value).length <= max;
}

// ============================================================
// 8. NUMBER RANGE VALIDATION
// ============================================================
export function validateNumberRange(value, min, max) {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
}

// ============================================================
// 9. URL VALIDATION
// ============================================================
export function validateURL(url) {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============================================================
// 10. DATE VALIDATION
// ============================================================
export function validateDate(date) {
  if (!date) return false;
  const d = new Date(date);
  return !isNaN(d.getTime());
}

// ============================================================
// 11. ALPHANUMERIC VALIDATION
// ============================================================
export function validateAlphanumeric(value) {
  if (!value) return false;
  return /^[a-zA-Z0-9]+$/.test(value);
}

// ============================================================
// 12. CONFIRM PASSWORD VALIDATION
// ============================================================
export function validatePasswordMatch(password, confirmPassword) {
  return password === confirmPassword && password.length >= 6;
}

// ============================================================
// 13. VEHICLE YEAR VALIDATION
// ============================================================
export function validateYear(year) {
  const num = Number(year);
  if (isNaN(num)) return false;
  const currentYear = new Date().getFullYear();
  return num >= 1900 && num <= currentYear + 1;
}

// ============================================================
// 14. CURRENCY VALIDATION
// ============================================================
export function validateCurrency(value) {
  const num = Number(value);
  return !isNaN(num) && num >= 0;
}

// ============================================================
// 15. VALIDATE OBJECT
// ============================================================
export function validateObject(obj, rules) {
  const errors = {};

  for (const [key, validators] of Object.entries(rules)) {
    const value = obj[key];
    const fieldErrors = [];

    for (const validator of validators) {
      const result = validator(value);
      if (result !== true) {
        fieldErrors.push(result);
      }
    }

    if (fieldErrors.length > 0) {
      errors[key] = fieldErrors;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: errors
  };
}

// ============================================================
// 16. COMMON VALIDATION RULES
// ============================================================
export const validators = {
  email: (value) => validateEmail(value) || 'Email tidak valid',
  phone: (value) => validatePhone(value) || 'Nomor HP tidak valid (10-15 digit)',
  plate: (value) => validatePlate(value) || 'Plat tidak valid (contoh: B 1234 XYZ)',
  vin: (value) => validateVIN(value) || 'VIN tidak valid (17 karakter)',
  required: (value) => validateRequired(value) || 'Field wajib diisi',
  minLength: (min) => (value) => validateMinLength(value, min) || `Minimal ${min} karakter`,
  maxLength: (max) => (value) => validateMaxLength(value, max) || `Maksimal ${max} karakter`,
  number: (value) => !isNaN(Number(value)) || 'Harus berupa angka',
  positive: (value) => Number(value) > 0 || 'Harus lebih dari 0',
  year: (value) => validateYear(value) || 'Tahun tidak valid (1900-sekarang)'
};

// ============================================================
// 17. CREATE VALIDATOR FUNCTION
// ============================================================
export function createValidator(rules) {
  return (data) => {
    const result = validateObject(data, rules);
    if (!result.valid) {
      const messages = [];
      for (const [key, errors] of Object.entries(result.errors)) {
        messages.push(`${key}: ${errors.join(', ')}`);
      }
      return {
        valid: false,
        errors: result.errors,
        message: messages.join('; ')
      };
    }
    return { valid: true, errors: {}, message: null };
  };
}

// ============================================================
// 18. SANITIZE INPUT
// ============================================================
export function sanitizeInput(value) {
  if (typeof value === 'string') {
    return value
      .trim()
      .replace(/[<>]/g, '') // Remove < and >
      .replace(/[&]/g, '&amp;')
      .replace(/["]/g, '&quot;')
      .replace(/[']/g, '&#39;');
  }
  return value;
}

// ============================================================
// 19. SANITIZE OBJECT
// ============================================================
export function sanitizeObject(obj) {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}