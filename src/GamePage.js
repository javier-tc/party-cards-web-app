import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './css/GamePage.css';
import cards from './components/Cards.json';

function GamePage() {

  const showMessage = (messageText, timeout, callback) => {
    const message = document.getElementById('message');
    message.innerText = messageText;
    message.style.display = 'block';
  
    setTimeout(() => {
      message.style.display = 'none';
      if (typeof callback === 'function') {
        callback();
      }
    }, timeout);
  };

  const timeTimer = 15;//Tiempo del temporizador asignado en segundos
  const navigate = useNavigate();
  const { packName } = useParams();
  const [currentStatement, setCurrentStatement] = useState(0);
  const [statements, setStatements] = useState([]);
  const [remainingTime, setRemainingTime] = useState(timeTimer);
  const [timerRunning, setTimerRunning] = useState(false);

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
    showMessage('SE LO GANOOO.\nREGALA '+ colorPunish(borderColor), 3000, nextStatement);
  };

  const wrongAnswer = () => {
    showMessage('ES MUY PENCAAA.\nTOMA '+ colorPunish(borderColor), 3000, nextStatement);
  };
  
  // Función para avanzar al siguiente enunciado
  const nextStatement = () => {
    if (currentStatement < statements.length - 1) {
      //console.log(currentStatement);
      setCurrentStatement(currentStatement + 1);
      setBorderColor(generateRandomColor());
      setTimerRunning(false);
      setRemainingTime(timeTimer);
    }
  };

  // Función para volver a la página de inicio
  const navigateToHome = () => {
    // Implementa la lógica de navegación aquí.
    navigate(`/`);
  };
  
  //Timer
  const startTimer = () => {
    //setRemainingTime(10);
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
  };
  
  const resetTimer = () => {
    setRemainingTime(timeTimer);
  }

  useEffect(() => {
      if (timerRunning && remainingTime > 0) {
        const timer = setTimeout(() => {
          setRemainingTime(remainingTime - 1);
        }, 1000);
  
        return () => clearTimeout(timer);
      }
    }, [timerRunning, remainingTime]);

  const statement = statements[currentStatement];

  return (
      <div className="game-page">
          <button className="home-button" onClick={navigateToHome}>Volver al inicio</button>
          <div className="statement-container" style={{ border: `12px solid ${borderColor}` }}>
              <div className="statement">
                  {statement}
              </div>
          </div>

          <div className="timer">
            <p>{remainingTime}</p>
            <div className="timer-buttons">
              <button className="timer-button" onClick={resetTimer}>Reiniciar Temporizador</button>
              <button className="timer-button" onClick={startTimer}>Iniciar Temporizador</button>
              <button className="timer-button" onClick={pauseTimer}>Pausar Temporizador</button>
            </div>
          </div>
          <div className='answer-buttons'>
            <button className="regala-button" onClick={rightAnswer}>Regala</button>
            <button className="toma-button" onClick={wrongAnswer}>Toma</button>
          </div>
          {/*<button onClick={nextStatement}>NEXT</button>*/}
          <p id="message" className="message"></p>
      </div>
  );
}

export default GamePage;
