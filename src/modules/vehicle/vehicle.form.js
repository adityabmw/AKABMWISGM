import Controller from "./vehicle.controller.js";
import View from "./vehicle.view.js";

class VehicleForm{

bind(){

const form=document.getElementById("vehicleForm");

if(!form) return;

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const data={

customerId:document.getElementById("vehicleCustomer")?.value||"",
plateNumber:document.getElementById("plateNumber")?.value.trim()||"",
vin:document.getElementById("vin")?.value.trim().toUpperCase()||"",
brand:document.getElementById("brand")?.value.trim()||"BMW",
model:document.getElementById("model")?.value.trim()||"",
engine:document.getElementById("engine")?.value.trim()||"",
year:Number(document.getElementById("year")?.value)||0,
color:document.getElementById("color")?.value.trim()||"",
odometer:Number(document.getElementById("odometer")?.value)||0

};

await Controller.save(data);

form.reset();

await View.refresh();

alert("Vehicle berhasil disimpan.");

});

}

async delete(id){

if(!confirm("Hapus kendaraan ini?")) return;

await Controller.remove(id);

await View.refresh();

}

}

export default new VehicleForm();
