import { customAlphabet } from "nanoid";

export function generateCartId() {
	const nanoid = customAlphabet(
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
		25
	);
	return nanoid();
}
