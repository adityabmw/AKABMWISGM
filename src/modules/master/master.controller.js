/**
 * Master Controller
 */
import { MasterServices } from "./master.service.js";

export const MasterControllerAPI = {
  create: (data) => MasterServices.create(data),
  update: (id, data) => MasterServices.update(id, data),
  delete: (id) => MasterServices.delete(id),
  list: () => MasterServices.list(),
  get: (id) => MasterServices.get(id),
  seed: async () => {
    const { seedMaster } = await import("./master.seed.js");
    return seedMaster();
  }
};
export const MasterController = MasterControllerAPI;
