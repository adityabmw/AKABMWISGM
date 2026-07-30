import Controller from "./wiring.controller.js";

class WiringView{

async render(){

const data=await Controller.load();

console.log("WIRING MODULE READY",data);

}

}

export default new WiringView();
