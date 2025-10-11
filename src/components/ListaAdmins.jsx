// src/components/ListaProductos.jsx
import React, { useState } from "react";
import { useAdmins } from "../hooks/useAdmins";

const ListaAdmins = () => {
    const {admins, loading, eliminarAdmin, editarAdmin} = useAdmins();
    const [adminEditando, setAdminEditando] = useState(null);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    if (loading) return <p>Cargando admins...</p>;

    const handleEditClick = (admin) => {
        setAdminEditando(admin.id);
        setNombre(admin.nombre);
        setEmail(admin.email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !email) {
        alert("Todos los campos son obligatorios");
        return;
        }

        await editarAdmin(adminEditando, {
        nombre,
        email,
        });

        // cerrar modal
        setAdminEditando(null);
    };

    return (
        <div>
            <h2>Lista de Admins</h2>

            {admins.length === 0 ? (
                <p>No hay admins registrados</p>
                ) : (
                <div className="listatabla">
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td>{admin.nombre}</td>
                                    <td>{admin.email}</td>
                                    <td className="opc">
                                    <button className="botmod"
                                        onClick={() => handleEditClick(admin)}
                                    >
                                    Modificar
                                    </button>
                                    <button className="botelim"
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
            )}

            {/* Popup Boton Editar*/}
            {adminEditando && (
                <div>
                    {/* Popup */}
                    <div>

                        {/* Titulo */}
                        <h3>Editar Admin</h3>
                        
                        {/* Formulario */}
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                
                            <div>
                                {/* Boton Cancelar */}
                                <button
                                type="button"
                                onClick={() => setAdminEditando(null)}
                                >
                                Cancelar
                                </button>

                                {/* Boton Guardar Cambios */}
                                <button
                                type="submit"
                                >
                                Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
  );
};

export default ListaAdmins;