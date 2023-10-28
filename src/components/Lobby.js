import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Lobby = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    //sends the username and socket ID to the Node.js server
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate('/game');
  };

  const packElements = cards.packs.map((pack, index) => (
    <div className="card-pack" key={index}>
      <h2>{pack.name}</h2>
      <button onClick={() => navigateToGame(pack.name)}>Jugar</button>
    </div>
  ));

  const navigateToGame = (packName) => {
    // Redirige a la página de juego con el pack seleccionado
    navigate(`/game/${packName}`);
  };

  return (
    <div>
      <form className="lobby__container" onSubmit={handleSubmit}>
      <h2 className="lobby__header">Ingresar al juego</h2>
      <label htmlFor="username">Nombre de usuario</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="lobby__cta">Listo</button>
      </form>
    </div>
    
  );
};

export default Lobby;