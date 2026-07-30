class ModuleRegistry{

    constructor(){

        this.modules=new Map();

    }

    register(name,module){

        this.modules.set(name,module);

    }

    get(name){

        return this.modules.get(name);

    }

    all(){

        return [...this.modules.keys()];

    }

}

export const ModuleRegistry=new ModuleRegistry();
