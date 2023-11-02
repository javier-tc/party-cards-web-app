import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import ClientView from './components/ClientView';
import socketIO from 'socket.io-client';

const ipBackend = "100.20.92.101";
const socket = socketIO.connect(ipBackend+':10000');

function App() {

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

