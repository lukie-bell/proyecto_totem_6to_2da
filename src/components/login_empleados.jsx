// login_empleados.jsx

//dependecias
import React, { useEffect,  setUser} from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { autenticacion, autenticacionGoogle, db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import "../css/Conjuntocss.css";//coco

const Autentificacion = ({ setUser }) => {
    const navigate = useNavigate();

    // verifica si el usuario ya está logeado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(autenticacion, async (user) => {
        if (user) {
            const rol = await obtenerRol(user.email);
            if (rol) {
                setUser({ email: user.email, rol });
                if (rol === "admins") navigate("/ABM");
                else if (rol === "preceptores") navigate("/Empleados");
            } else {
            alert("Tu usuario no tiene permisos asignados.");
            await signOut(autenticacion);
            }
        }
    });
        return () => unsubscribe();
    }, [navigate, setUser]);

    //obtiene el rol del usuario desde las colecciones de Firestore
    const obtenerRol = async (email) => {
        const colecciones = ["admins", "preceptores"];
        for (const col of colecciones) {
            const snapshot = await getDocs(collection(db, col));
            for (const doc of snapshot.docs) {
                if (doc.data().email === email) return col;
            }
        }
        return null;
    };

    // inicio login con Google
    const registroConGoogle = async () => {
        try {
            const result = await signInWithPopup(autenticacion, autenticacionGoogle);
            const correo = result.user.email;
            const rol = await obtenerRol(correo);

        if (!rol) {
            alert("No tenés permisos para acceder. Contactá al administrador.");
            await signOut(autenticacion);
            return;
        }

        setUser({ email: correo, rol });
        if (rol === "admins") navigate("/ABM");
        else if (rol === "preceptores") navigate("/Empleados");
        } catch (err) {
            console.error("Error al iniciar sesión con Google:", err);
            alert("Error al iniciar sesión con Google.");
        }
    };
    const SignOut = async ()=>{
        try{
        await signOut (db);
        navigate("/");
        }catch(err){
            console.error(err);
        }
    };

//Cuerpo del Login
    return (
        <div className="page-login">
            <div className="message-box">
                <h1>REGISTRARSE</h1>

                    <button className="google-button" onClick={registroConGoogle}>
                        <img className="google" src="/icons8-logo-de-google-48.png" alt="Logo Google" />
                        <p>Iniciar sesión con Google</p>
                    </button>

                    <button onClick={SignOut}>Cancelar</button>
            </div>
        </div>
    );
}

export default Autentificacion;