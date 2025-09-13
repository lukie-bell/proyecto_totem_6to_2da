import React, {useState,} from "react";
import { useNavigate  } from "react-router-dom";
import "../css/Conjuntocss.css";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

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

// Función para fecha máxima (7 días después)
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
  const[apellido, setApellido] = useState("");
  const[dni, setDNI] = useState("");
  const[fecha, setFecha] = useState(FechaActual());
  const[motivo, setMotivo] = useState("");

const navigate = useNavigate(); //Eli:variable para guardar el uso del navigate

  //Alertas para errores del usuario
    const [errores, setErrores] = useState({});
    const handleSubmit = async (e) => {
    e.preventDefault();
    const errores = {};

    //Alerta nombre
    if (nombre.trim() === "") {errores.nombre = "Campo nombre no completado";}

    //Alerta apellido
    if (apellido.trim() === "") {errores.nombre = "Campo apellido no completado";}

    //Alerta dni
    if (dni.trim() === "") {errores.dni = "Campo DNI no completado";} 
    if (dni.length !== 8) {errores.dni = "El DNI debe tener exactamente 8 números.";}

    //Alerta fecha
    if (fecha.trim() === "") {errores.fecha = "Campo fecha no completado";}
    else {
      const fechausuario = new Date(fecha);
      const fechamax = new Date(FechaMax());
      if (fechausuario > fechamax) {
        errores.fecha = `La fecha no es válida, fecha máxima: ${fechamax.toLocaleString()}`;
      }
    }

    if (motivo.trim() === "") {errores.motivo = "Campo motivo no completado";}

    // Guardado de errores para mostrarlo despues
    setErrores(errores);

    if (Object.keys(errores).length === 0) {
      try {
      await addDoc(collection(db, 'turnos'), { nombreCompleto: nombre + " " + apellido, dni, fecha, motivo, creadoEn: new Date(), }); //Campos que se van a enviar a la bd.
      setNombre(''); 
      setApellido('');
      setDNI('');
      setFecha(FechaActual());
      setMotivo('');
      navigate("/Recibido", { state: { nombre } });
      } catch (error) {
      console.error(error);
      alert('Error al registrar turno.');
      }
    }
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
                onChange={(e)=>setNombre(e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, ""))}/>
                 {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}
            </div>
              <div>
                <label>Apellido:</label>
                <input type="text"
                value={apellido}
                onChange={(e)=>setApellido(e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, ""))}/>
                 {errores.nombre && <p className="mensaje-error">{errores.apellido}</p>}
            </div> 
            <div>
                <label>DNI:</label>
                <input type="text" maxLength={8}
                value={dni}
                onChange={(e)=>setDNI(e.target.value.replace(/[^0-9]/g, ""))}/>
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
                    <option value="Hablar con un preceptor.">Hablar con un preceptor.</option>
                    <option value="Hablar con un regente.">Hablar con un regente.</option>
                    <option value="Hablar con un directivo.">Hablar con un directivo.</option>
                </select>
                 {errores.motivo && <p className="mensaje-error">{errores.motivo}</p>}
            </div>
            <button className="subt" type="submit">Enviar</button>
        </form>
    </div>
  );
};

export default TurnoFormulario;