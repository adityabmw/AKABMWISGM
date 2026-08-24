import { ETK } from "./etk.service.js";
export const ETKController = {
  async onSearchVIN(vin) {
    console.log(`🔍 ETK VIN: ${vin}`);
    return await ETK.searchVIN(vin);
  }
}
