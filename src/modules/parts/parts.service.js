import PartsRepository from "./parts.repository.js";
import { BaseService } from "../../core/base.service.js";

class PartsService extends BaseService{

    constructor(){
        super(new PartsRepository());
    }

}

export default new PartsService();
