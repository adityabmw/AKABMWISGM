import { calculateParts } from "./workorder.parts.js";
import { calculateLabor } from "./workorder.labor.js";

export function calculateTotal(parts,labor){
const partTotal=calculateParts(parts);
const laborTotal=calculateLabor(labor);
return{
partTotal,
laborTotal,
grandTotal:partTotal+laborTotal
};
}
