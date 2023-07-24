import { CartsMongoose } from "../DAO/models/mongoose/carts.mongoose.js";
import { ProductsMongoose } from "../DAO/models/mongoose/products.mongoose.js";

class CartService {
  async createOne(cartId) {
    const cartCreated = await CartsMongoose.create({ _id: cartId });
    return cartCreated;
  }

  async getAll() {
    const carts = await CartsMongoose.find({});
    return carts;
  }

  async getByRender(cartId) {
    const cart = await CartsMongoose.findById(cartId).populate(
      "products.product"
    );
    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await CartsMongoose.findById(cartId);
      const product = await ProductsMongoose.findById(productId);
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
      const cart = await CartsMongoose.findByIdAndUpdate(
        cartId,
        { products },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error("Error updating cart in database");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await CartsMongoose.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
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

  async removeProduct(cartId, productId) {
    try {
      const cart = await CartsMongoose.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
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

  async clearCart(cartId) {
    try {
      const cart = await CartsMongoose.findById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      throw new Error("Error clearing cart");
    }
  }
}

export const cartService = new CartService();
