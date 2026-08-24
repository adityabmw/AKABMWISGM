/**
 * AKA BMW ISGM - Master Module Barrel
 * Fixed: no bootstrap.js dependency
 */
export { MASTER_CATEGORY } from "./master.data.js";
export { MasterModel } from "./master.model.js";
export { MASTER_SCHEMA, ALLOWED_CATEGORIES } from "./master.schema.js";
export { MasterValidator, MasterValidation } from "./master.validator.js";
export { MasterRepository, MasterRepo } from "./master.repository.js";
export { MasterServices, MasterService } from "./master.service.js";
export { MasterControllerAPI, MasterController } from "./master.controller.js";
console.log("✅ Master Module loaded");
