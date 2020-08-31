import React, { Component } from "react";

import NavBar from "../../../components/navbar/NavBar";
import OptionsMenu from "../../../components/optionsMenu/OptionsMenu";
import ImportView from "../../../views/import/ImportView";
import Footer from "../../../components/footer/Footer";

import PartnersView from "../../admin/partners/PartnersView";
import CampaignsView from "../../admin/campaigns/CampaignsView";

export default class AdminHomeView extends Component {
  constructor(props) {
    super(props);
    this.handlePartnerAreaClick = this.handlePartnerAreaClick.bind(this);
    this.handleCampaignAreaClick = this.handleCampaignAreaClick.bind(this);
    this.handleImportAreaClick = this.handleImportAreaClick.bind(this);
    this.state = {
      partnerAreaVisible: false,
      campaignAreaVisible: false,
      importAreaVisible: false,
    };
  }

  handlePartnerAreaClick() {
    this.setState({
      partnerAreaVisible: true,
      campaignAreaVisible: false,
      importAreaVisible: false,
    });
  }

  handleCampaignAreaClick() {
    this.setState({
      partnerAreaVisible: false,
      campaignAreaVisible: true,
      importAreaVisible: false,
    });
  }

  handleImportAreaClick() {
    this.setState({
      partnerAreaVisible: false,
      campaignAreaVisible: false,
      importAreaVisible: true,
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
        {this.state.partnerAreaVisible ? <PartnersView /> : null}
        {this.state.campaignAreaVisible ? <CampaignsView /> : null}
        {this.state.importAreaVisible ? (
          <ImportView isAdmin={this.props.isAdmin} />
        ) : null}
        <Footer />
      </div>
    );
  }
}
