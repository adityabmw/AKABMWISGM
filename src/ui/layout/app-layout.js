import { Sidebar } from "./sidebar.js";
import { Topbar } from "./topbar.js";

export function AppLayout(content){

return `

<div class="app-layout">

${Sidebar()}

<div class="main-content">

${Topbar()}

<div class="page-content">

${content}

</div>

</div>

</div>

`;

}
