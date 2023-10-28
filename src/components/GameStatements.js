import React, { useState, useEffect } from 'react';
import cards from './Cards.json';
import GameTimer from './GameTimer';

const GameStatements = ({ packName }) => {
    const showMessagePunishment = (messagePunishmentText, timeout, callback) => {
        const messagePunishment = document.getElementById('messagePunishment');
        messagePunishment.innerText = messagePunishmentText;
        messagePunishment.style.display = 'block';
      
        setTimeout(() => {
            messagePunishment.style.display = 'none';
            if (typeof callback === 'function') {
            callback();
            }
        }, timeout);
    };

    const [currentStatement, setCurrentStatement] = useState(0);
    const [statements, setStatements] = useState([]);
    const statement = statements[currentStatement];

    //Enunciados
    useEffect(() => {
        const loadedStatements = getStatementsForPack(packName);
        //console.log(loadedStatements); // Agrega esta línea para depurar
        const shuffledStatements = shuffleArray(loadedStatements); // Mezclar los enunciados
        setStatements(shuffledStatements);
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

    const generateRandomColor = () => {
        const colors = ['#AC3232', '#00FF00', '#4C1C63', '#E4DD25', '#0000FF'] //rojo, negro, purpura, amarillo
        const color = colors[Math.floor(Math.random() * colors.length)];
        return color;
    };

    const [borderColor, setBorderColor] = useState(generateRandomColor());

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
        switch(color){
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
        showMessagePunishment('SE LO GANOOO.\nREGALA '+ colorPunish(borderColor), 3000, nextStatement);
      };
    
      const wrongAnswer = () => {
        showMessagePunishment('ES MUY PENCAAA.\nTOMA '+ colorPunish(borderColor), 3000, nextStatement);
      };
      
      // Función para avanzar al siguiente enunciado
      const nextStatement = () => {
        if (currentStatement < statements.length - 1) {
          //console.log(currentStatement);
          setCurrentStatement(currentStatement + 1);
          setBorderColor(generateRandomColor());
        }
      };

    return (
        <div>
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
            {/*<button onClick={nextStatement}>NEXT</button>*/}
            <div id="messagePunishment" className="messagePunishment"></div>
        </div>
    );
}
export default GameStatements;