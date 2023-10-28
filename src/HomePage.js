import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa 'useNavigate'
import './css/HomePage.css';
import cards from './components/Cards.json';

function HomePage() {
  const navigate = useNavigate(); // Usa 'useNavigate' para la navegación

  const navigateToServer = () => {
    navigate(`/lobby`)
  }

  const createCardPack = () => {
    // Aquí puedes implementar la lógica para crear un nuevo conjunto de tarjetas
  }

  const editCardPack = () => {
    // Aquí puedes implementar la lógica para editar un conjunto de tarjetas existente
  }

  return (
    <div className="home-page">
      <div className="content-container">
        <h1>Bienvenido a Party-Cards App</h1>
        <p>Elige un pack de tarjetas para jugar:</p>
        <div>
          <button className="create-button" onClick={navigateToServer}>Proximamente... Juego sincronizado</button>
        </div>
        <div className="card-pack-container">
          {packElements}
        </div>
        <div className="buttons-container">
          <button className="create-button" onClick={createCardPack}>Crear nuevo conjunto de tarjetas</button>
          <button className="edit-button" onClick={editCardPack}>Editar conjunto de tarjetas</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
