import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './GamePage.css';
import cards from './Cards.json';

function GamePage() {
    const navigate = useNavigate();
    const { packName } = useParams();
    const [currentStatement, setCurrentStatement] = useState(0);
    const [statements, setStatements] = useState([]);
    const [remainingTime, setRemainingTime] = useState(10);
    const [timerRunning, setTimerRunning] = useState(false);

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
    }
    const generateRandomColor = () => {
        const colors = ['#AC3232', '#000000', '#4C1C63', '#E4DD25'] //rojo, negro, purpura, amarillo
        const color = colors[Math.floor(Math.random() * colors.length)];
        return color;
    }

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
    }

    // Función para avanzar al siguiente enunciado
    const nextStatement = () => {
        if (currentStatement < statements.length - 1) {
            //console.log(currentStatement);
            setCurrentStatement(currentStatement + 1);
            setBorderColor(generateRandomColor());
            setTimerRunning(false);
            setRemainingTime(10);
        }
    };

    // Función para volver a la página de inicio
    const navigateToHome = () => {
        // Implementa la lógica de navegación aquí.
        navigate(`/`);
    };

    const startTimer = () => {
        setRemainingTime(10);
        setTimerRunning(true);
      };
    
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
            <button className="home-button" onClick={navigateToHome}>Volver a la página de inicio</button>
            
            <div className="statement-container" style={{ border: `16px solid ${borderColor}` }}>
                <div className="statement">
                    {statement}
                </div>
            </div>
            <div className="timer">
                {remainingTime} segundos
                <button className="start-timer-button" onClick={startTimer}>Iniciar Temporizador</button>
            </div>
            <button className="next-button" onClick={nextStatement}>Siguiente</button>

        </div>
    );
}

export default GamePage;
