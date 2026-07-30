export const sortVehicle=data=>data.sort((a,b)=>(a.plateNumber||"").localeCompare(b.plateNumber||""));
