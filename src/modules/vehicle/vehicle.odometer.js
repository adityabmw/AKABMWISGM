export function updateOdometer(vehicle,newKM){

return{

...vehicle,

odometer:Number(newKM)

};

}
