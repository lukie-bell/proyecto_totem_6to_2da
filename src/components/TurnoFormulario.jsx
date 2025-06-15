import React, {useState} from "react";
import { useNavigate  } from "react-router-dom";
import "../css/Formulario.css";

//Función para establecer la fecha actual como fecha predeterminada.
const FechaActual = () => {
    const fechaactual = new Date(); //Nueva fecha
    const yyyy = fechaactual.getFullYear(); //Año de la fecha
    const mm = String(fechaactual.getMonth() + 1).padStart(2, '0'); //Mes de la fecha, se le agrega un 0 al inicio si la cadena de caracter es menor a 2
    const dd = String(fechaactual.getDate()).padStart(2, '0'); //Día de la fecha, se le agrega un 0 al inicio si la cadena de caracter es menor a 2
    const hh = String(fechaactual.getHours()).padStart(2, '0'); //Hora de la fecha, se le agrega un 0 al inicio si la cadena de caracter es menor a 2
    const min = String(fechaactual.getMinutes()).padStart(2, '0'); //Minutos de la fecha, se le agrega un 0 al inicio si la cadena de caracter es menor a 2
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

const FechaMax = () => {
    const fechamax = new Date(); //Nueva fecha
    fechamax.setDate(fechamax.getDate() + 7);
    const yyyy = fechamax.getFullYear(); //Año de la fecha
    const mm = String(fechamax.getMonth() + 1).padStart(2, '0'); //Mes de la fecha, se le agrega un 0 al inicio si la cadena de caracter es menor a 2
    const dd = String(fechamax.getDate()).padStart(2, '0'); //Día de la fecha, se le agrega un 0 al inicio si la cadena de caracter es menor a 2
    const hh = String(fechamax.getHours()).padStart(2, '0'); //Hora de la fecha, se le agrega un 0 al inicio si la cadena de caracter es menor a 2
    const min = String(fechamax.getMinutes()).padStart(2, '0'); //Minutos de la fecha, se le agrega un 0 al inicio si la cadena de caracter es menor a 2
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};



//Estados de los campos del formulario.
const TurnoFormulario = () =>{
    const[nombre, setNombre] = useState("");
    const[dni, setDNI] = useState("");
    const[fecha, setFecha] = useState(FechaActual());
    const[motivo, setMotivo] = useState("");
    const[aclaracion, setAclaracion] = useState("");

    const navigate = useNavigate(); //Eli:variable para guardar el uso del navigate

//Alertas para errores del usuario
const [errores, setErrores] = useState({});
const handleSubmit = (e) => {
  e.preventDefault();
  const errores = {};

//Alerta nombre
  if (nombre.trim() === "") {
    errores.nombre = "Campo nombre no completado";
  } else {
    const letras = /^[a-zA-Z\s]+$/;
    if (!letras.test(nombre.trim())) {
      errores.nombre = "El nombre no puede contener números.";
    }
  }

  //Alerta dni
  if (dni.trim() === "") {
    errores.dni = "Campo DNI no completado";
  } else {
    const DNI = Number(dni);
    if (isNaN(DNI)) {
      errores.dni = "El DNI no puede contener letras.";
    } else if (DNI < 0) {
      errores.dni = "El DNI no puede ser negativo.";
    } else if (dni.length !== 8) {
      errores.dni = "El DNI debe tener 8 números.";
    }
  }

  //Alerta fecha
  if (fecha.trim() === "") {
    errores.fecha = "Campo fecha no completado";
  } else {
    const fechausuario = new Date(fecha);
    const fechamax = new Date(FechaMax());
    if (fechausuario > fechamax) {
      errores.fecha = `La fecha no es válida, fecha máxima: ${fechamax.toLocaleString()}`;
    }
  }

  if (motivo.trim() === "") {
    errores.motivo = "Campo motivo no completado";
  }

  // Guardado de errores para mostrarlo despues
  setErrores(errores);

  if (Object.keys(errores).length === 0) {
    alert("Formulario enviado");
    navigate("/PantallaRecibida", { state: { nombre } });
  }
};

//Función del boton restaurar.
const restaurar = () => {
    setNombre('');
    setDNI('');
    setFecha(FechaActual());
    setMotivo('');
    setAclaracion('');
};

//Estructura del formulario 
return(
    <div className="formulario">
        <form onSubmit={handleSubmit} className="formu">
            
            <div className="formtxt">Formulario de turno</div>

                <div>
                <label>Nombre:</label>
                <input type="text"
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}/>
                 {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}
            </div>
            <div>
                <label>DNI:</label>
                <input type="text" maxLength={8}
                value={dni}
                onChange={(e)=>setDNI(e.target.value)}/>
                 {errores.dni && <p className="mensaje-error">{errores.dni}</p>}
            </div>
            <div>
                <label>Fecha:</label>
                <input type="datetime-local"
                value={fecha}
                onChange={(e)=>setFecha(e.target.value)}
                min={FechaActual()}/>
                 {errores.fecha && <p className="mensaje-error">{errores.fecha}</p>}
            </div>
            <div>
                <label>Motivo:</label>
                <select value={motivo} onChange={(e)=>setMotivo(e.target.value)}>
                    <option value="">----------Elegir Motivo----------</option>
                    <option value="opcion1">Hablar con un preceptor.</option>
                    <option value="opcion2">Hablar con un regente.</option>
                    <option value="opcion3">Hablar con un directivo.</option>
                </select>
                 {errores.motivo && <p className="mensaje-error">{errores.motivo}</p>}
            </div>
            <div>
                <label>Aclaración:</label>
                <textarea rows="4" cols="5" maxLength={1000}
                value={aclaracion}
                onChange={(e)=>setAclaracion(e.target.value)}/>
            </div>

            <button className="rest" type="button" onClick={restaurar}>Restaurar</button>
            <button className="subt" type="submit">Enviar</button>
        </form>
    </div>
);
};

export default TurnoFormulario;