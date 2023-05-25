const socket = io();

const inputTitle = document.getElementById("input-title");
const inputDescription = document.getElementById("input-description");
const inputPrice = document.getElementById("input-price");
const inputThumbnail = document.getElementById("input-thumbnail");
const inputCode = document.getElementById("input-code");
const inputStock = document.getElementById("input-stock");
const inputEditTitle = document.getElementById("input-editTitle");
const inputEditDescription = document.getElementById("input-editDescription");
const inputEditPrice = document.getElementById("input-editPrice");
const inputEditThumbnail = document.getElementById("input-editThumbnail");
const inputEditCode = document.getElementById("input-editCode");
const inputEditStock = document.getElementById("input-editStock");

const addProduct = document.getElementById("addProductForm");
const deleteProduct = document.querySelectorAll(".btnDelete");
const editProduct = document.querySelectorAll(".btnEdit");
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

deleteProduct.forEach((producto) => {
  const cardId = producto.dataset.id;
  producto.addEventListener("click", () => {
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

function setModalTitle(id) {
  const modalTitle = document.getElementById("exampleModalLabel");
  modalTitle.innerText = "Editar Producto con el ID " + id;
}

function saveChanges() {
  const modalElement = document.getElementById("exampleModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElement);
  modalInstance.hide();
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto Modificado",
    showConfirmButton: true,
    confirmButtonColor: "#0d6efd",
    timer: 1500,
  });
}

editProduct.forEach((producto) => {
  const cardId = producto.dataset.id;
  producto.addEventListener("click", () => {
    document.getElementById("btn-edit").addEventListener("click", () => {
      const newProduct = {
        title: inputEditTitle.value,
        description: inputEditDescription.value,
        price: inputEditPrice.value,
        thumbnail: inputEditThumbnail.value,
        code: inputEditCode.value,
        stock: inputEditStock.value,
      };
      socket.emit("productModified", cardId, newProduct);
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
