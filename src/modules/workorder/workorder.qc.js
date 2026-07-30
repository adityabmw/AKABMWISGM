export function qualityCheck(data){

return{
checked:true,
checkedAt:new Date().toISOString(),
remarks:data.remarks||"OK"
};

}
