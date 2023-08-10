import { TicketsMongoose } from "../mongo/models/ticket.mongoose.js";

class TicketsModel {
  async readById(code) {
    try {
      const ticket = await TicketsMongoose.findOne({ code });
      return ticket;
    } catch (e) {
      console.log(e);
    }
  }

  async readAll(cartId) {
    try {
      const tickets = await TicketsMongoose.find({ cartId });
      return tickets;
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
