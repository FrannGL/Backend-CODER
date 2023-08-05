import { Schema, model } from "mongoose";
import { generateCartId } from "../../utils/main.js";

const schema = new Schema({
	firstName: { type: String, required: false, max: 100 },
	lastName: { type: String, required: false, max: 100 },
	age: { type: Number, required: false },
	email: { type: String, required: true, max: 100, unique: true },
	password: { type: String, required: false, max: 100 },
	role: { type: String, required: false },
	cartID: {
		type: String,
		required: true,
		unique: true,
		default: () => generateCartId(),
	},
});

export const UsersMongoose = model("users", schema);
