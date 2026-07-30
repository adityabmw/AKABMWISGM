import { DB } from "../../config/firebase.config.js";
import { collection, getDocs } from "firebase/firestore";

class DashboardService{

async count(name){
const snap=await getDocs(collection(DB,name));
return snap.size;
}

async summary(){

const [
customers,
vehicles,
workorders,
invoices
]=await Promise.all([
this.count("customers"),
this.count("vehicles"),
this.count("workorders"),
this.count("invoices")
]);

return{
customers,
vehicles,
workorders,
invoices
};

}

}

export default new DashboardService();
