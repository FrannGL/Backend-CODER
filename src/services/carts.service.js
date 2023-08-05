import importModels from "../DAO/factory.js";

const models = await importModels();
const productsModel = models.products;
const cartsModel = models.carts;

class CartService {
	async read() {
		const carts = await cartsModel.read();
		return carts;
	}

	async readById(_id) {
		try {
			const productById = await cartsModel.readById(_id);
			return productById;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	async readByRender(cartId) {
		const cart = await cartsModel.readByRender(cartId);
		if (!cart) {
			throw new Error("Cart not found");
		}
		return cart;
	}

	// SE CREA EL CARRITO CUANDO SE REGISTRA EL USUARIO
	async createCart(cartId) {
		const cartCreated = await cartsModel.createCart({ _id: cartId });
		return cartCreated;
	}

	async addProduct(cartId, productId) {
		try {
			const cart = await cartsModel.readById(cartId);
			const product = await productsModel.readById(productId);
			if (!cart) {
				throw new Error("Cart not found");
			}
			if (!product) {
				throw new Error("Product not found");
			}
			cart.products.push({ product: product._id, quantity: 1 });
			await cart.save();
			return cart;
		} catch (error) {
			throw error;
		}
	}

	async updateCart(cartId, products) {
		try {
			const cart = await cartsModel.updateCart(cartId, products);
			return cart;
		} catch (error) {
			throw new Error("Error updating cart in database");
		}
	}

	async updateProductQuantity(cartId, productId, quantity) {
		try {
			const cart = await cartsModel.readById(cartId);
			const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
			if (productIndex === -1) {
				throw new Error("Product not found in cart");
			}
			cart.products[productIndex].quantity = quantity;
			await cart.save();
			return cart;
		} catch (error) {
			throw new Error("Error updating product quantity in cart");
		}
	}

	async emptyCart(cartId) {
		try {
			const cart = await cartsModel.readById(cartId);
			cart.products = [];
			await cart.save();
		} catch (error) {
			throw new Error("Error clearing cart");
		}
	}

	async deleteProduct(cartId, productId) {
		try {
			const cart = await cartsModel.readById(cartId);
			const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
			if (productIndex === -1) {
				throw new Error("Product not found in cart");
			}
			cart.products.splice(productIndex, 1);
			await cart.save();
			return cart;
		} catch (error) {
			throw new Error("Error removing product from cart");
		}
	}
}

export const cartService = new CartService();
