export default class CustomError extends Error {
	constructor({ name = "Error", cause, message, code }) {
		super(message);
		this.name = name;
		this.code = code;
		this.cause = cause;
	}
}
