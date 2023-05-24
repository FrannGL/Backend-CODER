const socket = io();

const addProductForm = document.getElementById("addProductForm");
const inputTitle = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const inputPrice = document.getElementById("input-price");
const inputThumbnail = document.getElementById("input-thumbnail");
const inputCode = document.getElementById("input-code");
const inputStock = document.getElementById("input-stock");

addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    price: inputPrice.value,
    thumbnail: inputThumbnail.value,
    code: inputCode.value,
    stock: inputStock.value,
  };

  socket.emit("new-product", newProduct);
});

const deleteProdForm = document.getElementById("deleteProdForm");
deleteProdForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const productId = deleteProdForm.elements.productId.value;
  socket.emit("deleteProduct", productId);
  deleteProdForm.reset();
});

socket.on("products", (prod) => {
  console.log(prod);
  document.getElementById("dinamic-list").innerHTML = prod
    .map((prod) => {
      return `
        <div class="card" style="width: 15rem; border: 1px solid black">
            <img src=${prod.thumbnail} class="card-img" alt="${prod.title}" />
            <div class="card-body text-center">
              <h6 class="card-id">ID: ${prod.id}</h6>
              <div class="card-title">
                <h4>${prod.title}</h4>
              </div>
              <div class="card-description">
                <p>${prod.description}</p>
              </div>
              <div class="card-price">
                <p>$ ${prod.price}.-</p>
              </div>
              <div class="card-item-detail">
                <p class="code"><b>Code:</b> ${prod.code}</p>
                <p class="stock"><b>Stock:</b> ${prod.stock}</p>
              </div>
              <div class="btnContainer">
                <a href="#" class="btn btn-dark">Agregar al Carrito</a>
              </div>
            </div>
        </div>
        `;
    })
    .join("");
});
