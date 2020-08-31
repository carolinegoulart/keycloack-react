import React, { Component } from "react";
import axios from "axios";

import ListPartners from "../../../components/partners/list/ListPartners";
import FormPartner from "../../../components/partners/form/FormPartner";

export default class PartnersView extends Component {
  constructor(props) {
    super(props);

    this.handleCreatePartnerClick = this.handleCreatePartnerClick.bind(this);

    this.state = {
      listPartnersVisible: true,
      formPartnerVisible: false,

      loading: true,
      partners: [],
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
          this.setState({
            partners: partnersData,
            loading: false,
            loadingMessage: "",
          });
        } else {
          this.setState({
            partners: [],
            loading: false,
            loadingMessage: "Não há parceiros disponíveis",
          });
        }
      });
  }

  handleCreatePartnerClick() {
    this.setState({
      listPartnersVisible: false,
      formPartnerVisible: true,
    });
  }

  render() {
    return (
      <div>
        {this.state.listPartnersVisible ? (
          <div id="page-wrapper">
            <div id="list-container">
              {this.state.loading === true ? (
                <div className="loading-msg">Carregando parceiros...</div>
              ) : (
                <ListPartners partners={this.state.partners} />
              )}

              {this.partners === [] ? (
                <div className="loading-msg">Não há parceiros cadastrados</div>
              ) : null}

              <div className="button-wrapper">
                <button
                  id="create-new-partner"
                  className="button-admin"
                  onClick={this.handleCreatePartnerClick}
                >
                  Cadastrar novo parceiro
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {this.state.formPartnerVisible ? (
          <FormPartner
          // handleSendFormPartnerSuccess={this.handleSendFormPartnerSuccess}
          />
        ) : null}
      </div>
    );
  }
}
