import importModels from "../DAO/factory.js";

const models = await importModels();
const productsModel = models.products;

class ProductService {
  async read() {
    try {
      const products = await productsModel.read();
      return products;
    } catch (e) {
      console.log(e);
    }
  }

  async readWithPagination(limit, pagina, category, orderBy) {
    try {
      const query = {};
      if (category) {
        query.category = category;
      }

      const sortOptions = {};
      if (orderBy === "asc") {
        sortOptions.price = 1;
      } else if (orderBy === "desc") {
        sortOptions.price = -1;
      }

      const queryResult = await productsModel.readWithPagination(
        query,
        pagina,
        limit,
        sortOptions
      );

      return queryResult;
    } catch (e) {
      console.log(e);
    }
  }

  async readById(_id) {
    try {
      const productById = await productsModel.readById(_id);
      return productById;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async readByIds(ids) {
    try {
      const products = await productsModel.readByIds(ids);
      return products;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async create(product) {
    try {
      const ProductCreated = await productsModel.create(product);
      return ProductCreated;
    } catch (e) {
      console.log(e);
    }
  }

  async update(_id, product) {
    try {
      const productUpdated = await productsModel.update(_id, product);
      return productUpdated;
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id) {
    try {
      const result = await productsModel.delete({ _id: id });
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

export const productService = new ProductService();
