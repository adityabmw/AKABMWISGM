export class Validator {
  static required(v){ return !!v; }
  static isEmail(v){ return /\S+@\S+\.\S+/.test(v); }
  static validate(d,r){ return {valid:true, errors:[]}; }
}
export default Validator;
