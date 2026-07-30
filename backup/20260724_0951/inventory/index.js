import inventoryController from "./inventory.controller.js";
import { setupInventoryEvents } from "./inventory.events.js";

export default {

async init(){

await inventoryController.init();

setupInventoryEvents();

}

};
