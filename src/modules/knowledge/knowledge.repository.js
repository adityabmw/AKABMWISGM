class KnowledgeRepository{

constructor(){
this.items=[];
}

getAll(){
return this.items;
}

search(keyword=""){
return this.items.filter(x=>
JSON.stringify(x).toLowerCase().includes(keyword.toLowerCase())
);
}

save(item){
this.items.push(item);
return item;
}

}

export default new KnowledgeRepository();
