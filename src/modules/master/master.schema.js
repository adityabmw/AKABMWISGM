// AKA BMW ISGM - Data Validation Schema
export const MasterSchema = {
  services: {
    name: "string",
    price: "number",
    category: "string"
  },
  parts: {
    partNumber: "string",
    name: "string",
    stock: "number",
    price: "number"
  }
};
