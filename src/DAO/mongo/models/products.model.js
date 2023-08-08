import { ProductsMongoose } from "../products.mongoose.js";

class ProductsModel {
  async read() {
    try {
      const products = await ProductsMongoose.find({});
      return products;
    } catch (e) {
      console.log(e);
    }
  }

  async readWithPagination(query, pagina, limit, sortOptions) {
    try {
      const queryResult = await ProductsMongoose.paginate(query, {
        page: pagina || 1,
        limit: limit || 5,
        sort: sortOptions,
      });
      return queryResult;
    } catch (e) {
      console.log(e);
    }
  }

  async readById(_id) {
    try {
      const productById = await ProductsMongoose.findOne({ _id });
      return productById;
    } catch (e) {
      console.log(e);
    }
  }

  async readByIds(ids) {
    try {
      const products = await ProductsMongoose.find({ _id: { $in: ids } });
      return products;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(product) {
    try {
      const ProductCreated = await ProductsMongoose.create(product);
      return ProductCreated;
    } catch (e) {
      console.log(e);
    }
  }

  async update(_id, product) {
    try {
      const productUpdated = await ProductsMongoose.findByIdAndUpdate(
        _id,
        product,
        { new: true }
      );
      return productUpdated;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async delete(id) {
    try {
      const result = await ProductsMongoose.deleteOne({ _id: id });
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

export const productsModel = new ProductsModel();
