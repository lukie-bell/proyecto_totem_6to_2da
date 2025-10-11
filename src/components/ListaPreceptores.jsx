// src/components/ListaProductos.jsx
import React, { useState } from "react";
import { usePreceptores } from "../hooks/usePreceptores";

const ListaPreceptores = () => {
    const { preceptores, loading, eliminarPreceptor, editarPreceptor} = usePreceptores();
    const [preceptorEditando, setPreceptorEditando] = useState(null);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");

    if (loading) return <p>Cargando preceptores...</p>;

    const handleEditClick = (prece) => {
        setPreceptorEditando(prece.id);
        setNombre(prece.nombre);
        setEmail(prece.email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !email) {
        alert("Todos los campos son obligatorios");
        return;
        }

        await editarPreceptor(preceptorEditando, {
        nombre,
        email,
        });

        // cerrar modal
        setPreceptorEditando(null);
    };

    return (
        <div>
            <h2>Lista de Preceptores</h2>

            {preceptores.length === 0 ? (
                <p>No hay preceptores registrados</p>
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
                            {preceptores.map((prece) => (
                                <tr key={prece.id}>
                                    <td>{prece.nombre}</td>
                                    <td>{prece.email}</td>
                                    <td className="opc"> 
                                    <button className="botmod"
                                        onClick={() => handleEditClick(prece)}
                                    >
                                    Modificar
                                    </button>
                                    <button className="botelim"
                                        onClick={() => eliminarPreceptor(prece.id)}
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
            {preceptorEditando && (
                <div>
                    {/* Popup */}
                    <div>

                        {/* Titulo */}
                        <h3>Editar Preceptor</h3>
                        
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
                                onClick={() => setPreceptorEditando(null)}
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

export default ListaPreceptores;