import TicketsDTO from "./DTO/tickets.dto.js";
import { ticketService } from "../services/tickets.service.js";
import { cartService } from "../services/carts.service.js";

class TicketsController {
	async read(req, res) {
		try {
			const { tid } = req.params;
			const ticket = await ticketService.read(tid);
			const cartid = ticket.cartId;
			const products = await cartService.readById(cartid);
			return res.status(201).json({
				status: "success",
				msg: "Detalles del ticket",
				payload: {
					id: ticket._id,
					code: ticket.code,
					dateTime: ticket.purchase_datetime,
					user: ticket.purchaser,
					cartId: ticket.cartId,
					products: products.products,
					totalPurchase: ticket.amount,
				},
			});
		} catch (e) {
			console.log(e);
			res.status(500).json({ error: "Error en el servidor" });
		}
	}

	async readByRender(req, res) {
		try {
			const user = req.session.user;
			const cart = await cartService.readById(user.cartId);
			const tickets = await ticketService.readAll(cart._id);

			const formattedTickets = await ticketService.readByRender(tickets);

			const title = "Listado de compras realizadas";
			res.status(200).render("purchases", {
				user,
				title,
				formattedTickets,
			});
		} catch (e) {
			console.log(e);
		}
	}

	async create(req, res) {
		try {
			const user = req.session.user;
			const { usuario, cart_id, total } = req.body.cartData;
			const purchase = new TicketsDTO({
				usuario,
				cart_id,
				total,
			});

			const cartData = await cartService.readById(cart_id);
			console.log(cartData.products);
			const newTicket = await ticketService.create(purchase, cartData.products, user);
			return res.status(201).json({
				status: "success",
				msg: "Producto Creado",
				payload: {
					newTicket,
				},
			});
		} catch (e) {
			console.log(e);
			res.status(500).json({ error: "Error en el servidor" });
		}
	}
}

export const ticketsController = new TicketsController();
