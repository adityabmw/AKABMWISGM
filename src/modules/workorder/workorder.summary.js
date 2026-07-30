import { calculateTotal } from "./workorder.total.js";

export function buildSummary(workOrder){

const total=calculateTotal(
workOrder.parts||[],
workOrder.labor||[]
);

return{
workOrderNo:workOrder.workOrderNo,
customer:workOrder.customerName,
vehicle:workOrder.plateNumber,
status:workOrder.status,
...total
};

}
