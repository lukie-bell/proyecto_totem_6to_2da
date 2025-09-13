// src/components/PantallaRecibida.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../css/Conjuntocss.css";
import logo from "./../assets/epet20.png";

// hay cosas que estan vinculadas al css de login.css

const PantallaRecibida = () => {

    return (
        <div className="pantalla-recibida-wrapper">
            <main className="main-content">
                <div className="message-box"> 
                    <img src={logo} alt="Logo" className="school-logo"/>
                    <p>Su turno fue cargado correctamente.</p>
                    <p>Gracias por usar.</p>
                    <p>Que tenga un buen día.</p>
                </div>
            </main>
        </div>
    );
};
export default PantallaRecibida;