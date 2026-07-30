import Controller from "./tis.controller.js";

class TisView{

async render(){

const data=await Controller.load();

console.log("TIS MODULE READY",data);

}

}

export default new TisView();
