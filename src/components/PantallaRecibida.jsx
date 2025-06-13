
// src/components/PantallaRecibida.jsx
import React from "react";
import { useLocation } from "react-router-dom";

//variables para poder usar el reloj para el head de la pagina
const $tiempo =document.querySelector('.tiempo'),
$fecha = document.querySelector('.fecha');
/*
function relojDigital (){ //reloj virtual
    let f= new Date(),
    dia = f.getDate(),
    mes = f.getMonth() + 1,
    anio = f.getFullYear(),
    DiaSemana = f.getDay();

    dia = ('0' + dia).slice(-2);
    mes = ('0' + mes).slice(-2)

    let timeString = f.toLocaleDateString();
    $tiempo.innerHTML = timeString;

    let semana = ['lunes','martes','miercoles','jueves','viernes','sabado','domingo'];
    let showSemana =(semana[DiaSemana]);
    $fecha.innerHTML =`${dia}/${mes}/${anio} ${showSemana}`
}
setInterval(() => {
relojDigital ();
}, 1000);
*/
const PantallaRecibida = () => {
    const location = useLocation();
    const { nombre } = location.state || {};

    return (
    <div>
        <h1>¡Hola, {nombre}!</h1>
    </div>
    );
};
export default PantallaRecibida;