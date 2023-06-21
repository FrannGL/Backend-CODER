import { CartsModel } from "../DAO/models/carts.models.js";

class CartService {
  async getAll() {
    const carts = await CartsModel.find({});
    return carts;
  }
  async create() {
    const newCart = await CartsModel.create({});
    console.log(newCart);
    return newCart;
  }
  async getOneCart(_id) {
    const getCartById = await CartsModel.findOne({ _id });
    return getCartById;
  }
  addProductToCart = async (cid, pid) => {
    const cart = await CartsModel.findById(cid);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const product = cart.products.find(
      (product) => product._id.toString() === pid
    );

    if (product) {
      product.quantity++;
    } else {
      cart.products.push({ _id: pid, quantity: 1 });
    }
    await cart.save();

    return cart;
  };
}

export const cartService = new CartService();
