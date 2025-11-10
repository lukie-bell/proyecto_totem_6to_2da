import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Conjuntocss.css";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { db, autenticacion } from "../config/firebase";
import { signOut } from "firebase/auth";

const PantallaEmpleados = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [turnos, setTurnos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [mostrarOcultos, setMostrarOcultos] = useState(false); // 👈 Nuevo estado

  // Cerrar sesión
  const cerrarSesion = async () => {
    try {
      await signOut(autenticacion);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Cargar turnos
  useEffect(() => {
    const turnosRef = collection(db, "turnos");

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

      // Ordenar por fecha más próxima
      lista.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

      setTurnos(lista);
    });

    return () => unsubscribe();
  }, []);

  // Ocultar turno
  const ocultarTurno = async (id) => {
    const confirmado = window.confirm("¿Querés ocultar este turno?");
    if (!confirmado) return;

    try {
      await updateDoc(doc(db, "turnos", id), { activo: false });
      setTurnos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, activo: false } : t))
      );
    } catch (error) {
      console.error("Error al ocultar turno:", error);
    }
  };

  // Restaurar turno
  const restaurarTurno = async (id) => {
    try {
      await updateDoc(doc(db, "turnos", id), { activo: true });
      setTurnos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, activo: true } : t))
      );
    } catch (error) {
      console.error("Error al restaurar turno:", error);
    }
  };

  // Formatear fecha
  const formatearFecha = (fechaRaw) => {
    if (!fechaRaw) return "";

    if (fechaRaw.toDate) {
      fechaRaw = fechaRaw.toDate();
    } else {
      fechaRaw = new Date(fechaRaw);
    }

    return (
      fechaRaw.toLocaleDateString("es-AR", { day: "2-digit", month: "long" }) +
      " " +
      fechaRaw.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
    );
  };

  // Filtro por nombre, apellido o DNI
  const turnosFiltrados = turnos.filter((t) => {
    const texto = filtro.toLowerCase();

    // Mostrar activos o, si se habilitó, también los ocultos
    if (!mostrarOcultos && t.activo === false) return false;

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

          {/* 👇 Botón para alternar entre ver activos y ocultos */}
          <button
            onClick={() => setMostrarOcultos((prev) => !prev)}
            style={{
              marginTop: "10px",
              backgroundColor: mostrarOcultos ? "#95a5a6" : "#3498db",
            }}
          >
            {mostrarOcultos ? "Ocultar turnos eliminados" : "Mostrar eliminados"}
          </button>

          <div className="lista">
            {turnosFiltrados.length === 0 ? (
              <p>No hay turnos registrados</p>
            ) : (
              turnosFiltrados.map((formulario, index) => (
                <div
                  key={formulario.id || index}
                  className="citas"
                  style={{
                    opacity: formulario.activo === false ? 0.6 : 1,
                    backgroundColor: formulario.activo === false ? "#f5b7b1" : "white",
                  }}
                >
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
                    {formulario.activo === false ? (
                      <button
                        onClick={() => restaurarTurno(formulario.id)}
                        className="eliminar-btn"
                        style={{ backgroundColor: "#2ecc71" }}
                      >
                        Restaurar
                      </button>
                    ) : (
                      <button
                        onClick={() => ocultarTurno(formulario.id)}
                        className="eliminar-btn"
                      >
                        Ocultar
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={cerrarSesion}
            style={{ backgroundColor: "#e74c3c", marginTop: "15px" }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default PantallaEmpleados;
