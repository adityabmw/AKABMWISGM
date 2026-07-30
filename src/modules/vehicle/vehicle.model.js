export default class Vehicle{

constructor(data={}){

Object.assign(this,{
id:"",
customerId:"",
plateNumber:"",
vin:"",
brand:"BMW",
model:"",
series:"",
engineCode:"",
engineNumber:"",
transmission:"",
fuelType:"",
productionYear:"",
color:"",
odometer:0,
serviceInterval:10000,
lastServiceDate:null,
nextServiceDate:null,
status:"ACTIVE",
notes:"",
createdBy:"",
updatedBy:"",
createdAt:"",
updatedAt:"",
active:true
},data);

}

toJSON(){
return {...this};
}

}
