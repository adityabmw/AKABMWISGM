import { WO_STATUS } from "./workorder.status.js";

export function completeWorkOrder(wo){
return{
...wo,
status:WO_STATUS.FINISHED,
completedAt:new Date().toISOString()
};
}
