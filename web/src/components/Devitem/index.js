import React from 'react';
import './styles.css';

function DevItem({ dev }) {
  return (
      <li  className="dev-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/14915795?s=460&v=4" alt="Miguel Duque Filho"/>
        <div className="user-info">
          <strong>{dev.userName}</strong>
          <span>{dev.userEmail}</span>
        </div>
      </header>
      <p>Working from home</p>
      <a href="http://https://github.com/MiguelDuqueFilho">Acessar perfil no Github</a>
      </li>
  );
}

export default DevItem;
