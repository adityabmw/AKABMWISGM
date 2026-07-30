import Service from "./customer.service.js";

class CustomerController{

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

remove(id){
return Service.delete(id);
}

}

export default new CustomerController();
