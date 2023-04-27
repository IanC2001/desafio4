const socket = io();

// Manejar el evento de agregar producto
const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  const nombre = event.target.elements.nombre.value;
  const precio = event.target.elements.precio.value;
  const producto = { nombre, precio };
  socket.emit('nuevoProducto', producto);
});

// Manejar el evento de recibir un nuevo producto
socket.on('nuevoProducto', (producto) => {
  const listaProductos = document.getElementById('lista-productos');
  const nuevoProducto = document.createElement('li');
  nuevoProducto.textContent = `${producto.nombre} - $${producto.precio}`;
  listaProductos.appendChild(nuevoProducto);
});
