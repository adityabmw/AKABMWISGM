import MasterRepository from "./master.repository.js";
export async function getJasaList() { return await MasterRepository.getAll("services"); }
export async function getSparepartList() { return await MasterRepository.getAll("parts"); }
export default { getJasaList, getSparepartList };
