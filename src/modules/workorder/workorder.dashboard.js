export function dashboardSummary(list=[]){
return{
open:list.filter(x=>x.status==="OPEN").length,
repair:list.filter(x=>x.status==="REPAIR").length,
finished:list.filter(x=>x.status==="FINISHED").length
};
}
