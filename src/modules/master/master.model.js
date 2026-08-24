/**
 * Master Model - Contract minimum: code, name, category
 */
export class MasterModel {
  constructor({ code, name, category, description = "", status = "ACTIVE", metadata = {} }) {
    this.code = String(code || "").trim().toUpperCase();
    this.name = String(name || "").trim();
    this.category = String(category || "").trim().toUpperCase();
    this.description = description;
    this.status = status;
    this.metadata = metadata;
    this.createdAt = new Date().toISOString();
    this.updatedAt = this.createdAt;
  }
  toFirestore() {
    return {...this };
  }
}
