import { Schema, model } from "mongoose";

const schema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

export const ProductsModel = model("products", schema);
