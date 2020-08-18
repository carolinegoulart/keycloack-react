import React from 'react';
import { Link } from 'react-router-dom';

import { getFileModelo } from '../download/DownloadAction';

export default () => {
  return (
    <div className="admin-menu">
      <div className="admin-menu-header">Selecione uma opção</div>
      <div className="buttons-admin-menu">
        <Link to="/register" className="button-admin">
          Cadastrar nova campanha
        </Link>
        <Link to="/import" className="button-admin" onClick={getFileModelo}>
          Importar CSV da campanha
        </Link>
      </div>
    </div>
  );
};
