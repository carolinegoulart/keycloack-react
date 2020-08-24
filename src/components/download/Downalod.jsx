import React from 'react';

// import { getFileModelo } from './DownloadAction';

export default () => {
  return (
    <div className="col-md-6 mb-4 upload-download-box">
      <div className="card mb-4">
        <div className="card-header text-center">
          Download (Manual e Modelo de arquivo CSV)
        </div>
        <div className="card-body">
          <button className="btn btn-primary" id="download-manual" disabled>
            <i className="fas fa-cloud-download-alt ml-3" /> Manual Portal
            Parceiro
          </button>
          <button
            className="btn btn-default"
            id="download-csv"
            // onClick={getFileModelo}
          >
            <i className="fas fa-cloud-download-alt ml-3" /> Modelo Arquivo CSV
          </button>
        </div>
      </div>
    </div>
  );
};
