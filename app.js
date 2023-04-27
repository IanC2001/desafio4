const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const handlebars = require('express-handlebars');

// Configurar handlebars como motor de plantillas
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', {
    productos: [
      { nombre: 'Producto 1', precio: 10.0 },
      { nombre: 'Producto 2', precio: 20.0 },
      { nombre: 'Producto 3', precio: 30.0 },
    ],
  });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {
    productos: [
      { nombre: 'Producto 1', precio: 10.0 },
      { nombre: 'Producto 2', precio: 20.0 },
      { nombre: 'Producto 3', precio: 30.0 },
    ],
  });
});

io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  socket.on('disconnect', () => {
    console.log('El usuario se ha desconectado');
  });

  socket.on('nuevoProducto', (producto) => {
    console.log('Nuevo producto:', producto);
    io.emit('productoAgregado', producto);
  });

  socket.on('eliminarProducto', (producto) => {
    console.log('Eliminar producto:', producto);
    io.emit('productoEliminado', producto);
  });
});

http.listen(8080, () => {
  console.log('Servidor iniciado en el puerto 8080');
});