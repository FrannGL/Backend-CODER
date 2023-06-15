import { ProductsModel } from "../DAO/models/products.model.js";

class ProductService {
  async getAll() {
    const products = await ProductsModel.find({});
    return products;
  }

  async getProductById(_id) {
    const productById = await ProductsModel.findOne({ _id: _id });
    return productById;
  }

  async getAllRendering() {
    const products = await ProductsModel.find(
      {},
      {
        _id: 1,
        title: 1,
        description: 1,
        price: 1,
        thumbnail: 1,
        code: 1,
        stock: 1,
      }
    ).lean();
    return products;
  }

  async create({ title, description, price, thumbnail, code, stock }) {
    const ProductCreated = await ProductsModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    return ProductCreated;
  }

  async update({ _id, title, description, price, thumbnail, code, stock }) {
    const productUpdated = await ProductsModel.updateOne(
      { _id: _id },
      { title, description, price, thumbnail, code, stock }
    );
    return productUpdated;
  }

  async delete(id) {
    const result = await ProductsModel.deleteOne({ _id: id });
    return result;
  }
}

export const productService = new ProductService();
