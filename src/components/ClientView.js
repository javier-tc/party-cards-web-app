import React, { useEffect, useState } from 'react';
import ClientGame from './ClientGame';
import '../css/ClientView.css'

const ClientView = ({ socket }) => {
	const [messages, setMessages] = useState('');

	useEffect(() => {
		// Escuchar el evento 'allMessages' para recibir todos los mensajes
		socket.on('allMessages', (allMessages) => {
			//console.log(allMessages[allMessages.length - 1]);
			if (allMessages[allMessages.length - 1] !== undefined){
				setMessages(allMessages[allMessages.length - 1]);
			}else{
				setMessages(allMessages);
			}
		});
	}, [socket]);

	return (
		<div className="client-page">
			<ClientGame messages={messages} />
		</div>
	);
};

export default ClientView;
