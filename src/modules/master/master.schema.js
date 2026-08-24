import { MASTER_CATEGORY } from "./master.data.js";
export const MASTER_SCHEMA = Object.freeze({
  code: { required: true, type: "string", min: 2 },
  name: { required: true, type: "string", min: 2 },
  category: { required: true, enum: Object.values(MASTER_CATEGORY) },
  status: { enum: ["ACTIVE","INACTIVE"] }
});
export const ALLOWED_CATEGORIES = Object.values(MASTER_CATEGORY);
