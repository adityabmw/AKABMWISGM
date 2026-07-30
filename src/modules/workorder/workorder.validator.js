export function validateWorkOrder(data){
const errors=[];
if(!data.customerId) errors.push("Customer wajib dipilih");
if(!data.vehicleId) errors.push("Kendaraan wajib dipilih");
if(!data.complaint) errors.push("Keluhan wajib diisi");
return errors;
}
