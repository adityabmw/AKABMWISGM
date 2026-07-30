import Repository from "./workorder.repository.js";

class WorkOrderService{

async getAll(){
return Repository.getAll();
}

async get(id){
return Repository.get(id);
}

async create(data){

const now=new Date();

const no=`WO-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}-${Date.now().toString().slice(-6)}`;

return Repository.create({
...data,
workOrderNo:no,
status:"OPEN",
createdAt:now.toISOString()
});

}

async update(id,data){
return Repository.update(id,data);
}

async close(id){
return Repository.update(id,{
status:"FINISHED",
closedAt:new Date().toISOString()
});
}

async cancel(id){
return Repository.update(id,{
status:"CANCELLED"
});
}

}

export default new WorkOrderService();
