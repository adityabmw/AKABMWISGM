class FinanceRepository{

constructor(){
this.data=[];
}

getAll(){
return this.data;
}

save(item){
this.data.push(item);
return item;
}

}
export default new FinanceRepository();
