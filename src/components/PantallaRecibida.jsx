// src/components/PantallaRecibida.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../css/Conjuntocss.css";
import logo from "./../assets/epet20.png";

const PantallaRecibida = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // Vuelve a la page turno formulario luego de 5 segundos.
        const timer = setTimeout(() => {
        navigate("/", { replace: true }); //No deja volver a la page recibido.
    }, 5000);

    return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="page-recibido">
        <main className="main-content">
            <div className="message-box-recibido">
                <div><img src={logo} alt="Logo" className="school-logo" /></div>
                <p>Su turno fue cargado correctamente.</p>
                <p>Gracias por usar.</p>
                <p>Que tenga un buen día.</p>
            </div>
        </main>
        </div>
    );
};

export default PantallaRecibida;