export function customerVehicles(customerId,vehicles=[]){
return vehicles.filter(v=>v.customerId===customerId);
}
