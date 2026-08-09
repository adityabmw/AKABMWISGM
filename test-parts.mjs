import "./src/config/firebase.config.js";
import partsService from "./src/modules/parts/parts.service.js";

try {
    const data = await partsService.all();
    console.log("TOTAL:", data.length);
    console.log(data.slice(0,3));
} catch(e) {
    console.error(e);
}
