const form = document.getElementById("pedidoForm");
const lista = document.getElementById("listaPedidos");


// Cargar pedidos del localStorage o del archivo JSON
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// Si no hay pedidos guardados, los cargamos desde pedidos.json
if (pedidos.length === 0) {
  fetch("pedidos.json")
    .then(res => res.json())
    .then(data => {
      pedidos = data;
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
      mostrarPedidos();
    })
    .catch(err => console.error("Error al cargar pedidos.json:", err));
} else {
  mostrarPedidos();
}

// Mostrar pedidos en la lista

function mostrarPedidos() {
  lista.innerHTML = ""; 

  pedidos.forEach((pedido, index) => {
    const li = document.createElement("li");

    // clase de color
    const estado = pedido.estado || "Pendiente";
    li.classList.remove("estado-pendiente", "estado-proceso", "estado-finalizado");
    li.classList.add(`estado-${estado.toLowerCase().replace(" ", "-")}`);

    // crear contenedor con la info
    const info = document.createElement("div");
    info.innerHTML = `
      <strong>${pedido.nombre}</strong> - ${pedido.sector} <br>
      <em>${pedido.descripcion}</em><br>
      <b>Estado:</b> ${estado}
    `;

    // botón para cambiar estado
    const btnEstado = document.createElement("button");
    btnEstado.textContent = "🔁 Cambiar Estado";
    btnEstado.addEventListener("click", () => cambiarEstado(index));

    // botón para eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "❌ Eliminar";
    btnEliminar.addEventListener("click", () => eliminarPedido(index));

    // ensamblar el pedido en el li
    li.appendChild(info);
    li.appendChild(btnEstado);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}


// Validar campos del formulario

function validarCampos(nombre, sector, descripcion) {
  if (!nombre || !sector || !descripcion) {
    Swal.fire("⚠️ Campos incompletos", "Todos los campos son obligatorios", "warning");
    return false;
  }
  return true;
}


// Guardar nuevo pedido

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const sector = document.getElementById("sector").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();

  if (!validarCampos(nombre, sector, descripcion)) return;

  const nuevoPedido = {
    nombre,
    sector,
    descripcion,
    estado: "Pendiente",
  };

  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  Swal.fire("✅ Pedido guardado", "El pedido fue registrado correctamente", "success");
  form.reset();
  mostrarPedidos();
});


// Cambiar estado del pedido

function cambiarEstado(index) {
  const estados = ["Pendiente", "En proceso", "Finalizado"];
  let actual = pedidos[index].estado || "Pendiente";
  let nuevoEstado = estados[(estados.indexOf(actual) + 1) % estados.length];

  pedidos[index].estado = nuevoEstado;
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  Swal.fire("🔁 Estado actualizado", `Ahora está "${nuevoEstado}"`, "info");
  mostrarPedidos();
}


// Eliminar pedido

function eliminarPedido(index) {
  Swal.fire({
    title: "Eliminar pedido?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      pedidos.splice(index, 1);
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
      mostrarPedidos();
      Swal.fire("🗑️ Eliminado", "El pedido fue eliminado", "success");
    }
  });
}
