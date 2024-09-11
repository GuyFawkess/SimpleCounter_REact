import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons'

const Home = () => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [countdown, setCountdown] = useState(false);
    const [inputSeconds, setInputSeconds] = useState('');

    // transformar total de segundos en horas minutos y segundos

    const setTimeFromSeconds = (totalSeconds) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        setHours(h);
        setMinutes(m);
        setSeconds(s);
    }

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    // countdown logic
                    if (countdown) {
                        if (prevSeconds > 0) {
                            return prevSeconds - 1;
                        } else if (minutes > 0) {
                            setMinutes((prevMinutes) => prevMinutes - 1);
                            return 59;
                        } else if (hours > 0) {
                            setHours((prevHours) => prevHours - 1);
                            setMinutes(59);
                            return 59;
                        } else {
                            clearInterval(interval); //parar el countdown a 0;
                            alert('Llegaste a 0!!');
                            return 0;
                        }
                    } else {
                        //counting up logic
                        if (prevSeconds < 59) {
                            return prevSeconds + 1;
                        } else {
                            setMinutes((prevMinutes) => {
                                if (prevMinutes < 59) {
                                    return minutes + 1
                                } else {
                                    setHours((prevHours) => prevHours + 1);
                                    return 0;
                                }
                            });
                            return 0;
                        }
                    }
                });
            }, 1000)
        }
        return () => clearInterval(interval);
    }, [isRunning, countdown, hours, minutes]);

    // el boton toggle entre puuse y resmune

    const toggleRunning = () => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    }

    // resetear

    const handleReset = () => {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setIsRunning(false);
        setCountdown(false);
    };

    // el input de segundos

    const handleInput = (e) => {
        setInputSeconds(e.target.value);
    }

    // ahora metiendo el valor y convertirlo en minutos horas y segundos

    const handleStartCountdown = () => {
        const totalSeconds = parseInt(inputSeconds, 10);
        if (isNaN(totalSeconds) || totalSeconds <= 0) {
            handleReset();
            return;
        }
        setTimeFromSeconds(totalSeconds);
        setCountdown(true);
        setIsRunning(true);
        setInputSeconds('');
    }

    return (
        <>
            <div className="bigCounter">
                <div className="clock">
                    <FontAwesomeIcon icon={faClock} />
                </div>
                <div className="hours">{hours < 10 ? `0${hours}` : hours}</div>
                <div className="minutes">{minutes < 10 ? `0${minutes}` : minutes}</div>
                <div className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</div>
            </div>
            <div className="d-flex justify-content-center m-4">
                <input type="number" value={inputSeconds} onChange={handleInput} placeholder="Introducir segundos" />
                <button className="btn btn-primary mx-2" onClick={handleStartCountdown}>Cuenta Atrás</button>
            </div>
            {/* botones */}
            <div className="d-flex justify-content-center">
                <button className={isRunning ? 'btn btn-secondary' : 'btn btn-success'} onClick={toggleRunning}>{isRunning ? 'Pause' : 'Play'}</button>
                <button className="btn btn-danger mx-2" onClick={handleReset}>Reset</button>
            </div>

        </>
    )
}
export default Home;