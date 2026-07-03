// ==========================================
// RAMA MAIN - Login de usuarios
// ==========================================
const usuarios = [
  { usuario: "admin",        password: "admin123",  tipo: "administrador" },
  { usuario: "colaborador1", password: "colab123",  tipo: "colaborador" },
  { usuario: "colaborador2", password: "colab456",  tipo: "colaborador" }
];

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario     = document.getElementById("usuario").value.trim();
    const password    = document.getElementById("password").value.trim();
    const tipo        = document.getElementById("tipoUsuario").value;
    const errorMsg    = document.getElementById("error-msg");

    const encontrado = usuarios.find(
      u => u.usuario === usuario &&
           u.password === password &&
           u.tipo === tipo
    );

    if (encontrado) {
      sessionStorage.setItem("usuarioActivo", JSON.stringify(encontrado));
      window.location.href = "prestamo.html";
    } else {
      errorMsg.textContent = "❌ Usuario, contraseña o tipo incorrecto.";
    }
  });
}
