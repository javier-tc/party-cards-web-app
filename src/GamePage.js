import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './css/GamePage.css';
import GameStatements from './components/GameStatements';
import UserBar from './components/UsersBar';

const GamePage = ({ socket }) => {
	const navigate = useNavigate();
	const { packName } = useParams();

	// Función para volver a la página de inicio
	const navigateToHome = () => {
		// Implementa la lógica de navegación aquí.
		navigate(`/`);
	};

	return (
		<div className="game-page">
			<button className="home-button" onClick={navigateToHome}>Volver al inicio</button>
			<GameStatements packName={packName} socket={socket} />
			<UserBar socket={socket}/>
		</div>
	);
}

export default GamePage;
