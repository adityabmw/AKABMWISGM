export function workOrderMetrics(data=[]){
return{
total:data.length,
finished:data.filter(x=>x.status==="FINISHED").length
};
}
