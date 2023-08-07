const socket = io();

const chatBox = document.getElementById("input-msg");
let emailIngresado = "";

async function main() {
  const userRole = await getUserRole();

  if (userRole !== "user") {
    showErrorAndRedirect(
      "No tienes permiso para realizar esta acción. Solo los usuarios pueden enviar mensajes.",
      "/home"
    );
    return userRole;
  }

  const email = await getEmailInput();

  if (email) {
    emailIngresado = email;
  }
}

async function getUserRole() {
  try {
    const response = await fetch("/api/sessions/current");

    if (response.ok) {
      const data = await response.json();
      console.log("Rol del usuario obtenido:", data.user.role);
      return data.user.role;
    } else {
      console.error("Error al obtener el rol del usuario.");
      return "";
    }
  } catch (error) {
    console.error("Error de red:", error);
    return "";
  }
}

function showErrorAndRedirect(message, redirectUrl) {
  Swal.fire({
    position: "center",
    icon: "error",
    title: message,
    showConfirmButton: true,
    confirmButtonColor: "#0d6efd",
    timer: 3000,
  }).then(() => {
    window.location.href = redirectUrl;
  });
}

async function getEmailInput() {
  const { value: email } = await Swal.fire({
    title: "Enter your email",
    input: "text",
    inputLabel: "Your email",
    inputValue: "",
    showCancelButton: false,
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to write something!";
      }
    },
  });

  return email;
}

main();

chatBox.addEventListener("keyup", async ({ key }) => {
  if (key == "Enter") {
    socket.emit("msg_front_to_back", {
      message: chatBox.value,
      user: emailIngresado,
    });
    chatBox.value = "";
  }
});

socket.on("listado_de_msgs", (msgs) => {
  const divMsgs = document.getElementById("div-msgs");
  let formato = "";
  msgs.forEach((msg) => {
    formato =
      formato +
      `<div class="mt-3"><p><span class="fw-bold">User: </span>` +
      msg.user +
      `</br>` +
      `</p>` +
      `<p><span class="fw-bold">Message: </span>` +
      msg.message +
      `</p></div>`;
  });
  divMsgs.innerHTML = formato;
});
