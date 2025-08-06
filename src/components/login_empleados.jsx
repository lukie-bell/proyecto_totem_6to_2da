//ELI: esta pantalla esta pensada para el login del staff de la escuela
import {autenticacion, autenticacionGoogle} from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./../css/PantallaRecibida.css";

const Autentificacion =() =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const registro = async ()=>{
        try{
        await createUserWithEmailAndPassword(autenticacion, email, password);
        navigate("/PantallaEmpleados");
        }catch(err){
            console.error(err);
        }
    };
const registroConGoogle = async ()=>{
        try{
        await signInWithPopup (autenticacion, autenticacionGoogle);
        navigate("/PantallaEmpleados");
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
            <input
                placeholder="Gmial"
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input 
            placeholder="contraseña"
            onChange={(e)=> setPassword(e.target.value)}
            />
            <button onClick={registro}>registrarse</button>
            <button onClick={registroConGoogle}>registrase con google</button>
            <button onClick={SignOut}>cancelar</button>
        </div>
    );
}
export default Autentificacion;