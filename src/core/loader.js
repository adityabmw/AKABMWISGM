// ==========================================================
// AKA BMW ISGM
// Loader Engine
// Enterprise v3.1.0
// ==========================================================

import { Logger } from "./logger.js";

class LoaderEngine {
 constructor(){this.loaded=false;}
 async initialize(){Logger.info("Loader Initializing...");this.loaded=true;Logger.success("Loader Ready.");return true;}
 isReady(){return this.loaded;}
 reset(){this.loaded=false;}
}
const Loader=new LoaderEngine();
export { Loader, LoaderEngine };
