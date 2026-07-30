import Service from "./customer.service.js";

class CustomerController{

load(){
return Service.getAll();
}

detail(id){
return Service.get(id);
}

save(data){
return Service.create(data);
}

edit(id,data){
return Service.update(id,data);
}

remove(id){
return Service.delete(id);
}

}

export default new CustomerController();
