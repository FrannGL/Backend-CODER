import express from "express";
import ProductManager from "../DAO/helpers/productManager.js";
import { ProductsModel } from "../DAO/models/products.model.js";
import { productService } from "../services/products.service.js";
export const productsApiRouter = express.Router();
const prodMan = new ProductManager();

productsApiRouter.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json({
      status: "success",
      msg: "Listado de Productos",
      payload: products,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      payload: {},
    });
  }
});

productsApiRouter.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Por favor completa todos los campos");
      return res.status(400).json({
        status: "error",
        msg: "Por favor completa todos los campos",
        payload: {},
      });
    }
    const ProductCreated = await productService.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    return res.status(201).json({
      status: "success",
      msg: "Producto Creado",
      payload: {
        _id: ProductCreated._id,
        title: ProductCreated.title,
        description: ProductCreated.description,
        price: ProductCreated.price,
        thumbnail: ProductCreated.thumbnail,
        code: ProductCreated.code,
        stock: ProductCreated.stock,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      payload: {},
    });
  }
});

productsApiRouter.put("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      !_id
    ) {
      console.log("Por favor completa todos los campos");
      return res.status(400).json({
        status: "error",
        msg: "Por favor completa todos los campos",
        payload: {},
      });
    }
    try {
      const productUpdated = await productService.update({
        _id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
      if (productUpdated.matchedCount > 0) {
        return res.status(201).json({
          status: "success",
          msg: "product uptaded",
          payload: `Has actualizado el producto con ID ${_id}`,
        });
      } else {
        return res.status(404).json({
          status: "error",
          msg: "product not found",
          payload: {},
        });
      }
    } catch (e) {
      return res.status(500).json({
        status: "error",
        msg: "Error al actualizar el producto",
        payload: {},
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      payload: {},
    });
  }
});

productsApiRouter.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await productService.delete(_id);

    if (result?.deletedCount > 0) {
      return res.status(200).json({
        status: "success",
        msg: "Producto Eliminado",
        payload: `Has eliminado el producto con ID ${_id}`,
      });
    } else {
      return res.status(404).json({
        status: "error",
        msg: "El producto no existe",
        payload: {},
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: "error",
      msg: "Error en el servidor",
      payload: {},
    });
  }
});

// productsApiRouter.get("/", async (req, res) => {
//   try {
//     const payload = await prodMan.getProducts();
//     const queryLimit = req.query.limit;
//     if (queryLimit && queryLimit <= 10) {
//       const search = payload.slice(0, queryLimit);
//       res.status(200).json({
//         status: "success",
//         msg: `Mostrando los ${queryLimit} productos`,
//         payload: search,
//       });
//     } else {
//       res.status(200).json({
//         status: "success",
//         msg: `Mostrando los ${payload.length} productos`,
//         payload: payload,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res
//       .status(501)
//       .send({ status: "error", msg: "Error en el servidor", error: err });
//   }
// });

// productsApiRouter.get("/:id", async (req, res) => {
//   try {
//     let id = req.params.id;
//     const productoEncontrado = await prodMan.getProductsById(id);
//     if (productoEncontrado) {
//       res.status(200).json({
//         status: "success",
//         msg: `Mostrando el producto con ID ${productoEncontrado.id}`,
//         payload: productoEncontrado,
//       });
//     } else {
//       res.status(404).send({ status: "error", msg: "Producto no encontrado" });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(501)
//       .send({ status: "error", msg: "Error en el servidor", error: error });
//   }
// });

// productsApiRouter.delete("/:id", (req, res) => {
//   try {
//     let id = req.params.id;
//     let productoEliminado = prodMan.deleteProduct(id);

//     if (productoEliminado) {
//       return res.status(200).json({
//         status: "success",
//         msg: "Producto eliminado.",
//         payload: {},
//       });
//     }
//   } catch (err) {
//     res.status(501).json({
//       status: "ERROR",
//       msg: "Error en el servidor",
//       payload: {},
//     });
//   }
// });

// productsApiRouter.post("/", (req, res) => {
//   const product = req.body;
//   console.log(product);
//   prodMan.addProduct(product);
//   res.status(201).send("Producto agregado Correctamente");
// });

// productsApiRouter.put("/:pid", async (req, res) => {
//   try {
//     const productId = req.params.pid;
//     const product = prodMan.getProductsById(productId);
//     if (product) {
//       const productModified = req.body;

//       if (productModified.id && productModified.id !== productId) {
//         return res.status(400).json({
//           status: "error",
//           msg: "No se permite modificar el ID del producto",
//           payload: {},
//         });
//       }

//       prodMan.updateProduct(productId, productModified);
//       res.status(200).json({
//         status: "success",
//         msg: "Producto actualizado",
//         payload: productModified,
//       });
//     } else {
//       res.status(400).json({
//         status: "error",
//         msg: "El producto no existe",
//         payload: {},
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(501).json({
//       status: "error",
//       msg: "Error en el servidor",
//       payload: {},
//     });
//   }
// });
