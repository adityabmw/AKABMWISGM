import { BaseService } from "../../core/base.service.js";
import Repository from "./customer.repository.js";

class CustomerService extends BaseService{

    constructor(){

        super(Repository);

    }

}

export default new CustomerService();
