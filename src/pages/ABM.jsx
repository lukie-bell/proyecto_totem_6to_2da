import React, { useState } from "react";
import AltaPreceptor from "../components/AltaPreceptor";
import ListaPreceptores from "../components/ListaPreceptores";
import AltaAdmin from "../components/AltaAdmin";
import ListaAdmins from "../components/ListaAdmins";

const ABM = () => {
    const [admin, setAdmin] = useState(false);
    const [prece, setPrece] = useState(false);

    return (
        <div>
            {/* Div con toda la page de ABM. */}
            <div>
                <div>
                    {/* Div que contiene el menu de las colecciones. */}
                    <div>
                        <div><button onClick={() => setAdmin(true)}>Admins</button></div>
                        <div><button onClick={() => setPrece(true)}>Preceptores</button></div>
                    </div>
                <div>
                    {prece && (
                    <div>
                        <div><AltaPreceptor /></div>
                        <div><ListaPreceptores /></div>
                    </div>
                    )}
                    {admin && (
                    <div>
                        <div><AltaAdmin /></div>
                        <div><ListaAdmins /></div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ABM;