class ProductManager {
  constructor() {
    this.products = [];
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    const productExist = this.products.find((prod) => prod.code === code);

    if (productExist) {
      console.log("El codigo del producto ya está en uso");
      return null;
    }
    let idMax = 0;
    this.products.forEach((prod) => {
      if (prod.id > idMax) {
        idMax = prod.id;
      }
    });
    idMax++;
    const product = {
      id: idMax,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    this.products.push(product);
    return product;
  }

  getProducts() {
    return this.products;
  }

  getProductsById(id) {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      console.log("Not Found");
    }
    return product;
  }
}

const productManager = new ProductManager();

// TEST DEL METODO getProducts() CON ARRAY VACIO
console.log(productManager.getProducts());

// SE INSTANCIA Y TESTEA UN NUEVO PRODUCTO
const product1 = productManager.addProduct(
  "Campera",
  "Cuero Vacuno",
  1000,
  "img.jpg",
  1241414,
  3
);

// SE MUESTRA EL PRODUCTO POR CONSOLA A TRAVES DEL METODO getProducts()
console.log(productManager.getProducts());

// SE INSTANCIA UN SEGUNDO PRODUCTO CON UN CODE YA UTILIZADO
const product2 = productManager.addProduct(
  "Camisa",
  "Cuello Mao",
  2000,
  "img2.jpg",
  1241414,
  24
);

// SE INSTANCIA UN TERCER PRODUCTO CON UN CODE Y UN ID NUEVOS
const product3 = productManager.addProduct(
  "Zapatillas",
  "Tela",
  1500,
  "img3.jpg",
  1241411,
  24
);

// SE LLAMA A UN PRODUCTO POR ALGUN ID VALIDO (1 o 2)
console.log(productManager.getProductsById(1));

// SE LLAMA A UN PRODUCTO POR ALGUN ID NO VALIDO (3 o MAS)
console.log(productManager.getProductsById(5));

// SE LLAMA AL METODO getProducts() MOSTRANDO TODOS LOS PRODUCTOS
console.log(productManager.getProducts());
