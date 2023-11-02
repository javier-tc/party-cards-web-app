import React, {useState, useEffect, useCallback} from "react";

const GameTimer = ({ socket}) => {
    const timeTimer = 15;//Tiempo del temporizador asignado en segundos
    const [remainingTime, setRemainingTime] = useState(timeTimer);
    const [timerRunning, setTimerRunning] = useState(false);

    const startTimer = () => {
        //setRemainingTime(10);
        setTimerRunning(true);
        handleSendTime(remainingTime);
    };

    const pauseTimer = () => {
        setTimerRunning(false);
    };

    const resetTimer = () => {
        setRemainingTime(timeTimer);
        setTimerRunning(false);
    }

    const handleSendTime = useCallback((time) => {
        //console.log('sending...', statement);
        socket.emit('time', {
            timer: time,
            id: `${socket.id}${Math.random()}`,
            socketID: socket.id,
        });
    }, [socket]);

    useEffect(() => {
        if (timerRunning && remainingTime > 0) {
            const timer = setTimeout(() => {
                setRemainingTime(remainingTime - 1);
            }, 1000);
            handleSendTime(remainingTime);
            return () => clearTimeout(timer);
        }
        handleSendTime(remainingTime);
    }, [timerRunning, remainingTime, handleSendTime]);

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