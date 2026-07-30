export function nextService(vehicle){

const km=Number(vehicle.odometer||0)+Number(vehicle.serviceInterval||10000);

return{

nextKM:km,

nextServiceDate:vehicle.nextServiceDate

};

}
