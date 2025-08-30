//ELI: esta pantalla esta pensada para el login del staff de la escuela
import {autenticacion, autenticacionGoogle} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginCss.css";

//Estados de componente
const Autentificacion =() =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const navigate = useNavigate();

//funciones de autenticación
 const registro = async ()=>{
        try{
        await createUserWithEmailAndPassword(autenticacion, email, password);
        navigate("/PageEmpleados");
        }catch(err){
            console.error(err);
        }

        let valid = true;

        if(!email){
            setErrorEmail("Campo Gmail no completado");
            valid = false;
        } else setErrorEmail("");

        if(!password){
            setErrorPassword("Campo Contraseña no completado");
            valid = false;
        } else setErrorPassword("");

        if(!valid) return;
    };

const registroConGoogle = async ()=>{
        try{
        await signInWithPopup (autenticacion, autenticacionGoogle);
        navigate("/PageEmpleados");
        }catch(err){
            console.error(err);
        }
    };
const SignOut = async ()=>{
        try{
        await signOut (autenticacion);
        navigate("/");
        }catch(err){
            console.error(err);
        }
    };

//Cuerpo del Login
    return (
        <div className="message-box">
            <h1>REGISTRARSE</h1>
            <input
                placeholder="Gmial"
               value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className={errorEmail ? "input-error" : ""}
            />
            {errorEmail && <p className="error-messages">{errorEmail}</p>}

            <input 
            placeholder="contraseña"
            value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className={errorPassword ? "input-error" : ""}
            />
            {errorPassword && <p className="error-message">{errorPassword}</p>}

            <button onClick={registro}>registrarse</button>
            <button onClick={registroConGoogle} className="ini">
                <img src="/icons8-logo-de-google-48.png" alt="Logo Google" />
                <p>Iniciar sesión con google</p>
            </button>
            <button onClick={SignOut}>cancelar</button>
        </div>
    );
}
export default Autentificacion;