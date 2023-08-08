import { TicketsMongoose } from "../ticket.mongoose.js";

class TicketsModel {
	async read(tid) {
		try {
			const ticket = await TicketsMongoose.findById(tid);
			return ticket;
		} catch (e) {
			console.log(e);
		}
	}

	async create(purchase) {
		try {
			const newTicket = await TicketsMongoose.create(purchase);
			return newTicket;
		} catch (e) {
			console.log(e);
		}
	}
}

export const ticketsModel = new TicketsModel();
