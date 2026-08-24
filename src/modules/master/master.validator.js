/**
 * Master Validator - Validasi minimum: code, name, category
 */
import { ALLOWED_CATEGORIES } from "./master.schema.js";
export class MasterValidator {
  static validate(data) {
    const errors = [];
    if (!data.code || String(data.code).trim().length < 2) errors.push("code wajib min 2 karakter");
    if (!data.name || String(data.name).trim().length < 2) errors.push("name wajib min 2 karakter");
    if (!data.category) errors.push("category wajib");
    else if (!ALLOWED_CATEGORIES.includes(String(data.category).toUpperCase())) errors.push(`category harus salah satu: ${ALLOWED_CATEGORIES.join(", ")}`);
    return { valid: errors.length === 0, errors };
  }
}
export const MasterValidation = MasterValidator;
export const MasterValidatorAPI = MasterValidator;
