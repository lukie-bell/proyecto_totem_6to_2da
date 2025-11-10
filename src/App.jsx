import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRutas";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <AppRouter user={user} setUser={setUser} />
    </BrowserRouter>
  );
}

export default App;
