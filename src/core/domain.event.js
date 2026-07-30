export class DomainEvent {

    constructor(){
        this.listeners = new Map();
    }

    subscribe(event, callback){

        if(!this.listeners.has(event)){
            this.listeners.set(event, []);
        }

        this.listeners.get(event).push(callback);

    }

    publish(event, payload={}){

        if(!this.listeners.has(event)) return;

        this.listeners.get(event).forEach(fn=>fn(payload));

    }

    clear(){

        this.listeners.clear();

    }

}

export const DomainEvents=new DomainEvent();

export default DomainEvents;
