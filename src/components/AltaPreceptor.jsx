import { useState } from "react";
import { usePreceptores } from "../hooks/usePreceptores";

const AltaPreceptor = () => {
  const { agregarPreceptor } = usePreceptores();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [formPreceptor, setFormPreceptor] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();


    //Alertas
    if (!nombre || !email) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    await agregarPreceptor({
      nombre,
      email,
    });

    setNombre("");
    setEmail("");
  };

  return (
    <div className="cajapre">
      <button className="botonpre" onClick={() => setFormPreceptor(true)}>
        Agregar Preceptor
      </button>

      {formPreceptor && (
        <div>
          {/* Popup */}
          <div>
            <button button className="botonpre"
              onClick={() => setFormPreceptor(false)}
            >
              ✖
            </button>

            <h2>Agregar Preceptor</h2>

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

export default AltaPreceptor;