import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import ClientView from './components/ClientView';
import socketIO from 'socket.io-client';


function App() {
	const [socket, setSocket] = useState();
	function connectToSocketWithAPIKey(ip, apiKey) {
		return new Promise((resolve, reject) => {
			const socket = socketIO.connect(ip + ':10000', {
				query: {
					apiKey: apiKey, // Envia la API key como query parameter
				},
			});

			socket.on('connect', () => {
				// La conexión se estableció con éxito
				resolve(socket);
			});

			socket.on('connect_error', (error) => {
				// La conexión no se pudo establecer
				reject(error);
			});
		});
	}

	// Uso en el componente App
	useEffect(() => {
		const apiKey = 'rnd_EooSJwkJB9Xu8Q0pVx11UVcOSIM1'; // Reemplaza con tu API key
		connectToSocketWithAPIKey(ipBackend1, apiKey)
			.then((socket) => {
				console.log('Conectado con éxito a la primera IP');
				setSocket(socket);
			})
			.catch((error) => {
				console.log('Error al conectar a la primera IP:', error);
				console.log('Intentando con la segunda IP...');
				return connectToSocketWithAPIKey(ipBackend2, apiKey);
			})
			.then((socket) => {
				if (!socket) {
					console.log('Error al conectar a la segunda IP.');
					console.log('Intentando con la tercera IP...');
					return connectToSocketWithAPIKey(ipBackend3, apiKey);
				}
				console.log('Conectado con éxito a la segunda IP');
				setSocket(socket);
			})
			.catch((error) => {
				console.log('Error al conectar a la tercera IP:', error);
				console.log('No se pudo establecer conexión con ninguna IP.');
			});
	}, []);


	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/game/:packName" element={<GamePage socket={socket} />} />
					<Route path="/clientserver" element={<ClientView socket={socket} />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
