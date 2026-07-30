export default class Knowledge{
constructor(data={}){
this.id=data.id||"";
this.title=data.title||"";
this.category=data.category||"";
this.vehicle=data.vehicle||"";
this.engine=data.engine||"";
this.content=data.content||"";
this.tags=data.tags||[];
this.createdAt=new Date().toISOString();
}
}
