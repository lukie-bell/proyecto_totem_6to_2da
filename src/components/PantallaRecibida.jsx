// src/components/PantallaRecibida.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../css/PantallaRecibida.css";

const PantallaRecibida = () => {

    /*Linea 43: <img src={epet20Logo} alt="E.P.E.T. N° 20 Logo" className="school-logo" />*/
    return (
        <div className="pantalla-recibida-wrapper">
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