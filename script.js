
const form = document.getElementById("pedidoForm");
const lista = document.getElementById("listaPedidos");

// Intentamos cargar pedidos desde localStorage o archivo JSON
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// Cargar pedidos simulados (JSON remoto)
if (pedidos.length === 0) {
  fetch("pedidos.json")
    .then(res => res.json())
    .then(data => {
      pedidos = data;
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
      mostrarPedidos();
    });
} else {
  mostrarPedidos();
}

// Mostrar pedidos en lista
function mostrarPedidos() {
  
  lista.innerHTML = "";
  pedidos.forEach((pedido, index) => {
    const li = document.createElement("li");
    li.setAttribute("data-estado", pedido.estado);
    li.innerHTML = `
      <strong>${pedido.nombre}</strong> - ${pedido.sector} <br>
      <em>${pedido.descripcion}</em><br>
      <b>Estado:</b> ${pedido.estado || "Pendiente"} <br>
      <button onclick="cambiarEstado(${index})">🔁 Cambiar Estado</button>
      <button onclick="eliminarPedido(${index})">❌ Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

// Guardar nuevo pedido
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevoPedido = {
    nombre: document.getElementById("nombre").value,
    sector: document.getElementById("sector").value,
    descripcion: document.getElementById("descripcion").value,
    estado: "Pendiente",
    fecha: dayjs().format("DD/MM/YYYY HH:mm")
  };
  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  Swal.fire("✅ Pedido guardado", "El pedido fue registrado correctamente", "success");
  form.reset();
  mostrarPedidos();
});

// Cambiar estado del pedido (ciclo)
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
    title: "¿Eliminar pedido?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      pedidos.splice(index, 1);
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
      mostrarPedidos();
      Swal.fire("🗑️ Eliminado", "El pedido fue eliminado", "success");
    }
  });
}