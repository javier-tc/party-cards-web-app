import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import ClientView from './components/ClientView';
import socketIO from 'socket.io-client';

const urlBackend = "https://backend-partycards.onrender.com";

const socket = socketIO.connect(urlBackend);

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/party-cards-web-app" element={<HomePage />} />
				<Route path="/game/:packName" element={<GamePage socket={socket} />} />
				<Route path="/clientserver" element={<ClientView socket={socket} />} />
			</Routes>
		</Router>
	);
}

export default App;

