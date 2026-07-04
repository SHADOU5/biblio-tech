// ==========================================
// BIBLIO-TECH - Lógica Principal
// ==========================================

// Base de datos simulada
const usuarios = [
  { usuario: "admin", password: "admin123", tipo: "administrador" },
  // RAMA MAIN cambia esta línea:
{ usuario: "admin", password: "admin123", tipo: "administrador", nivel: "SUPER" },
  // RAMA TEST cambia la misma línea:
{ usuario: "admin", password: "admin999", tipo: "administrador", activo: true },

  { usuario: "colaborador1", password: "colab123", tipo: "colaborador" },
  { usuario: "colaborador2", password: "colab456", tipo: "colaborador" }
];

const libros = [
  {
    isbn: "978-3-16-148410-0",
    titulo: "Introducción a la Visión Computacional",
    lector: "Julio Cesar Lloclli",
    vencimiento: "2026-06-25"
  },
  {
    isbn: "978-0-13-110362-7",
    titulo: "El Lenguaje de Programación C",
    lector: "María López",
    vencimiento: "2026-07-10"
  }
];

// ==========================================
// LOGIN
// ==========================================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();
    const tipo = document.getElementById("tipoUsuario").value;
    const errorMsg = document.getElementById("error-msg");

    const encontrado = usuarios.find(
      u => u.usuario === usuario && u.password === password && u.tipo === tipo
    );

    if (encontrado) {
      sessionStorage.setItem("usuarioActivo", JSON.stringify(encontrado));
      window.location.href = "prestamo.html";
    } else {
      errorMsg.textContent = "❌ Usuario, contraseña o tipo incorrecto.";
    }
  });
}

// ==========================================
// BUSCAR LIBRO (Préstamo)
// ==========================================
function buscarLibro() {
  const isbn = document.getElementById("isbn").value.trim();
  const libro = libros.find(l => l.isbn === isbn);
  const tituloInput = document.getElementById("tituloLibro");

  if (libro) {
    tituloInput.value = libro.titulo;
  } else {
    tituloInput.value = "Libro no encontrado";
  }
}

// ==========================================
// REGISTRAR PRÉSTAMO
// ==========================================
function registrarPrestamo() {
  const idLector = document.getElementById("idLector").value.trim();
  const nombreLector = document.getElementById("nombreLector").value.trim();
  const isbn = document.getElementById("isbn").value.trim();
  const titulo = document.getElementById("tituloLibro").value.trim();
  const tipo = document.querySelector('input[name="tipo"]:checked');
  const msg = document.getElementById("prestamo-msg");

  if (!idLector || !nombreLector || !isbn || !titulo) {
    msg.style.color = "#c62828";
    msg.textContent = "❌ Complete todos los campos antes de guardar.";
    return;
  }

  msg.style.color = "#2e7d32";
  msg.textContent = `✅ Préstamo registrado: "${titulo}" por ${tipo.value} día(s).`;
}

// ==========================================
// PROCESAR DEVOLUCIÓN
// ==========================================
function procesarDevolucion() {
  const isbn = document.getElementById("isbnDevolucion").value.trim();
  const libro = libros.find(l => l.isbn === isbn);
  const resultado = document.getElementById("resultadoDevolucion");
  const tablaBody = document.getElementById("tablaBody");
  const alertaMora = document.getElementById("alertaMora");

  if (!libro) {
    alert("❌ Libro no encontrado. Verifique el ISBN.");
    return;
  }

  const hoy = new Date();
  const vencimiento = new Date(libro.vencimiento);
  const diffMs = hoy - vencimiento;
  const diasRetraso = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const mora = diasRetraso * 2; // S/. 2.00 por día

  tablaBody.innerHTML = `
    <tr>
      <td>${libro.titulo}</td>
      <td>${libro.lector}</td>
      <td>${libro.vencimiento}</td>
      <td style="color:${diasRetraso > 0 ? '#c62828' : '#2e7d32'}; font-weight:bold;">
        ${diasRetraso > 0 ? diasRetraso + " Días" : "Sin retraso"}
      </td>
    </tr>
  `;

  resultado.style.display = "block";

  if (diasRetraso > 0) {
    alertaMora.style.display = "flex";
    document.getElementById("montoMora").textContent = `S/. ${mora}.00`;
  } else {
    alertaMora.style.display = "none";
  }
}

// ==========================================
// REGISTRAR INGRESO A ALMACÉN
// ==========================================
function registrarIngreso() {
  const msg = document.getElementById("ingreso-msg");
  msg.textContent = "✅ Libro registrado en almacén correctamente.";
  document.getElementById("isbnDevolucion").value = "";
  setTimeout(() => {
    document.getElementById("resultadoDevolucion").style.display = "none";
    msg.textContent = "";
  }, 3000);
}
