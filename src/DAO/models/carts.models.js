import { Schema, model } from "mongoose";

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 200 },
  price: { type: String, required: true, max: 100 },
  thumbnail: { type: String, required: true, max: 200 },
  code: { type: String, required: true, max: 10 },
  stock: { type: String, required: true, max: 10 },
});

export const CartsModel = model("carts", schema);
