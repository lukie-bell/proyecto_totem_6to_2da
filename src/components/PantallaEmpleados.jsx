import React from "react";


const PantallaEmpleados = () => {
    const location = useLocation();
    const { nombre, apellido, dni, fecha, motivo, aclaracion } = location.state || {};

    return (
        <div>
            <h2>Datos recibidos:</h2>
            <p>Nombre: {nombre}</p>
            <p>DNI: {dni}</p>
            <p>Fecha: {fecha}</p>
            <p>Motivo: {motivo}</p>
            <p>Aclaración: {aclaracion}</p>
        </div>
    );
};

export default PantallaEmpleados;