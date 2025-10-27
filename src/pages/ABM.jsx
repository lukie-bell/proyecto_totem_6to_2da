import React, { useState } from "react";
import AltaPreceptor from "../components/AltaPreceptor";
import ListaPreceptores from "../components/ListaPreceptores";
import AltaAdmin from "../components/AltaAdmin";
import ListaAdmins from "../components/ListaAdmins";

//para el boton de cerrar sesion
import { signOut } from "firebase/auth";
import { autenticacion } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const ABM = () => {
  const [admin, setAdmin] = useState(false);
  const [prece, setPrece] = useState(false);
  const navigate = useNavigate();//para el boton de cerrar sesion 
  
  const cerrarSesion = async () => {
    try {
      await signOut(autenticacion);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);//por als dudas
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <button onClick={() => { setAdmin(true); setPrece(false); }}>Admins</button>
        <button onClick={() => { setPrece(true); setAdmin(false); }}>Preceptores</button>
        <button onClick={cerrarSesion} style={{backgroundColor: "#e74c3c"}}>CERRAR SESION</button>
      </div>

      <div className="content">
        {prece && (
          <div className="section">
            <AltaPreceptor />
            <ListaPreceptores />
          </div>
        )}

        {admin && (
          <div className="section">
            <AltaAdmin />
            <ListaAdmins />
          </div>
        )}
      </div>
    </div>
  );
};

export default ABM;