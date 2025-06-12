import React, {useState} from "react";
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

//Estados de los campos del formulario.
const TurnoFormulario = () =>{
    const[nombre, setNombre] = useState("");
    const[dni, setDNI] = useState("");
    const[fecha, setFecha] = useState(FechaActual());
    const[motivo, setMotivo] = useState("");
    const[aclaracion, setAclaracion] = useState("");

//Alertas para errores del usuario
const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(nombre.trim() === ""){
        alert("Campo nombre no completado")
        return;
    }
    
    
    if(dni.trim() === ""){
        alert("Campo DNI no completado")
        return;
    }

    
    if(fecha.trim() === ""){
        alert("Campo fecha no completado")
        return;
    }

    
    if(motivo.trim() === ""){
        alert("Campo motivo no completado")
        return;
    }

    
    if(aclaracion.trim() === ""){
        alert("Campo aclaración no completado")
        return;
    }

    alert("Formulario enviado")
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
    <form onSubmit={handleSubmit} className="formu">
        
        <div className="formtxt">Formulario de turno</div>

            <div>
            <label>Nombre</label>
            <input type="text"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}/>
        </div>
        <div>
            <label>DNI:</label>
            <input type="number"
            value={dni}
            onChange={(e)=>setDNI(e.target.value)}/>
        </div>
        <div>
            <label>Fecha:</label>
            <input type="datetime-local"
            value={fecha}
            onChange={(e)=>setFecha(e.target.value)}/>
        </div>
        <div>
            <label>Motivo:</label>
            <select value={motivo} onChange={(e)=>setMotivo(e.target.value)}>
                <option value="">ELEGIR MOTIVO</option>
                <option value="opcion1">Hablar con un preceptor.</option>
                <option value="opcion2">Hablar con un regente.</option>
                <option value="opcion3">Hablar con un directivo.</option>
            </select>
        </div>
        <div>
            <label>Aclaración:</label>
            <input type="text"
            value={aclaracion}
            onChange={(e)=>setAclaracion(e.target.value)}/>
        </div>

        <button className="rest" type="button" onClick={restaurar}>Restaurar</button>
        <button className="subt" type="submit">Enviar</button>
    </form>
);
};

export default TurnoFormulario;