import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import ClientView from './components/ClientView';
import socketIO from 'socket.io-client';

const ipBackend1 = "100.20.92.101";
const ipBackend2 = "44.225.181.72";
const ipBackend3 = "44.227.217.144";

function connectToSocket(ip) {
  return new Promise((resolve, reject) => {
    const socket = socketIO.connect(ip + ':10000');
    
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

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    connectToSocket(ipBackend1)
      .then((socket) => {
        console.log('Conectado con éxito a la primera IP');
        setSocket(socket);
      })
      .catch((error) => {
        console.log('Error al conectar a la primera IP:', error);
        console.log('Intentando con la segunda IP...');
        return connectToSocket(ipBackend2);
      })
      .then((socket) => {
        if (!socket) {
          console.log('Error al conectar a la segunda IP.');
          console.log('Intentando con la tercera IP...');
          return connectToSocket(ipBackend3);
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
