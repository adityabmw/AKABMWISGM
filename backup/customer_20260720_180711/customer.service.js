import Repository from "./customer.repository.js";
import {validateCustomer} from "./customer.validator.js";

class CustomerService{

async getAll(){
return Repository.getAll();
}

async get(id){
return Repository.get(id);
}

async create(data){

const check=validateCustomer(data);

if(!check.valid)
throw new Error(check.errors.join(", "));

return Repository.create(data);

}

async update(id,data){

const check=validateCustomer(data);

if(!check.valid)
throw new Error(check.errors.join(", "));

return Repository.update(id,data);

}

async delete(id){
return Repository.delete(id);
}

}

export default new CustomerService();
