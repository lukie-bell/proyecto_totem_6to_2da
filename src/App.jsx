//ELi: recoratorio de tener que crear la logica para cuando se registren los preceptores !! -_-
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PantallaRecibida from "./components/PantallaRecibida"
import TurnoFormulario from "./components/TurnoFormulario"
import "../src/css/Formulario.css";

function App() {
    //ELI: lineas comentas por numero 12:Es la primera pantalla 13: Lanza activa la siguiente pantalla :> FUNCIONO SE PUDOOOOOOO 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TurnoFormulario />} />
        <Route path="/PantallaRecibida" element={<PantallaRecibida />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
