import { useState } from "react";
import { useAdmins } from "../hooks/useAdmins";

const AltaAdmin = () => {
  const { agregarAdmin } = useAdmins();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [formAdmin, setFormAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Alertas
    if (!nombre || !email) {
      alert("Todos los campos son obligatorios");
      return;
    }

    await agregarAdmin({
      nombre,
      email,
    });

    setNombre("");
    setEmail("");
  };

  return (
    <div>
      <button
        onClick={() => setFormAdmin(true)}
      >
        Agregar Admin
      </button>

      {formAdmin && (
        <div>
          {/* Popup */}
          <div>
            <button
              onClick={() => setFormAdmin(false)}
            >
              ✖
            </button>

            <h2>Agregar Admin</h2>
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
                <button
                type="submit"
                >
                Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AltaAdmin;