import Service from "./workorder.service.js";

class WorkOrderController{

all(){
return Service.getAll();
}

detail(id){
return Service.get(id);
}

save(data){
return Service.create(data);
}

update(id,data){
return Service.update(id,data);
}

finish(id){
return Service.close(id);
}

cancel(id){
return Service.cancel(id);
}

}

export default new WorkOrderController();
