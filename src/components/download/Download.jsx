import React, { Component } from "react";
import axios from "axios";

export default class FormCampaign extends Component {
  constructor(props) {
    super(props);
    this.getFileModelo = this.getFileModelo.bind(this);
    this.getManual = this.getManual.bind(this);
  }

  getManual(event) {
    event.preventDefault();

    const BASE_URL =
      "https://test-api.esfera.site/portal-parceiro/v1/portal/api";

    axios({
      url: `${BASE_URL}/file/manual`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "manual_portal_parceiro.pdf");
      document.body.appendChild(link);
      link.click();
    });
  }

  getFileModelo(event) {
    event.preventDefault();

    const BASE_URL =
      "https://test-api.esfera.site/portal-parceiro/v1/portal/api";

    axios({
      url: `${BASE_URL}/file/default`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "modelo_importacao.csv");
      document.body.appendChild(link);
      link.click();
    });
  }

  render() {
    return (
      <div className="col-md-6 mb-4" id="download-box">
        <div className="card mb-4 download-and-upload">
          <div className="card-header text-center">
            Download (Manual e Modelo de arquivo CSV)
          </div>
          <div className="card-body" id="download-body">
            <button
              className="btn btn-primary"
              id="download-manual"
              onClick={this.getManual}
            >
              <i className="fas fa-cloud-download-alt ml-3" /> Manual Portal
              Parceiro
            </button>
            <button
              className="btn btn-default"
              id="download-csv"
              onClick={this.getFileModelo}
            >
              <i className="fas fa-cloud-download-alt ml-3" /> Modelo Arquivo
              CSV
            </button>
          </div>
        </div>
      </div>
    );
  }
}
