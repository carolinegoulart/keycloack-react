import React, { Component } from "react";

import NavBar from "../../components/navbar/NavBar";
import OptionsMenu from "../../components/optionsMenu/OptionsMenu";
import ImportView from "../../views/import/ImportView";
import Footer from "../../components/footer/Footer";

import ListPartners from "../../components/partners/list/ListPartners";
import FormPartner from "../../components/partners/form/FormPartner";

import ListCampaigns from "../../components/campaigns/list/ListCampaigns";
import FormCampaign from "../../components/campaigns/form/FormCampaign";

export default class AdminHomeView extends Component {
  constructor(props) {
    super(props);
    this.handlePartnerAreaClick = this.handlePartnerAreaClick.bind(this);
    this.handlePartnersListClick = this.handlePartnersListClick.bind(this);
    this.handleCreatePartnerClick = this.handleCreatePartnerClick.bind(this);

    this.handleCampaignAreaClick = this.handleCampaignAreaClick.bind(this);
    this.handleCampaignsListClick = this.handleCampaignsListClick.bind(this);
    this.handleCreateCampaignClick = this.handleCreateCampaignClick.bind(this);

    this.handleImportAreaClick = this.handleImportAreaClick.bind(this);

    this.handleCreateCampaignSuccess = this.handleCreateCampaignSuccess.bind(
      this
    );
    this.handleCreateCampaignFail = this.handleCreateCampaignFail.bind(this);
    this.handleCreatePartnerSuccess = this.handleCreatePartnerSuccess.bind(
      this
    );
    this.handleCreatePartnerFail = this.handleCreatePartnerFail.bind(this);
    this.hideAllOtherComponents = this.hideAllOtherComponents.bind(this);
    this.cleanMessages = this.cleanMessages.bind(this);

    this.state = {
      buttonsPartnerVisible: false,
      partnerListVisible: false,
      partnerFormVisible: false,

      buttonsCampaignVisible: false,
      campaignListVisible: false,
      campaignFormVisible: false,

      importAreaVisible: false,

      partners: [],
      successMsg: "",
      failMsg: "",
    };
  }

  handlePartnerAreaClick() {
    this.setState({
      buttonsPartnerVisible: true,
      partnerListVisible: false,
      partnerFormVisible: false,

      buttonsCampaignVisible: false,
      campaignListVisible: false,
      campaignFormVisible: false,

      importAreaVisible: false,
    });
    this.cleanMessages();
  }

  handlePartnersListClick() {
    this.setState({
      buttonsPartnerVisible: false,
      partnerListVisible: true,
      partnerFormVisible: false,

      buttonsCampaignVisible: false,
      campaignListVisible: false,
      campaignFormVisible: false,

      importAreaVisible: false,
    });
    this.cleanMessages();
  }

  handleCreatePartnerClick() {
    this.setState({
      buttonsPartnerVisible: false,
      partnerListVisible: false,
      partnerFormVisible: true,

      buttonsCampaignVisible: false,
      campaignListVisible: false,
      campaignFormVisible: false,

      importAreaVisible: false,
    });
    this.cleanMessages();
  }

  handleCampaignAreaClick() {
    this.setState({
      buttonsPartnerVisible: false,
      partnerListVisible: false,
      partnerFormVisible: false,

      buttonsCampaignVisible: true,
      campaignListVisible: false,
      campaignFormVisible: false,

      importAreaVisible: false,
    });
    this.cleanMessages();
  }

  handleCampaignsListClick() {
    this.setState({
      buttonsPartnerVisible: false,
      partnerListVisible: false,
      partnerFormVisible: false,

      buttonsCampaignVisible: false,
      campaignListVisible: true,
      campaignFormVisible: false,

      importAreaVisible: false,
    });
    this.cleanMessages();
  }

  handleCreateCampaignClick() {
    this.setState({
      buttonsPartnerVisible: false,
      partnerListVisible: false,
      partnerFormVisible: false,

      buttonsCampaignVisible: false,
      campaignListVisible: false,
      campaignFormVisible: true,

      importAreaVisible: false,
    });
    this.cleanMessages();
  }

  handleImportAreaClick() {
    this.setState({
      buttonsPartnerVisible: false,
      partnerListVisible: false,
      partnerFormVisible: false,

      buttonsCampaignVisible: false,
      campaignListVisible: false,
      campaignFormVisible: false,

      importAreaVisible: true,
    });
    this.cleanMessages();
  }

  cleanMessages() {
    this.setState({
      successMsg: "",
      failMsg: "",
    });
  }

  // Error message functions
  handleCreatePartnerSuccess(message) {
    this.setState({
      successMsg: message,
      failMsg: "",
    });
    this.hideAllOtherComponents();
  }

  handleCreatePartnerFail(message) {
    this.setState({
      failMsg: message,
      successMsg: "",
    });
    this.hideAllOtherComponents();
  }

  handleCreateCampaignSuccess(message) {
    this.setState({
      successMsg: message,
      failMsg: "",
    });
    this.hideAllOtherComponents();
  }

  handleCreateCampaignFail(message) {
    this.setState({
      failMsg: message,
      successMsg: "",
    });
    this.hideAllOtherComponents();
  }

  hideAllOtherComponents() {
    this.setState({
      buttonsPartnerVisible: false,
      partnerListVisible: false,
      partnerFormVisible: false,
      buttonsCampaignVisible: false,
      campaignListVisible: false,
      campaignFormVisible: false,
      importAreaVisible: false,
    });
  }

  render() {
    return (
      <div>
        <NavBar
          keycloak={this.props.keycloak}
          name={this.props.name}
          email={this.props.email}
        />

        <OptionsMenu
          showPartnerArea={this.handlePartnerAreaClick}
          showCampaignArea={this.handleCampaignAreaClick}
          showImportArea={this.handleImportAreaClick}
          keycloak={this.props.keycloak}
          name={this.props.name}
          email={this.props.email}
        />

        {this.state.buttonsPartnerVisible ? (
          <div id="page-buttons">
            <div id="list-container">
              <button onClick={this.handleCreatePartnerClick}>
                Cadastrar novo parceiro
              </button>

              <button onClick={this.handlePartnersListClick}>
                Visualizar parceiros cadastrados
              </button>
            </div>
          </div>
        ) : null}

        {this.state.partnerListVisible ? (
          <ListPartners
            handleSendFormCampaignSuccess={this.handleCreatePartnerSuccess}
            handleSendFormCampaignFail={this.handleCreatePartnerFail}
          />
        ) : null}

        {this.state.partnerFormVisible ? (
          <FormPartner
            handleSendFormCampaignSuccess={this.handleCreatePartnerSuccess}
            handleSendFormCampaignFail={this.handleCreatePartnerFail}
          />
        ) : null}

        {this.state.buttonsCampaignVisible ? (
          <div id="page-buttons">
            <div id="list-container">
              <button onClick={this.handleCreateCampaignClick}>
                Cadastrar nova campanha
              </button>

              <button onClick={this.handleCampaignsListClick}>
                Editar campanhas cadastradas
              </button>
            </div>
          </div>
        ) : null}

        {this.state.campaignListVisible ? (
          <ListCampaigns
            handleSendFormCampaignSuccess={this.handleCreateCampaignSuccess}
            handleSendFormCampaignFail={this.handleCreateCampaignFail}
          />
        ) : null}

        {this.state.campaignFormVisible ? (
          <FormCampaign
            handleSendFormCampaignSuccess={this.handleCreateCampaignSuccess}
            handleSendFormCampaignFail={this.handleCreateCampaignFail}
          />
        ) : null}

        {this.state.importAreaVisible ? (
          <ImportView isAdmin={this.props.isAdmin} />
        ) : null}

        <div className="success-msg">{this.state.successMsg}</div>
        <div className="fail-msg">{this.state.failMsg}</div>

        <Footer />
      </div>
    );
  }
}
