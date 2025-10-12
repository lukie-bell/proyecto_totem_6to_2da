import React, { useState } from "react";
import AltaPreceptor from "../components/AltaPreceptor";
import ListaPreceptores from "../components/ListaPreceptores";
import AltaAdmin from "../components/AltaAdmin";
import ListaAdmins from "../components/ListaAdmins";

const ABM = () => {
  const [admin, setAdmin] = useState(false);
  const [prece, setPrece] = useState(false);

  return (
    <div className="container">
      <div className="sidebar">
        <button onClick={() => { setAdmin(true); setPrece(false); }}>Admins</button>
        <button onClick={() => { setPrece(true); setAdmin(false); }}>Preceptores</button>
      </div>

      <div className="content">
        {prece && (
          <div className="section">
            <AltaPreceptor />
            <ListaPreceptores />
          </div>
        )}

        {admin && (
          <div className="section">
            <AltaAdmin />
            <ListaAdmins />
          </div>
        )}
      </div>
    </div>
  );
};

export default ABM;