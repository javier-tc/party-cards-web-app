import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './GamePage.css';

function GamePage() {
    const navigate = useNavigate();

    const { packName } = useParams();
    const [currentStatement, setCurrentStatement] = useState(0);
    const [statements, setStatements] = useState([]);
    const [remainingTime, setRemainingTime] = useState(10);
    const [timerRunning, setTimerRunning] = useState(false);

    useEffect(() => {
        console.log(`Pack seleccionado: ${packName}`);
        const loadedStatements = getStatementsForPack(packName);
        console.log(loadedStatements); // Agrega esta línea para depurar
        setStatements(loadedStatements);
    }, [packName]);

    const getStatementsForPack = (packName) => {
        // Implementa la lógica para cargar los enunciados según el pack seleccionado
        // Por ahora, usamos enunciados de ejemplo para dos packs: pack1 y pack2
        if (packName === 'pack1') {
        return [
            'Enunciado 1 del Pack 1',
            'Enunciado 2 del Pack 1',
            'Enunciado 3 del Pack 1',
        ];
        } else if (packName === 'pack2') {
        return [
            'Enunciado 1 del Pack 2',
            'Enunciado 2 del Pack 2',
            'Enunciado 3 del Pack 2',
        ];
        } else {
        return [];
        }
    }

    // Función para avanzar al siguiente enunciado
    const nextStatement = () => {
        if (currentStatement < statements.length - 1) {
        setCurrentStatement(currentStatement + 1);
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
        <div className="statement-container">
            <div className="statement">
                {statement}
            </div>
            <div className="timer">
                {remainingTime} segundos
                <button className="start-timer-button" onClick={startTimer}>Iniciar Temporizador</button>
            </div>
        </div>
        <button className="next-button" onClick={nextStatement}>Siguiente</button>

        </div>
    );
}

export default GamePage;
