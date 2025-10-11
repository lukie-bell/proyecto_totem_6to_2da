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
    <div className="cajapre">
      <button className="botonpre"
        onClick={() => setFormAdmin(true)}
      >
        Agregar Admin
      </button>

      {formAdmin && (
        <div>
          {/* Popup */}
          <div>
            <button className="botonpre" onClick={() => setFormAdmin(false)}> 
               ✖
            </button>

            <h2>Agregar Admin</h2>
            <form className="formpre" onSubmit={handleSubmit}> 
              <div>
                <label className="labelpre">Nombre:</label>
                <input className="inputpre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div>
                <label className="labelpre">Email:</label>
                <input className="inputpre"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <button className="enviarpre"
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