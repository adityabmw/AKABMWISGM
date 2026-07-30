export function Topbar(){

return `

<header class="topbar">

<div class="topbar-left">

<button id="sidebarToggle">

<span class="material-symbols-rounded">
menu
</span>

</button>

<input
type="text"
placeholder="Cari Customer, VIN, No Polisi, WO, Invoice..."
class="global-search">

</div>

<div class="topbar-right">

<button class="icon-btn">

<span class="material-symbols-rounded">
notifications
</span>

<span class="badge">3</span>

</button>

<button class="icon-btn">

<span class="material-symbols-rounded">
mail
</span>

</button>

<div class="user-profile">

<img src="/src/assets/images/avatar.png">

<div>

<b>Pak Adit</b>

<small>Owner</small>

</div>

</div>

</div>

</header>

`;

}
