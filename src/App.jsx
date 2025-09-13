//ELi: recoratorio de tener que crear la logica para cuando se registren los preceptores !! -_-
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from "./pages/Inicio"
import AppRouter from './components/AppRutas';
import PageRecibido from "./pages/PageRecibido";
import PageEmpleados from "./pages/PageEmpleados";
import Autentificacion from "./components/login_empleados";
import "./css/Formulario.css";

function App() {
  const [usuario, setUsuario] = useState(null);

  //ELI: lineas comentas por numero 12:Es la primera pantalla 13: Lanza activa la siguiente pantalla :> FUNCIONO SE PUDOOOOOOO 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/Recibido" element={<PageRecibido/>} />
        <Route path="/Empleados" element={<PageEmpleados/>} />
        <Route path="/login" element={<Autentificacion/>} />
        <Route path="/*" element={usuario ? <AppRouter usuario={usuario} /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

