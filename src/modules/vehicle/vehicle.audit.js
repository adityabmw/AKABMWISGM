export function createVehicleAudit(user){

const now=new Date().toISOString();

return{

createdBy:user,

updatedBy:user,

createdAt:now,

updatedAt:now,

active:true

};

}
