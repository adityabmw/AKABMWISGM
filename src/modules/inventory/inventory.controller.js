export class InventoryController {
  constructor(){ console.log("InventoryController OK"); }
  async getAll(){ return []; }
}
export const InventoryControllerInstance = new InventoryController();
export default InventoryControllerInstance;
