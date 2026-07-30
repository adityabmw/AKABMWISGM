export function validateCustomer(data){

const errors=[];

if(!data.name?.trim())
errors.push("Nama wajib diisi");

if(!data.phone?.trim())
errors.push("Nomor HP wajib diisi");

if(data.email){

const email=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!email.test(data.email))
errors.push("Email tidak valid");

}

return{
valid:errors.length===0,
errors
};

}
