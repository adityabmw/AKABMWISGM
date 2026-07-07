export function DashboardCard(title,value,icon){

return`

<div class="dashboard-card">

<div>

<h5>${title}</h5>

<h2>${value}</h2>

</div>

<span class="material-symbols-rounded">

${icon}

</span>

</div>

`;

}
