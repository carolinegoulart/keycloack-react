import React, { Component } from 'react';

import { getFileModelo } from '../download/DownloadAction';

export default class OptionsMenu extends Component {
  render() {
    return (
      <div className="admin-menu">
        <div className="admin-menu-header">Selecione uma opção</div>
        <div className="buttons-admin-menu">
          <button
            className="button-admin"
            id="register-campaign"
            onClick={() => this.props.showFormPartner()}
          >
            Cadastrar novo parceiro
          </button>
          <button
            className="button-admin"
            id="register-partner"
            onClick={() => this.props.showForm()}
          >
            Cadastrar nova campanha
          </button>
          <button
            className="button-admin"
            id="import-csv"
            onClick={() => {
              this.props.showImport();
              getFileModelo();
            }}
          >
            Importar CSV da campanha
          </button>
        </div>
      </div>
    );
  }
}
