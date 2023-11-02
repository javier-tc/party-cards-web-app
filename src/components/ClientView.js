import React, { useEffect, useState } from 'react';
import ClientGame from './ClientGame';
import '../css/ClientView.css'

const ClientView = ({ socket }) => {
	const [messages, setMessages] = useState('');
	const [remainingTime, setRemainingTime] = useState(15);
	//const [text, setText] = useState();

	const showMessagePunishment = (messagePunishmentText, timeout) => {
		const messagePunishment = document.getElementById('messagePunishment');
		if (messagePunishmentText) {
			messagePunishment.innerText = messagePunishmentText;
		}
		messagePunishment.style.display = 'flex';

		setTimeout(() => {
			messagePunishment.style.display = 'none';
		}, timeout);
	};

	useEffect(() => {
		// Escuchar el evento 'allMessages' para recibir todos los mensajes
		socket.on('allMessages', (allMessages) => {
			//console.log(allMessages[allMessages.length - 1]);
			if (allMessages[allMessages.length - 1] !== undefined) {
				setMessages(allMessages[allMessages.length - 1]);
			} else {
				setMessages(allMessages);
			}
		});
	}, [socket]);

	useEffect(() => {
		socket.on('time', (data) => {
			setRemainingTime(data.timer);
			//console.log(data);
		});
		socket.on('punishment', (data) => {
			//setText(data.text);
			showMessagePunishment(data.text, 3000);
		});
	}, [socket]);

	return (
		<div className="client-page">
			<ClientGame messages={messages} />
			<div className='timer-client'>
				{remainingTime === 0 ? '¡Se acabó el tiempo!' : remainingTime}
			</div>
			<div id="messagePunishment" className="messagePunishment-client"></div>
		</div>
	);
};

export default ClientView;
