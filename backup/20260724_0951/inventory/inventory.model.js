export default class InventoryItem{
constructor(data={}){
this.id=data.id||"";
this.partNumber=data.partNumber||"";
this.partName=data.partName||"";
this.category=data.category||"";
this.stock=data.stock||0;
this.minStock=data.minStock||0;
this.price=data.price||0;
this.location=data.location||"";
}
}
