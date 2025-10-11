import { useState } from "react";
import { usePreceptores } from "../hooks/usePreceptores";

const AltaPreceptor = () => {
  const { agregarPreceptor } = usePreceptores();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [formPreceptor, setFormPreceptor] = useState(false);
  const[mostrarPopup, setMostrarPopup] = useState (false);
  const[mensajePopup, setMensajePopup] = useState ("");
  const [errores, setErrores] = useState({});

 const handleSubmit = async (e) => {
  e.preventDefault();

  const errores = {};

  // Validaciones
    if (nombre.trim() === "") errores.nombre = "Campo nombre no completado";
    if (email.trim() === "") errores.email = "Campo email no completado";

    // Validar formato de email
    if (email && !/\S+@\S+\.\S+/.test(email)) errores.email = "Email inválido";

    // Si hay errores, mostrar popup y detener envío
    if (Object.keys(errores).length > 0) {
      setErrores(errores);
      setMostrarPopup(true);
      return;
    }

  // Si no hay errores, se agrega el preceptor
  await agregarPreceptor({
    nombre,
    email,
  });

  setNombre("");
  setEmail("");
  setErrores({});

  setFormPreceptor(false);
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
            <button className="botonpre"
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
            onChange={(e) =>
              setNombre(e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, ""))
            }
                />

              <p className="mensajeer">{errores.nombre || "\u00A0"}</p>

              </div>

              <div>
                <label className="labelpre">Email:</label>
                <input className="inputpre"
                  type="email"
                  value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
                />

                <p className="mensajeer">{errores.email || "\u00A0"}</p>

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
}

export default AltaPreceptor;