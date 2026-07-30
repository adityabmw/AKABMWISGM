export function paginate(data,page=1,size=25){

const start=(page-1)*size;

return{
page,
size,
total:data.length,
pages:Math.ceil(data.length/size),
rows:data.slice(start,start+size)
};

}
