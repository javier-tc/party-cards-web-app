import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeClient = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    //sends the username and socket ID to the Node.js server
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate('/clientserver');
  };


  return (
    <div>
      <form className="HomeClient__container" onSubmit={handleSubmit}>
      <h2 className="HomeClient__header">Ingresar al juego</h2>
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
      <button className="HomeClient__cta">Listo</button>
      </form>
    </div>
    
  );
};

export default HomeClient;