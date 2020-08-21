import React, { Component } from 'react';

import NavBar from '../../components/navbar/NavBar';
import OptionsMenu from '../../components/optionsMenu/OptionsMenu';
import HomePage from '../../components/homePage/HomePage';
import Footer from '../../components/footer/Footer';
import Form from '../../components/form/Form';
import FormPartner from '../../components/form/FormPartner';

export default class AdminHomePage extends Component {
  constructor(props) {
    super(props);
    this.handleFormClick = this.handleFormClick.bind(this);
    this.handleImportClick = this.handleImportClick.bind(this);
    this.handleFormPartnerClick = this.handleFormPartnerClick.bind(this);
    this.handleFormCampaignSuccess = this.handleFormCampaignSuccess.bind(this);
    this.handleFormCampaignFail = this.handleFormCampaignFail.bind(this);
    this.handleFormPartnerSuccess = this.handleFormPartnerSuccess.bind(this);
    this.handleFormPartnerFail = this.handleFormPartnerFail.bind(this);
    this.state = {
      formCampaignVisible: false,
      importVisible: false,
      formPartnerVisible: false,
      successMsg: '',
      failMsg: '',
    };
  }

  handleFormClick() {
    this.setState({
      formCampaignVisible: true,
      importVisible: false,
      formPartnerVisible: false,
      successMsg: '',
      failMsg: '',
    });
  }

  handleImportClick() {
    this.setState({
      formCampaignVisible: false,
      importVisible: true,
      formPartnerVisible: false,
      successMsg: '',
      failMsg: '',
    });
  }

  handleFormPartnerClick() {
    this.setState({
      formCampaignVisible: false,
      importVisible: false,
      formPartnerVisible: true,
      successMsg: '',
      failMsg: '',
    });
  }

  // Error message functions
  handleFormCampaignSuccess(message) {
    this.setState({
      successMsg: message,
      failMsg: '',
      formCampaignVisible: false,
    });
  }

  handleFormCampaignFail(message) {
    this.setState({
      failMsg: message,
      successMsg: '',
      formCampaignVisible: false,
    });
  }

  handleFormPartnerSuccess(message) {
    console.log(message);
    this.setState({
      successMsg: message,
      failMsg: '',
      formPartnerVisible: false,
    });
    console.log(this.state.successMsg);
  }

  handleFormPartnerFail(message) {
    this.setState({
      failMsg: message,
      successMsg: '',
      formPartnerVisible: false,
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
          showForm={this.handleFormClick}
          showImport={this.handleImportClick}
          showFormPartner={this.handleFormPartnerClick}
          keycloak={this.props.keycloak}
          name={this.props.name}
          email={this.props.email}
        />
        {this.state.formCampaignVisible ? (
          <Form
            handleFormCampaignSuccess={this.handleFormCampaignSuccess}
            handleFormCampaignFail={this.handleFormCampaignFail}
          />
        ) : null}
        {this.state.importVisible ? <HomePage /> : null}
        {this.state.formPartnerVisible ? (
          <FormPartner
            handleFormPartnerSuccess={this.handleFormPartnerSuccess}
            handleFormPartnerFail={this.handleFormPartnerFail}
          />
        ) : null}
        <div className="success-msg">{this.state.successMsg}</div>
        <div className="fail-msg">{this.state.failMsg}</div>
        <Footer />
      </div>
    );
  }
}
