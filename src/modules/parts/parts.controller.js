import PartsView from "./parts.view.js";
import partsService from "./parts.service.js";

export default class PartsController {

    constructor(){

        this.view = new PartsView();
        this.parts = [];

    }

    async init(){

        console.log("INIT PARTS");

        console.log("LOAD SERVICE");
        this.parts = await partsService.all();
        console.log("DATA",this.parts);
        console.log("TOTAL",this.parts?.length);

        console.log("PARTS LOADED", this.parts);

        return this;

    }

    async render(target){

        await this.init();

        const html = this.view.render(this.parts);

        document.querySelector(target).innerHTML = html;

        this.registerEvents();

    }

    registerEvents(){

        document.querySelectorAll(".part-detail").forEach(btn=>{

            btn.onclick=()=>{

                console.log("DETAIL",btn.dataset.id);

            };

        });

        
document.querySelectorAll(".part-edit").forEach(btn=>{

    btn.onclick=()=>{

        const id=btn.dataset.id;

        const part=this.parts.find(x=>String(x.id)===String(id));

        if(!part) return;

        import("../inventory/inventory.editor.js").then(({renderEditRow})=>{

            const row=document.querySelector(`tr[data-id="${id}"]`);

            if(!row) return;

            row.outerHTML=renderEditRow(part);

            setTimeout(()=>{

            const save=document.querySelector(".saveInventory");

            if(save){

                save.onclick=async()=>{

                    const data={

                        partNumber:document.querySelector("#partNumber").value,

                        name:document.querySelector("#name").value,

                        category:document.querySelector("#category").value,

                        stock:Number(document.querySelector("#stock").value),

                        price:Number(document.querySelector("#price").value)

                    };

                    await partsService.update(id,data);

                    await this.render(".main-content");

                };

            }

            },0);

        });

    };

});


        document.querySelectorAll(".part-copy").forEach(btn=>{

            btn.onclick=()=>{

                console.log("COPY",btn.dataset.id);

            };

        });

        document.querySelectorAll(".part-archive").forEach(btn=>{

            btn.onclick=()=>{

                console.log("ARCHIVE",btn.dataset.id);

            };

        });

    }

}
