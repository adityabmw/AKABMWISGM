export function calculateLabor(labor=[]){
return labor.reduce((t,l)=>t+(l.price||0),0);
}
