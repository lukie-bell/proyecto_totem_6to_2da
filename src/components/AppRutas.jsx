import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Inicio from "../pages/Inicio";
import Autentificacion from "./login_empleados";
import "../css/Conjuntocss.css";
import PageRecibido from "../pages/PageRecibido";
import PageEmpleados from "../pages/PageEmpleados";

const AppRouter = ({ user }) => {
  const { rol } = user || {};
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      if (user && ['admin', 'staff'].includes(user.rol)) {
        navigate(window.location.pathname, { replace: true });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user, navigate]);

  return (
    <Routes>
      {/* ✅ Inicio siempre accesible */}
      <Route path="/" element={<Inicio />} />

      {rol === 'admin' && (
        <>
          <Route path="/Recibido" element={<PageRecibido />} />
          <Route path="/Empleados" element={<PageEmpleados />} />
        </>
      )}

      {rol === 'staff' && (
        <>
          <Route path="/Empleados" element={<PageEmpleados />} />
        </>
      )}

      {rol === null && (
        <>
          <Route path="/Recibido" element={<PageRecibido />} />
        </>
      )}

      {/* Fallback a inicio para cualquier ruta no válida */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
