export function attachCustomer(workOrder,customer){
return{
...workOrder,
customerId:customer.id,
customerName:customer.name,
customerPhone:customer.phone
};
}

export function attachVehicle(workOrder,vehicle){
return{
...workOrder,
vehicleId:vehicle.id,
plateNumber:vehicle.plateNumber,
vin:vehicle.vin,
model:vehicle.model,
engine:vehicle.engine
};
}
