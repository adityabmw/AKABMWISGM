import { authListener } from "../modules/auth/auth.service.js";

export function sessionGuard(){

authListener((user)=>{

if(user){

console.log("Login :",user.email);

}else{

window.location.href="/login";

}

});

}
