import MasterRepository from "./master.repository.js";

class MasterModel {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name || "";
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  static async find(subCollection) {
    return await MasterRepository.getAll(subCollection);
  }
}

export default MasterModel;
