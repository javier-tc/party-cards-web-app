import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import Lobby from './components/Lobby';
import HomeClient from './components/HomeClient';
import ClientView from './components/ClientView';

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

function App() {
	//console.log(socket);
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/lobby/:packName" element={<Lobby socket={socket} />} />
					<Route path="/game/:packName" element={<GamePage socket={socket} />} />
					<Route path="/clientserver" element={<ClientView socket={socket} />} />
					<Route path="/homeclient" element={<HomeClient socket={socket}/>} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;

