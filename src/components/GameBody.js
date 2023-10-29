import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameBody = ({ messages }) => {
  const navigate = useNavigate();
  const handleLeaveGame = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <button className="leaveGame__btn" onClick={handleLeaveGame}>
          LEAVE Game
        </button>
      </header>

      <div className="message__container">
        {messages.length > 0 ? messages[messages.length - 1].text : 'No hay mensajes'}
      </div>
    </>
  );
};

export default GameBody;