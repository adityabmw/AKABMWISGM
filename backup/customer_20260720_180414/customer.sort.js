export const sortCustomer=(data)=>data.sort((a,b)=>(a.name||"").localeCompare(b.name||""));
