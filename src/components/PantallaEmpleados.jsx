import React from "react";
import { useNavigate  } from "react-router-dom";
import { useLocation } from "react-router-dom";
import  "../css/Empleados.css";
import { useState, useEffect } from 'react';
//No se por que en esta version tarda en eliminarse la burbujita despues lo arreglare


const PantallaEmpleados = () => {
    const location = useLocation();
    const { nombre, dni, fecha, motivo, aclaracion } = location.state || {};
     
    //seba:establesco esta tabla de ejemplo para probar el filtro y no recurrir a un json 
    const [lista, setLista] = useState ([ 
        {
            id: 1,
            nombre: "santiago mendoza",
            dni: 28180384,
            fecha: "2025-7-1-12-30",
            motivo: "Hablar con un preceptor.",
            aclaracion: "Hablar con un preceptor."
        },
        {
            id: 2,
            nombre: "rocio iniseta",
            dni: 28188754,
            fecha: "2025-2-4-12-30",
            motivo: "Hablar con un preceptor.",
            aclaracion: "Hablar con un preceptor."
        },
        {
            id: 3,
            nombre: "sebastian naton",
            dni: 32480384,
            fecha: "2025-1-2-12-30",
            motivo: "Hablar con un preceptor.",
            aclaracion: "Hablar con un preceptor."
        }
    ]);

    //seba: ordena la lista de la fecha mas proxima a la mas lejana
   const listaOrdenada = lista.sort((a, b) => {
   const fechaA = a.fecha ? new Date(...a.fecha.split('-').map(Number)) : new Date(0);
   const fechaB = b.fecha ? new Date(...b.fecha.split('-').map(Number)) : new Date(0);
   
   return fechaA - fechaB;
   });

   //seba: es la funcion que se emplea para que el boton de borrar elimine ese dato
   const borrarItem = (id) => {
        setLista(lista.filter(item => item.id !== id)); // Filtra y elimina el elemento con ese ID
    };

/*    const agregaritem = (nombre, dni, fecha, motivo, aclaracion) =>{
        const nuevoitem = {
            id: lista.length+1,
            nombre: {nombre},
            dni: {dni},
            fecha: {fecha},
            motivo:{motivo},
            aclaracion:{aclaracion}
        }
    }

    setLista([lista, agregaritem])
*/

    //ordena correctamente las tablas sin alterar mucho
    useEffect(() => {
    const listaOrdenada = [...lista].sort((a, b) => {
        const fechaA = a.fecha ? new Date(...a.fecha.split('-').map(Number)) : new Date(0);
        const fechaB = b.fecha ? new Date(...b.fecha.split('-').map(Number)) : new Date(0);
        return fechaA - fechaB;
    });

    //setea la nueva tabla
    setLista(listaOrdenada);
    }, [lista]);

   return (
        <div>
            <h1>parte de arriba {nombre}</h1>
            <div className="cajadecajas">
                <div className="cajas"><h2>turnos</h2>
                    <div className="lista">
                        {lista.map((formulario, index) => (
                            <div key={index} className="citas">
                                <p><strong>Nombre: </strong>{formulario.nombre}</p>
                                <p><strong>Dni: </strong>{formulario.dni}</p>
                                <p><strong>Fecha: </strong>{formulario.fecha} </p>
                                <p><strong>Motivo </strong>{formulario.motivo}</p>
                                <p><strong>aclaracion</strong>{formulario.aclaracion}</p>
                                 <button onClick={() => borrarItem(formulario.id)}>Eliminar</button>
                            </div>
                        )) }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PantallaEmpleados;