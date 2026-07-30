export function validateVehicle(data){

const errors=[];

if(!data.customerId)
errors.push("Customer wajib dipilih");

if(!data.plateNumber?.trim())
errors.push("Nomor polisi wajib diisi");

if(!data.vin?.trim())
errors.push("VIN wajib diisi");

if(data.vin && data.vin.length!==17)
errors.push("VIN harus 17 karakter");

return{
valid:errors.length===0,
errors
};

}
