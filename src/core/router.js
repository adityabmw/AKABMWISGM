class Router{

constructor(){

this.routes={};

}

register(path,page){

this.routes[path]=page;

}

go(path){

const app=document.getElementById("app");

if(!app) return;

app.innerHTML=this.routes[path]();

history.pushState({},'',path);

}

}

export const router=new Router();
