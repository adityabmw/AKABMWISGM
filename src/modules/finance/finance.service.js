import Repo from "./finance.repository.js";

class FinanceService{

getSummary(){

const income=Repo.getAll()
.filter(x=>x.type==="income")
.reduce((a,b)=>a+b.amount,0);

const expense=Repo.getAll()
.filter(x=>x.type==="expense")
.reduce((a,b)=>a+b.amount,0);

return{
income,
expense,
profit:income-expense
};

}

save(item){
return Repo.save(item);
}

}

export default new FinanceService();
