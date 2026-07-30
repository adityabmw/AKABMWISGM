import { Container } from "../core/container.js";

const services = import.meta.glob("../modules/**/*.service.js", {
    eager: true
});

Object.entries(services).forEach(([path, mod]) => {

    const file = path.split("/").pop().replace(".service.js","");

    const service = mod.default;

    if(service){

        Container.register(file, service);

    }

});

console.log("Registered Services:", Container.all());

export default Container;
