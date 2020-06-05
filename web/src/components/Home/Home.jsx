import React from "react";
import Main from "../Main/Main";
import "./Home.css";

export default function Home(props) {
  return (
    <Main icon="home" title="dashboard" subtitle="Dashboard Admin">
      <div className="display-4">Bem Vindo!</div>
      <hr />
      <p className="mb-0">
        Sistema para exemplificar a contrução de cadastro desenvolvido em React!
      </p>
    </Main>
  );
}
