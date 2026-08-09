import { Auth } from "./src/config/firebase.config.js";

console.log("CURRENT USER:", Auth.currentUser);

if (Auth.currentUser) {
  console.log("UID   :", Auth.currentUser.uid);
  console.log("EMAIL :", Auth.currentUser.email);
} else {
  console.log("BELUM LOGIN KE FIREBASE");
}
