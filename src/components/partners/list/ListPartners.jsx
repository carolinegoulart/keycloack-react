import React, { Component } from "react";
import axios from "axios";

export default class ListPartners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partners: [],
      loadingPartners: true,
      loadingMessage: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://test-api.esfera.site/portal-parceiro/v1/portal/api/partner")
      .then((response) => {
        var partnersData = response.data.results;

        partnersData.sort(function(a, b) {
          if (a.partnerName < b.partnerName) {
            return -1;
          }
          if (a.partnerName > b.partnerName) {
            return 1;
          }
          return 0;
        });

        if (response.data.results) {
          !this.isCancelled &&
            this.setState({
              partners: partnersData,
              loadingPartners: false,
              loadingMessage: "",
            });
        } else {
          !this.isCancelled &&
            this.setState({
              partners: [],
              loadingPartners: false,
              loadingMessage: "Não há parceiros disponíveis",
            });
        }
      });
  }

  componentWillUnmount() {
    this.isCancelled = true;
  }

  render() {
    return (
      <div id="page-wrapper">
        <div id="list-container">
          {this.state.loadingPartners === true ? (
            <div className="loading-msg">Carregando parceiros...</div>
          ) : (
            <table className="table-list" id="table-partners">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome do Parceiro</th>
                </tr>
              </thead>
              <tbody>
                {this.state.partners.map((partner) => {
                  return (
                    <tr key={partner.partnerCode}>
                      <td>{partner.partnerCode}</td>
                      <td>{partner.partnerName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {this.partners === [] ? (
            <div className="loading-msg">Não há parceiros cadastrados</div>
          ) : null}
        </div>
      </div>
    );
  }
}
