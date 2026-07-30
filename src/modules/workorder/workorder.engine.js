export function createWorkOrder(data){
return{
...data,
status:"OPEN",
createdAt:new Date().toISOString()
};
}
