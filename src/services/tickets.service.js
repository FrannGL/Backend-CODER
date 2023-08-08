import { cartService } from "./carts.service.js";
import importModels from "../DAO/factory.js";

const models = await importModels();
const ticketsModel = models.tickets;
const productsModel = models.products;

class TicketService {
	async read(tid) {
		try {
			const ticket = await ticketsModel.read(tid);
			return ticket;
		} catch (e) {
			console.log(e);
		}
	}

	async create(purchase, products) {
		try {
			const stockCheckResult = await this.verifyStock(products);
			const cartid = await cartService.readById(purchase.cartId);
			if (stockCheckResult) {
				purchase.products = cartid.products;
				const newTicket = await ticketsModel.create(purchase);
				await cartService.emptyCart(purchase.cartId);

				return newTicket;
			} else {
				console.log("No se pudo crear el ticket debido a la falta de stock");
			}
		} catch (e) {
			console.log(e);
		}
	}

	async verifyStock(products) {
		try {
			for (const productData of products) {
				const productId = productData.product.toString();
				const product = await productsModel.readById(productId);
				if (product.stock >= productData.quantity) {
					product.stock = product.stock - 1;
					await product.save();
					console.log("Stock descontado correctamente. El Stock actual es de: ", product.stock);
				} else {
					console.log(`No hay suficiente stock para el producto ${productId}`);
					return false;
				}
				return true;
			}
		} catch (error) {
			console.log(error);
		}
	}
}

export const ticketService = new TicketService();
