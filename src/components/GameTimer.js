import React, { useState, useEffect } from 'react';

const GameTimer = () => {
    const timeTimer = 15;//Tiempo del temporizador asignado en segundos
    const [remainingTime, setRemainingTime] = useState(timeTimer);
    const [timerRunning, setTimerRunning] = useState(false);
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
    
    return (
        <div className="timer">
            <p>{remainingTime}</p>
            <div className="timer-buttons">
                <button className="timer-button" onClick={resetTimer}>Reiniciar Temporizador</button>
                <button className="timer-button" onClick={startTimer}>Iniciar Temporizador</button>
                <button className="timer-button" onClick={pauseTimer}>Pausar Temporizador</button>
            </div>
        </div>
    );
}
export default GameTimer;