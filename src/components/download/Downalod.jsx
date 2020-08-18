import React from 'react';

import { getFileModelo } from './DownloadAction';

export default () => {
  return (
    <div className="col-md-6 mb-4 ">
      <div className="card mb-4">
        <div className="card-header text-center">
          Download - Manual / Arquivo modelo
        </div>
        <div className="card-body">
          <button className="btn btn-primary" disabled>
            <i className="fas fa-cloud-download-alt ml-3" /> Manual Portal
            Parceiro
          </button>
          <button className="btn btn-default" onClick={getFileModelo}>
            <i className="fas fa-cloud-download-alt ml-3" /> Arquivo Importação
            CSV
          </button>
        </div>
      </div>
    </div>
  );
};
