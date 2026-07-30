export function createAudit(user="SYSTEM"){
const now=new Date().toISOString();
return{
createdBy:user,
updatedBy:user,
createdAt:now,
updatedAt:now,
active:true
};
}
