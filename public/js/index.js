const socket = io();

const addProduct = document.getElementById("addProductForm");
const inputTitle = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const inputPrice = document.getElementById("input-price");
const inputThumbnail = document.getElementById("input-thumbnail");
const inputCode = document.getElementById("input-code");
const inputStock = document.getElementById("input-stock");
const deleteProduct = document.querySelectorAll(".btnDelete");
const cardId = document.getElementById("card-id");

addProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    price: inputPrice.value,
    thumbnail: inputThumbnail.value,
    code: inputCode.value,
    stock: inputStock.value,
  };
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto Creado",
    showConfirmButton: true,
    timer: 1500,
  });
  socket.emit("new-product", newProduct);
});

deleteProduct.forEach((btnDelete) => {
  const cardId = btnDelete.dataset.id;
  btnDelete.addEventListener("click", () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará el producto del array original",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0d6efd",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const productId = cardId;
        socket.emit("deleteProduct", productId);
        Swal.fire("Hecho!", "Eliminaste el producto", "success");
      }
    });
  });
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
          <a
            href="#"
            class="btn btn-primary btn-sm btnEdit"
            data-id=${prod.id}
          ><i class="bi bi-pencil me-1"></i>Editar</a>
          <a
            href="#"
            class="btn btn-danger btn-sm ms-2 btnDelete"
            data-id=${prod.id}
          ><i class="bi bi-trash3 me-1"></i>Eliminar</a>
        </div>
      </div>
    </div>
        `;
    })
    .join("");
});
