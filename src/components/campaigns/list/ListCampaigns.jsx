import React, { Component } from "react";
import axios from "axios";

import FormCampaignEdit from "../form/FormCampaignEdit";

export default class ListCampaigns extends Component {
  constructor(props) {
    super(props);

    this.showEditCampaignForm = this.showEditCampaignForm.bind(this);

    this.state = {
      partners: [],
      partner: [],
      partner_name: "",
      partner_campaigns: [],

      selected_campaign: {},

      editFormVisible: false,
      loadingPartners: true,
      partnerHasCampaigns: false,
      campaignsMessage: "",
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://review-feature-mo-rr70i1-test-api.esfera.site/portal-parceiro/v1/portal/api/partner"
      )
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

        partnersData.forEach((partner) => {
          if (partner.campaigns) {
            partner.campaigns.forEach((campaign) => {
              campaign.startDateBrlFormat = this.convertToDateFormat(
                campaign.startDate
              );
              if (campaign.deadline) {
                campaign.deadlineBrlFormat = this.convertToDateFormat(
                  campaign.deadline
                );
              }
            });
            partner.campaigns.sort(function(a, b) {
              if (a.campaignCode < b.campaignCode) {
                return -1;
              }
              if (a.campaignCode > b.campaignCode) {
                return 1;
              }
              return 0;
            });
          }
        });

        if (response.data.results) {
          this.setState({
            partners: partnersData,
            loadingPartners: false,
          });
        } else {
          this.setState({
            partners: [],
            loadingPartners: false,
          });
        }
      });
  }

  convertToDateFormat(rawDate) {
    const day = rawDate.slice(8, 10);
    const month = rawDate.slice(5, 7);
    const year = rawDate.slice(0, 4);
    return day.concat("/", month, "/", year);
  }

  handleChangeSelectPartner = (event) => {
    event.preventDefault();
    if (event.target.value === "select") {
      this.setState({
        partner: {},
        partner_name: "",
        partner_campaigns: [],
        partnerHasCampaigns: false,
        campaignsMessage: "",
      });
    } else {
      const partner_name_selected = event.target.value;
      const partner_found = this.state.partners.filter((partner) => {
        return partner.partnerName === partner_name_selected;
      });
      this.setState({
        partner: partner_found[0],
        partner_name: partner_name_selected,
      });

      if (partner_found[0].campaigns) {
        this.setState({
          partner_campaigns: partner_found[0].campaigns,
          partnerHasCampaigns: true,
          campaignsMessage: "",
        });
      } else {
        this.setState({
          partnerHasCampaigns: false,
          campaignsMessage: "Não há campanhas cadastradas para este parceiro.",
        });
      }
    }
  };

  showEditCampaignForm(campaign) {
    this.setState({
      editFormVisible: true,
      selected_campaign: campaign,
    });
  }

  render() {
    return (
      <div>
        {this.state.editFormVisible === false ? (
          <div id="page-wrapper">
            <div id="list-container">
              {this.state.loadingPartners === true ? (
                <div className="loading-msg">Carregando parceiros...</div>
              ) : (
                <div className="select-box">
                  {this.state.loadingPartners === true ? (
                    <div className="loading-msg">Carregando parceiros...</div>
                  ) : (
                    <div id="select-box-list-campaigns">
                      <label>Selecione um parceiro</label>
                      <select
                        onChange={this.handleChangeSelectPartner}
                        value={this.state.partner_name}
                      >
                        <option value="select">Selecione</option>
                        {this.state.partners.map((partner) => (
                          <option
                            key={partner.partnerCode}
                            value={partner.partnerName}
                          >
                            {partner.partnerName}
                          </option>
                        ))}
                      </select>

                      {this.state.partnerHasCampaigns === true ? (
                        <div>
                          <table className="table-list" id="table-campaigns">
                            <thead>
                              <tr>
                                <th>Código</th>
                                <th>Nome da Campanha</th>
                                <th>Data de Início</th>
                                <th>Data Final</th>
                                <th>Ação</th>
                              </tr>
                            </thead>
                            <tbody>
                              {this.state.partner_campaigns.map((campaign) => {
                                return (
                                  <tr key={campaign.campaignCode}>
                                    <td>{campaign.campaignCode}</td>
                                    <td>{campaign.campaignName}</td>
                                    <td>{campaign.startDateBrlFormat}</td>
                                    <td>
                                      {campaign.deadlineBrlFormat ||
                                        "Indefinido"}
                                    </td>
                                    <td>
                                      <button
                                        className="button-edit"
                                        onClick={() =>
                                          this.showEditCampaignForm(campaign)
                                        }
                                      >
                                        Editar
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="loading-msg">
                          {this.state.campaignsMessage}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {this.partners === [] ? (
                <div className="loading-msg">Não há parceiros cadastrados</div>
              ) : null}
            </div>
          </div>
        ) : (
          <FormCampaignEdit campaign={this.state.selected_campaign} />
        )}
      </div>
    );
  }
}
