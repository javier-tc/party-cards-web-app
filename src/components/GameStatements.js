import React, { useEffect, useState } from 'react';
import cards from './Cards.json';
import GameTimer from './GameTimer';

const GameStatements = ({ packName, socket }) => {
	const showMessagePunishment = (messagePunishmentText, timeout, callback) => {
		const messagePunishment = document.getElementById('messagePunishment');
		messagePunishment.innerText = messagePunishmentText;
		messagePunishment.style.display = 'flex';

		setTimeout(() => {
			messagePunishment.style.display = 'none';
			if (typeof callback === 'function') {
				callback();
			}
		}, timeout);
	};

	const [currentStatement, setCurrentStatement] = useState(0);
	const [statements, setStatements] = useState([]);
	const generateRandomColor = (array) => {
		const colors = ['#AC3232', '#00FF00', '#4C1C63', '#E4DD25', '#0000FF'] //rojo, negro, purpura, amarillo
		for (let i = 0; i < array.length; i++) {
			const color = colors[Math.floor(Math.random() * colors.length)];
			setBorderColors((prevColors) => [...prevColors, color]);
		}
	};

	const [borderColors, setBorderColors] = useState([]);
	// Función para avanzar al siguiente enunciado


	const handleSendMessage = (statement, borderColor) => {
		//console.log('sending...', statement);
		if (statement.trim()) {
			socket.emit('message', {
				text: statement,
				id: `${socket.id}${Math.random()}`,
				borderColor: borderColor,
				socketID: socket.id,
			});
		}
	};
	const nextStatement = () => {
		if (currentStatement < statements.length - 1) {
			handleSendMessage(statements[currentStatement], borderColors[currentStatement]);
			setCurrentStatement(currentStatement + 1);
		}
	};


	//Enunciados
	useEffect(() => {
		const loadedStatements = getStatementsForPack(packName);
		//console.log(loadedStatements); // Agrega esta línea para depurar
		const shuffledStatements = shuffleArray(loadedStatements); // Mezclar los enunciados
		setStatements(shuffledStatements);
		generateRandomColor(shuffledStatements);
	}, [packName]);

	const shuffleArray = (array) => {
		// Copiar el array original para no modificarlo directamente
		const shuffledArray = [...array];
		for (let i = shuffledArray.length - 1; i > 0; i--) {
			// Generar un índice aleatorio entre 0 e i
			const j = Math.floor(Math.random() * (i + 1));
			// Intercambiar elementos en las posiciones i y j
			[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
		}
		return shuffledArray;
	};

	const getStatementsForPack = (packName) => {
		// Implementa la lógica para cargar los enunciados según el pack seleccionado
		const pack = cards.packs.find((pack) => pack.name === packName);
		if (pack) {
			return pack.statements;
		} else {
			// Manejar el caso en el que no se encuentra el pack
			return [];
		}
	};
	const colorPunish = (color) => {
		let punish;
		switch (color) {
			//color azul
			case '#0000FF':
				punish = '1';
				break;
			//color verde claro
			case '#00FF00':
				punish = '2';
				break;
			//color amarillo
			case '#E4DD25':
				punish = '3';
				break;
			//color rojo  
			case '#AC3232':
				punish = '4';
				break;
			//color purpura
			case '#4C1C63':
				punish = '5';
				break;
			default:
				punish = '???';
		}
		return punish;
	};

	const rightAnswer = () => {
		showMessagePunishment('SE LO GANOOO.\nREGALA ' + colorPunish(borderColor), 3000, nextStatement);
	};

	const wrongAnswer = () => {
		showMessagePunishment('ES MUY PENCAAA.\nTOMA ' + colorPunish(borderColor), 3000, nextStatement);
	};

	const statement = statements[currentStatement - 1] === undefined ? nextStatement() : statements[currentStatement - 1];
	const borderColor = borderColors[currentStatement - 1] === undefined ? nextStatement() : borderColors[currentStatement - 1];


	//const statement = statements[currentStatement];
	//console.log(statements.length === 0 ? statements[currentStatement] : statements[currentStatement - 1]);
	return (
		<>
			<div className="statement-container" style={{ border: `12px solid ${borderColor}` }}>
				<div className="statement">
					{statement}
				</div>
			</div>
			<GameTimer />
			<div className='answer-buttons'>
				<button className="regala-button" onClick={rightAnswer}>Regala</button>
				<button className="toma-button" onClick={wrongAnswer}>Toma</button>
			</div>
			<div id="messagePunishment" className="messagePunishment"></div>
		</>
	);
}
export default GameStatements;