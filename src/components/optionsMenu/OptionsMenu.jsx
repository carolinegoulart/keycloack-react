import React, { Component } from "react";

export default class OptionsMenu extends Component {
  render() {
    return (
      <div className="admin-menu">
        <div className="admin-menu-header">Selecione uma opção</div>
        <div className="buttons-admin-menu">
          <button
            className="button-admin"
            id="register-campaign"
            onClick={() => this.props.showPartnerArea()}
          >
            Parceiros
          </button>
          <button
            className="button-admin"
            id="register-partner"
            onClick={() => this.props.showCampaignArea()}
          >
            Campanhas
          </button>
          <button
            className="button-admin"
            id="import-csv"
            onClick={() => this.props.showImportArea()}
          >
            Importar CSV
          </button>
        </div>
      </div>
    );
  }
}
