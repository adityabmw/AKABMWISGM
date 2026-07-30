import { BaseService } from "../../core/base.service.js";
import Repository from "./vehicle.repository.js";

class VehicleService extends BaseService{

    constructor(){

        super(Repository);

    }

}

export default new VehicleService();
