/**
 * Master Service - Implements logic for controller
 * Controller -> Service -> Validator -> Repository
 */
import { MasterRepo } from "./master.repository.js";
import { MasterValidator } from "./master.validator.js";
import { MasterModel } from "./master.model.js";

class MasterServiceClass {
  async list() { return await MasterRepo.list(); }
  async get(id) { return await MasterRepo.getById(id); }
  async create(raw) {
    const v = MasterValidator.validate(raw);
    if (!v.valid) throw new Error(v.errors.join(", "));
    const exists = await MasterRepo.findByCodeAndCategory(raw.code.toUpperCase(), raw.category.toUpperCase());
    if (exists) throw new Error(`Duplicate code ${raw.code} in category ${raw.category}`);
    const model = new MasterModel(raw);
    return await MasterRepo.create(model.toFirestore());
  }
  async update(id, raw) {
    const v = MasterValidator.validate(raw);
    if (!v.valid) throw new Error(v.errors.join(", "));
    return await MasterRepo.update(id, raw);
  }
  async delete(id) { return await MasterRepo.delete(id); }
  async all() { return this.list(); }
}
export const MasterServices = new MasterServiceClass();
export const MasterService = MasterServices;
