import Controller from "./knowledge.controller.js";

class KnowledgeView{

render(){

const page=document.getElementById("knowledgePage");
if(!page) return;

const data=Controller.list();

page.innerHTML=`
<div class="container-fluid">

<h3 class="mb-3">
<i class="fa-solid fa-book"></i>
BMW Knowledge Base
</h3>

<input id="kbSearch"
class="form-control mb-3"
placeholder="Cari DTC, Engine, Wiring, TIS, ISTA..." />

<div id="kbList">

${data.map(x=>`
<div class="card mb-2">
<div class="card-body">
<h5>${x.title}</h5>
<small>${x.vehicle} | ${x.engine}</small>
<p class="mt-2">${x.content}</p>
</div>
</div>
`).join("")}

</div>

</div>`;
}

}

export default new KnowledgeView();
