import { login } from "./auth.service.js";

const form=document.getElementById("loginForm");

if(form){

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

try{

await login(email,password);

window.location.href="/";

}catch(err){

alert(err.message);

}

});

}
