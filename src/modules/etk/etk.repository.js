class ETKRepository{

getLinks(vin=""){
return{
realoem:`https://www.realoem.com/bmw/en/select?vin=${vin}`,
bimmercat:`https://bimmercat.com/bmw/vin/decoder/${vin}`,
bmwfans:`https://bmwfans.info/parts-catalog/${vin}`
};
}

}

export default new ETKRepository();
