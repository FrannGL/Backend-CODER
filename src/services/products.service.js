import { ProductsModel } from "../DAO/models/products.model.js";

class ProductService {
  async getAll() {
    const products = await ProductsModel.find({});
    return products;
  }

  async getAllWithPagination(pagina, price, orderBy) {
    const query = {};
    if (price) {
      query.price = price;
    }

    const sortOptions = {};
    if (orderBy === "asc") {
      sortOptions.title = 1;
    } else if (orderBy === "desc") {
      sortOptions.title = -1;
    }

    const queryResult = await ProductsModel.paginate(query, {
      page: pagina || 1,
      limit: 5,
      sort: sortOptions,
    });

    return queryResult;
  }

  async getProductById(_id) {
    const productById = await ProdModel.findOne({ _id: _id });
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
