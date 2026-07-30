export function searchVehicle(rows=[],keyword=""){

keyword=keyword.toLowerCase();

return rows.filter(v=>

(v.plateNumber||"").toLowerCase().includes(keyword)||

(v.vin||"").toLowerCase().includes(keyword)||

(v.model||"").toLowerCase().includes(keyword)||

(v.engineCode||"").toLowerCase().includes(keyword)

);

}
