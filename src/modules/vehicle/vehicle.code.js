export function generateVehicleCode(last=1){

const d=new Date();

return `VEH-${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}-${String(last).padStart(6,"0")}`;

}
