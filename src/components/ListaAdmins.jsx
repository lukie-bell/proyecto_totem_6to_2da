import React, { useState } from "react";
import { useAdmins } from "../hooks/useAdmins";

const ListaAdmins = () => {
  const { admins, loading, eliminarAdmin, editarAdmin } = useAdmins();
  const [adminEditando, setAdminEditando] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [errores, setErrores] = useState({});
  const [mostrarPopup, setMostrarPopup] = useState(false);

  if (loading) return <p>Cargando admins...</p>;

  const handleEditClick = (admin) => {
    setAdminEditando(admin.id);
    setNombre(admin.nombre);
    setEmail(admin.email);
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

    await editarAdmin(adminEditando, { nombre, email });

    // cerrar popup de edición
    setAdminEditando(null);
    setErrores({});
  };

  return (
    <div>
      <h2>Lista de Admins</h2>

      {admins.length === 0 ? (
  <p>No hay admins registrados</p>
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
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.nombre}</td>
              <td>{admin.email}</td>
              <td className="opc">
                <button
                  className="botmod"
                  onClick={() => handleEditClick(admin)}
                >
                  Modificar
                </button>
                <button
                  className="botelim"
                  onClick={() => eliminarAdmin(admin.id)}
                >
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
      {adminEditando && (
        <div className="bloqueo" style={{backgroundColor: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(4px)" }}>
          <div className="popupscont" style={{ backgroundColor: "#1e1e1e",
  border: "5px solid #5FA8C0",
  borderRadius: "20px",
  padding: "30px",
  color: "white",
  width: "90%",
  maxWidth: "500px",
  boxShadow: "0 0 25px rgba(0,0,0,0.8)",
  boxSizing: "border-box",
  overflowY: "auto",
  maxHeight: "90vh", }}>
            <h3 className="hpop" style={{ color: "#5FA8C0" }}>Editar Admin</h3>

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
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="mensajeer">{errores.email || "\u00A0"}</p>
              </div>

              <div>
                <button
                  type="button"
                  className="botonpre"
                  onClick={() => setAdminEditando(null)}
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

export default ListaAdmins;