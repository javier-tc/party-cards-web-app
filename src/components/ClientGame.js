import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientGame = ({ messages }) => {

	const navigate = useNavigate();
	const handleLeaveGame = () => {
		navigate('/');
		window.location.reload();
	};

	const reload = () => {
		window.location.reload();
	}

	useEffect(() => {
		if (messages.text === undefined) {
			// Esperar 2 segundos antes de recargar la página
			const timeout = setTimeout(reload, 2000);

			// Limpia el timeout si el componente se desmonta
			return () => clearTimeout(timeout);
		}
	}, [messages.text]);

	return (
		<>
			<button className="leaveGame-button" onClick={handleLeaveGame}>
				Salir del juego
			</button>
			<div className="message-container" style={{ border: `12px solid ${messages.borderColor}` }}>
				<div className='message'>
					{messages.text === undefined ? 'Cargando...' : messages.text}
				</div>
			</div>
		</>
	);
};

export default ClientGame;