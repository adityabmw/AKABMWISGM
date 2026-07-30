export function delivery(data){

return{
...data,
delivered:true,
deliveredAt:new Date().toISOString()
};

}
