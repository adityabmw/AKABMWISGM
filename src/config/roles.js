import Rbac from "../core/rbac.js";

Rbac.register("owner",["*"]);

Rbac.register("administrator",[
"customer.*",
"vehicle.*",
"booking.*",
"workorder.*",
"inventory.*",
"finance.*",
"invoice.*",
"reports.*"
]);

Rbac.register("serviceadvisor",[
"customer.*",
"vehicle.*",
"booking.*",
"workorder.create",
"workorder.read",
"invoice.read"
]);

Rbac.register("headmechanic",[
"workorder.*",
"inspection.*",
"vehicle.read"
]);

Rbac.register("mechanic",[
"workorder.read",
"workorder.update",
"inspection.*"
]);

Rbac.register("cashier",[
"invoice.*",
"payment.*",
"pos.*"
]);

Rbac.register("inventory",[
"inventory.*",
"supplier.*",
"parts.*"
]);

export default Rbac;
