export default class Finance{
constructor(data={}){
this.id=data.id||"";
this.date=data.date||new Date().toISOString();
this.type=data.type||"income";
this.category=data.category||"";
this.description=data.description||"";
this.amount=data.amount||0;
}
}
