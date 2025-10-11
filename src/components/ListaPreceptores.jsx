// src/components/ListaPreceptores.jsx
import React, { useState } from "react";
import { usePreceptores } from "../hooks/usePreceptores";

const ListaPreceptores = () => {
  const { preceptores, loading, eliminarPreceptor, editarPreceptor } = usePreceptores();
  const [preceptorEditando, setPreceptorEditando] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [errores, setErrores] = useState({});
  const [mostrarPopup, setMostrarPopup] = useState(false);

  if (loading) return <p>Cargando preceptores...</p>;

  const handleEditClick = (prece) => {
    setPreceptorEditando(prece.id);
    setNombre(prece.nombre);
    setEmail(prece.email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    if (nombre.trim() === "") nuevosErrores.nombre = "Campo nombre no completado";
    if (email.trim() === "") nuevosErrores.email = "Campo email no completado";
    if (email && !/\S+@\S+\.\S+/.test(email)) nuevosErrores.email = "Email inválido";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setMostrarPopup(true);
      return;
    }

    await editarPreceptor(preceptorEditando, { nombre, email });

    // limpiar y cerrar el popup de edición
    setPreceptorEditando(null);
    setErrores({});
  };

  return (
    <div>
      <h2>Lista de Preceptores</h2>

      {preceptores.length === 0 ? (
        <p>No hay preceptores registrados</p>
      ) : (
        <div className="listas-contenedor">
        <div className="listatabla">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {preceptores.map((prece) => (
                <tr key={prece.id}>
                  <td>{prece.nombre}</td>
                  <td>{prece.email}</td>
                  <td className="opc">
                    <button className="botmod" onClick={() => handleEditClick(prece)}>
                      Modificar
                    </button>
                    <button className="botelim" onClick={() => eliminarPreceptor(prece.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}

      {/* POPUP EDITAR */}
      {preceptorEditando && (
        <div className="bloqueo" style={{backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(4px)" }}>
          <div className="popupsconten" style={{
        backgroundColor: "#1e1e1e",
  border: "5px solid #5FA8C0",
  borderRadius: "20px",
  padding: "30px",
  color: "white",
  width: "90%",
  maxWidth: "500px",
  boxShadow: "0 0 25px rgba(0,0,0,0.8)",
  boxSizing: "border-box",
  overflowY: "auto",
  maxHeight: "90vh",
      }}>
            <h3 className="hpop" style={{ color: "#5FA8C0"}}>
              Editar Preceptor
            </h3>

            <form className="formpre" onSubmit={handleSubmit}>
              <div>
                <label className="labelpre">Nombre:</label>
                <input
                  className="inputpre"
                  type="text"
                  value={nombre}
                  onChange={(e) =>
                    setNombre(e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, ""))
                  }
                />
                <p className="mensajeer">{errores.nombre || "\u00A0"}</p>
              </div>

              <div>
                <label className="labelpre">Email:</label>
                <input
                  className="inputpre"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="mensajeer">{errores.email || "\u00A0"}</p>
              </div>

              <div>
                <button
                  type="button"
                  className="botonpre"
                  onClick={() => setPreceptorEditando(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="enviarpre" style={{width: "auto", fontSize:20, padding: 10, margin:10,}}>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP DE FALTAN CAMPOS */}
      {mostrarPopup && (
        <div className="bloqueo">
          <div className="popupscont">
            <h3 className="hpop">¡Faltan completar campos!</h3>
            <pre>
              {Object.values(errores)
                .filter(Boolean)
                .join("\n")}
            </pre>
            <button
              onClick={() => {
                setMostrarPopup(false);
                setErrores({});
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaPreceptores;
