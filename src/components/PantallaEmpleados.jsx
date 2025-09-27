import React, { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom";
import "../css/Conjuntocss.css";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const PantallaEmpleados = () => {
  const location = useLocation();
  const { nombre, dni, fecha, motivo, aclaracion } = location.state || {};

  // seba: Guardado de las listas 
  const [turnos, setTurnos] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const turnosRef = collection(db, "turnos");
    
    // seba: Escucha en tiempo real, tranformacion de datos y regreso de lista
    const unsubscribe = onSnapshot(turnosRef, (snapshot) => {
      const lista = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          nombre: data.nombre || data.nombreCompleto?.split(" ").slice(0, -1).join(" "),
          apellido: data.apellido || data.nombreCompleto?.split(" ").slice(-1).join(" "),
        };
      });

      // seba: Ordenamos por fecha más próxima
      lista.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return fechaA - fechaB;
      });

      setTurnos(lista);
    });

    return () => unsubscribe();
  }, []);

  // seba: Eliminar turno

  const borrarItem = async (id) => {
    const confirmado = window.confirm("¿Estás seguro que querés eliminar este turno?");
    if (!confirmado) return;

    try {
      await deleteDoc(doc(db, "turnos", id));
      setTurnos((prev) => prev.filter((turno) => turno.id !== id));
    } catch (error) {
      console.error("Error al eliminar turno:", error);
    }
  };

  // seba: Filtrado de fecha

  const formatearFecha = (fechaRaw) => {
    if (!fechaRaw) return "";

    if (fechaRaw.toDate) {
      fechaRaw = fechaRaw.toDate();
    } else {
      fechaRaw = new Date(fechaRaw);
    }

    return (
      fechaRaw.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "long",
      }) +
      " " +
      fechaRaw.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  // seba: Filtro por nombre, apellido o dni 

  const turnosFiltrados = turnos.filter((t) => {
    const texto = filtro.toLowerCase();
    return (
      t.nombre?.toLowerCase().includes(texto) ||
      t.apellido?.toLowerCase().includes(texto) ||
      t.dni?.toString().includes(texto)
    );
  });

  return (
    <div className="pantalla">
      <div className="cajadecajas">
        <div className="cajas">
          <h2>Lista de Turnos</h2>

          <input
            type="text"
            placeholder="Buscar por nombre, apellido o DNI"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="input-busqueda"
          />

          <div className="lista">
            {turnosFiltrados.length === 0 ? (
              <p>No hay turnos registrados</p>
            ) : (
              turnosFiltrados.map((formulario, index) => (
                <div key={formulario.id || index} className="citas">
                  <p>
                    <strong>Nombre: </strong>
                    {formulario.nombre} {formulario.apellido}
                  </p>
                  <p>
                    <strong>DNI: </strong>
                    {formulario.dni}
                  </p>
                  <p>
                    <strong>Fecha: </strong>
                    {formatearFecha(formulario.fecha)}
                  </p>
                  <p>
                    <strong>Motivo: </strong>
                    {formulario.motivo}
                  </p>
                  {formulario.aclaracion && (
                    <p>
                      <strong>Aclaración: </strong>
                      {formulario.aclaracion}
                    </p>
                  )}
                  <div className="eliminar">
                    <button
                    onClick={() => borrarItem(formulario.id)}
                    className="eliminar-btn"
                  >
                    Eliminar
                  </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantallaEmpleados;

/* firma del más profecional ◄:•D */