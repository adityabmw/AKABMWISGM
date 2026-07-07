import { getCurrentUser } from "../../core/user-session.js";

export function redirectDashboard(){

const user=getCurrentUser();

if(!user){

location.href="/login";

return;

}

switch(user.role){

case "OWNER":

location.href="/owner";

break;

case "SERVICE_ADVISOR":

location.href="/reception";

break;

case "MECHANIC":

location.href="/workorder";

break;

case "CASHIER":

location.href="/cashier";

break;

default:

location.href="/";

}

}
