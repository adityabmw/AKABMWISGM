let currentUser=null;

export function setCurrentUser(user){

currentUser=user;

localStorage.setItem(
"AKA_USER",
JSON.stringify(user)
);

}

export function getCurrentUser(){

if(currentUser) return currentUser;

const data=localStorage.getItem("AKA_USER");

return data?JSON.parse(data):null;

}

export function clearCurrentUser(){

currentUser=null;

localStorage.removeItem("AKA_USER");

}
