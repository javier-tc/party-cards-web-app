import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GameStatements from './components/GameStatements';
import './css/GamePage.css';

const GamePage = ({ socket }) => {
	const navigate = useNavigate();
	const { packName } = useParams();

	// Función para volver a la página de inicio
	const navigateToHome = () => {
		// Implementa la lógica de navegación aquí.
		navigate('/party-cards-web-app');
	};

	return (
		<div className="game-page">
			<button className="home-button" onClick={navigateToHome}>Volver al inicio</button>
			<GameStatements packName={packName} socket={socket} />
		</div>
	);
}

export default GamePage;
