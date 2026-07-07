import { router } from "./core/router.js";
import { Dashboard } from "./ui/pages/dashboard.js";

router.register("/",Dashboard);

window.addEventListener("DOMContentLoaded",()=>{

router.go("/");

});
