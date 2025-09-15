
const form = document.getElementById("pedidoForm");
const lista = document.getElementById("listaPedidos");

// Cargar pedidos desde localStorage o inicializar array vacío
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

// Mostrar pedidos en la lista
function mostrarPedidos() {
  lista.innerHTML = ""; 
  pedidos.forEach((pedido, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${pedido.nombre}</strong> - ${pedido.sector} <br>
      <em>${pedido.descripcion}</em>
      <button onclick="eliminarPedido(${index})">❌ Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

// Guardar pedido nuevo
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoPedido = {
    nombre: document.getElementById("nombre").value,
    sector: document.getElementById("sector").value,
    descripcion: document.getElementById("descripcion").value
  };

  pedidos.push(nuevoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  form.reset();
  mostrarPedidos();
});

// Eliminar pedido
function eliminarPedido(index) {
  pedidos.splice(index, 1);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  mostrarPedidos();
}

// Mostrar al cargar la página
mostrarPedidos();
