export class Repository {
  constructor(colName){ this.colName=colName; }
  async getAll(){ return []; }
  async getById(id){ return null; }
  async create(d){ return {id:Date.now().toString(),...d}; }
  async update(id,d){ return d; }
  async delete(id){ return true; }
}
export default Repository;
