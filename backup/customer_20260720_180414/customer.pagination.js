export function paginate(data,page=1,limit=25){

const start=(page-1)*limit;

return{

page,

limit,

total:data.length,

pages:Math.ceil(data.length/limit),

rows:data.slice(start,start+limit)

};

}
