import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa 'useNavigate'
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate(); // Usa 'useNavigate' para la navegación

  const navigateToGame = (packName) => {
    // Redirige a la página de juego con el pack seleccionado
    navigate(`/game/${packName}`);
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
        <h1>Bienvenido a App Party-Cards</h1>
        <p>Elige un pack de tarjetas para jugar:</p>

        <div className="card-pack-container">
          <div className="card-pack">
            <h2>Nombre del Pack 1</h2>
            <button onClick={() => navigateToGame('pack1')}>Jugar</button>
          </div>
          <div className="card-pack">
            <h2>Nombre del Pack 2</h2>
            <button onClick={() => navigateToGame('pack2')}>Jugar</button>
          </div>
          {/* Puedes agregar más packs aquí */}
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
