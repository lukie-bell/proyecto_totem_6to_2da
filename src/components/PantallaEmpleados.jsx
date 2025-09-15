import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../css/Conjuntocss.css";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

/* los filtros llegaran en un futuro ahora los turnos se ordenaran por orden de llagada */
                                /* seba compra bitcoin */

const PantallaEmpleados = () => {
  const location = useLocation();
  const { nombre, dni, fecha, motivo, aclaracion } = location.state || {};

  const [turnos, setTurnos] = useState([]);

  // Seba: obtener la informacion de turnos de Firestore en tiempo real
  useEffect(() => {
    const turnosRef = collection(db, "turnos");

    // Seba: usamos onSnapshot que escucha los cambios en tiempo real
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
      setTurnos(lista);
    });

    // Seba: usamos Cleanup para cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  // Seba: Función para eliminar turno
  const borrarItem = async (id) => {
  const confirmado = window.confirm("¿Estás seguro que querés eliminar este turno?");
  if (!confirmado) return; // Si cancelan, no hace nada

  try {
    await deleteDoc(doc(db, "turnos", id));
    setTurnos((prev) => prev.filter((turno) => turno.id !== id));
  } catch (error) {
    console.error("Error al eliminar turno:", error);
  }
};


  return (
    <div>
      <div className="cajadecajas">
        <div className="cajas">
          <h2>Lista de Turnos</h2>
          <div className="lista">
            <center>
              {turnos.length === 0 ? (
                <p>No hay turnos registrados</p>
              ) : (
                turnos.map((formulario, index) => (
                  <div key={formulario.id || index} className="citas">
                    <center>
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
                        {formulario.fecha}
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
                      <button
                        onClick={() => borrarItem(formulario.id)}
                        className="eliminar-btn"
                      >
                        Eliminar
                      </button>
                    </center>
                  </div>
                ))
              )}
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantallaEmpleados;
