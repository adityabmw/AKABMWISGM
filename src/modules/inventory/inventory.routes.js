import { Router } from "../../core/router.js";
import { InventoryControllerInstance } from "./inventory.controller.js";
export const InventoryRoute = {
  register(){
    Router.register({ name: "inventory", render: ()=> {
      document.getElementById('app').innerHTML = `<div style="padding:20px"><h2>INVENTORY</h2><p>Route sesuai rute ISGM: Reception->Customers->Vehicles->WorkOrders->Inventory OK</p><div id="content"></div></div>`;
    }});
  }
};
export default InventoryRoute;
