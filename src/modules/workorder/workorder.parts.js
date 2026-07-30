export function calculateParts(parts=[]){
return parts.reduce((t,p)=>t+((p.qty||0)*(p.price||0)),0);
}
