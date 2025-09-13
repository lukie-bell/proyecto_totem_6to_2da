//ELi: recoratorio de tener que crear la logica para cuando se registren los preceptores !! -_-
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio"
import Autentificacion from "./components/login_empleados";
import "../src/css/Conjuntocss.css";
import PageRecibido from "./pages/PageRecibido";
import PageEmpleados from "./pages/PageEmpleados";

function App() {
  //ELI: lineas comentas por numero 12:Es la primera pantalla 13: Lanza activa la siguiente pantalla :> FUNCIONO SE PUDOOOOOOO 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/Recibido" element={<PageRecibido/>} />
        <Route path="/Empleados" element={<PageEmpleados/>} />
        <Route path="/login" element={<Autentificacion/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
