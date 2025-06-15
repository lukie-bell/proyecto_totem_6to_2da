// src/components/PantallaRecibida.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import '../styles/PantallaRecibida.css';
import epet20Logo from '../assets/epet20logo.png'; 

const $tiempo =document.querySelector('.tiempo'),
$fecha = document.querySelector('.fecha');

const PantallaRecibida = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { nombre } = location.state || {};

    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const handleEmployeeClick = () => {
        navigate('/employee-dashboard');
    };

    const handleUserClick = () => {
        navigate('/user-dashboard');
    };

    return (
        <div className="pantalla-recibida-wrapper">
            <header className="header">
                <div className="header-left">
                    <img src={epet20Logo} alt="E.P.E.T. N° 20 Logo" className="school-logo" />
                    <span className="school-name">E.P.E.T. N° 20</span>
                </div>
                <div className="header-center">
                    <button className="header-button" onClick={handleEmployeeClick}>Empleado</button>
                    <button className="header-button" onClick={handleUserClick}>Usuario</button>
                </div>
                <div className="header-right">
                    {currentTime}
                </div>
            </header>

            <main className="main-content">
                <div className="message-box">
                    <p>Su turno fue cargado correctamente.</p>
                    <p>Gracias por usar.</p>
                    <p>Que tenga un buen día.</p>
                </div>
            </main>
        </div>
    );
};
export default PantallaRecibida;