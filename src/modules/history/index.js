import { Router } from "../../core/router.js";
Router.register({ name: "history", render: ()=>{ document.getElementById('app').innerHTML = '<div style="padding:20px"><h2 style="color:#00b4d8">HISTORY</h2><p>Module history ready - sesuai rute ISGM. Build 51+ OK</p></div>'; } });
export function initHistory(){}
