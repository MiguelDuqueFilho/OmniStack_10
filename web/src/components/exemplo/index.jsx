import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./Main.css";
import "./styles.css";
import "./Sidebar.css";
import DevItem from "../Devitem";
import DevForm from "../DevForm";

// componente
// propriedade
// status

function Exemplo() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/users");
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(e) {
    const response = await api.post("/users", e);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Login</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev.id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Exemplo;
