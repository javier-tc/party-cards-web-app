const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

const ipFront = "http://localhost:3000";

app.use(cors());

const socketIO = require('socket.io')(http, {
	cors: {
		origin: ipFront
	}
});

let messages = [];
// Emitir todos los mensajes almacenados a un cliente cuando se conecta
socketIO.on('connection', (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	// Emitir los mensajes almacenados al cliente
	socketIO.emit('allMessages', messages);
	//console.log('mensajes emitidos', messages);

	socket.on('message', (data) => {
		messages.push(data);
		socketIO.emit('allMessages', data);
		//console.log('mensaje emitido', data);
	});

	socket.on('time', (data) => {
		socketIO.emit('time', data);
		//console.log('tiempo emitido', data);
	})

	socket.on('punishment', (data) => {
		socketIO.emit('punishment', data);
	})
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