import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import Lobby from './components/Lobby';
import Game from './components/Game';

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

function App() {
  //console.log(socket);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lobby" element={<Lobby socket={socket} />} />
          <Route path="/game" element={<Game socket= {socket} />} />
          <Route path="/game/:packName" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

