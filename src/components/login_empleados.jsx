//ELI: esta pantalla esta pensada para el login del staff de la escuela
import {autenticacion, autenticacionGoogle} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "../css/LoginCss.css";

const Autentificacion =() =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registro = async ()=>{
        try{
        await createUserWithEmailAndPassword(autenticacion, email, password);
        navigate("/PageEmpleados");
        }catch(err){
            console.error(err);
        }
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


    return (
        <div className="message-box">
            <h1>REGISTRARSE</h1>
            <input
                placeholder="Gmial"
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input 
            placeholder="contraseña"
            onChange={(e)=> setPassword(e.target.value)}
            />
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