import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa 'useNavigate'
import cards from './components/Cards.json';
import './css/HomePage.css';

function HomePage() {
	const navigate = useNavigate(); // Usa 'useNavigate' para la navegación

	const packElements = cards.packs.map((pack, index) => (
		<div className="card-pack" key={index}>
			<h2>{pack.name}</h2>
			<button className="play-button" onClick={() => navigateToServer(pack.name)}>Jugar</button>
		</div>
	));

	const navigateToServer = (packName) => {
		navigate(`/game/${packName}`)
	}
	const navigateToClient = () => {
		navigate(`/clientserver`)
	}
	/*
	const createCardPack = () => {
		// Aquí puedes implementar la lógica para crear un nuevo conjunto de tarjetas
	}

	const editCardPack = () => {
		// Aquí puedes implementar la lógica para editar un conjunto de tarjetas existente
	}
	*/
	return (
		<div className="home-page">
			<div className="content-container">
				<h1>Bienvenido a Party-Cards App</h1>
				<div className="card-pack-container">
					 {/*<p>Unirse a una partida en la red:</p>
					<button className="play-button" onClick={navigateToClient}>Unirse</button>*/}
					<p>Inicia una partida:</p>
					{packElements}
				</div>
				{/*<div className="buttons-container">
					<button className="create-button" onClick={createCardPack}>Crear nuevo conjunto de tarjetas... Proximamente</button>
					<button className="edit-button" onClick={editCardPack}>Editar conjunto de tarjetas... Proximamente</button>
				</div>*/}
			</div>
		</div>
	);
}

export default HomePage;
