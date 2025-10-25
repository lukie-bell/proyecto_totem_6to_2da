//ESTE ES EL epprouter.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PageEmpleados from "../pages/PageEmpleados.jsx";
import Inicio from "../pages/Inicio";
import Autentificacion from "./login_empleados";
import PageRecibido from "../pages/PageRecibido";
import ABM from "../pages/ABM";

const AppRouter = ({ user, setUser }) => {
  const { rol } = user || {};
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (e) => {
      if (user && ["admins", "preceptores"].includes(user.rol)) {
        e.preventDefault();
        window.history.pushState(null, "", window.location.pathname);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [user]);

  const redirigirSiLogueado = () => {
    if (!user || !rol) return <Autentificacion setUser={setUser} />;
    if (rol === "admins") return <Navigate to="/ABM" replace />;
    if (rol === "preceptores") return <Navigate to="/Empleados" replace />;
    return <Navigate to="/" replace />;
  };

  return (
    <Routes>
      {/*rutas sin logeo */}
      <Route path="/" element={<Inicio />} />
      <Route path="/recibido" element={<PageRecibido />} />
      <Route path="/login" element={redirigirSiLogueado()} />

      {/*rutas para los admiSSS */}
      {rol === "admins" && (
        <>
          <Route path="/Empleados" element={<PageEmpleados />} />
          <Route path="/ABM" element={<ABM />} />
        </>
      )}

      {/*rutas para los preseptorESSSS */}
      {rol === "preceptores" && (
        <>
          <Route path="/Empleados" element={<PageEmpleados />} />
        </>
      )}

      {/* Ruta por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;