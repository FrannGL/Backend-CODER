import { ProductsModel } from "../DAO/models/products.model.js";

class ProductService {
  async getAll() {
    const products = await ProductsModel.find({});
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
