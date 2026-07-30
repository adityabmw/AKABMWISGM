export function customerActivity(action,customer){
return{
time:new Date().toISOString(),
action,
customer
};
}
