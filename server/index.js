const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://192.168.1.87:3000"
    }
});

let messages = [];
// Emitir todos los mensajes almacenados a un cliente cuando se conecta
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  // Emitir los mensajes almacenados al cliente
  socketIO.emit('allMessages', messages);
  console.log('mensajes emitidos', messages);

  socket.on('message', (data) => {
    messages.push(data);
    socketIO.emit('allMessages', data);
    console.log('mensaje emitido', data);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    //Updates the list of users when a user disconnects from the server
    socket.disconnect();
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});