import { CartsModel } from "../DAO/models/carts.models.js";
import { ProductsModel } from "../DAO/models/products.model.js";

class CartsService {
  async getAll() {
    const data = await CartsModel.find();
  }

  async getAllById(id) {
    let cartFound = CartsModel.find((prod) => +prod.id === +id);
    if (cartFound) {
      return cartFound;
    } else {
      return console.log("Not Found");
    }
  }

  async create() {
    const cartId = req.params.cid;
    const prodId = req.params.pid;

    const carts = await CartsModel.getAll();
    const products = await ProductsModel.getAll();

    const cartExist = carts.find((cart) => cart.id === +cartId);
    const productExist = products.find((prod) => prod.id === +prodId);

    if (!productExist || !cartExist) {
      throw new Error("Carrito o Producto no existente");
    }

    if (cartExist) {
      const existingProduct = cartExist.products.find(
        (prod) => prod.idProduct === +prodId
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cartExist.products.push({ idProduct: +prodId, quantity: 1 });
      }
    } else {
      const newCart = {
        id: +cartId,
        products: [{ idProduct: +prodId, quantity: 1 }],
      };
      carts.push(newCart);
    }
  }
}

export const cartsServices = new CartsService();
