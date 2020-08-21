import React, { Component } from 'react';
import { parseISO, isBefore } from 'date-fns';
import axios from 'axios';

const initialState = {
  partner_name: '',
  partner_code: '',
  campaign_name: '',
  campaign_code: '',
  start_date: '',
  deadline: '',

  formVisible: true,
  partner_name_error: '',
  partner_code_error: '',
  campaign_name_error: '',
  campaign_code_error: '',
  start_date_error: '',
  deadline_error: '',
};

export default class Form extends Component {
  state = initialState;

  validade = () => {
    let partner_name_error = '';
    let partner_code_error = '';
    let campaign_name_error = '';
    let campaign_code_error = '';
    let start_date_error = '';
    let deadline_error = '';

    if (!this.state.partner_name) {
      partner_name_error = 'Nome do parceiro inválido';
    }

    if (!this.state.partner_code) {
      partner_code_error = 'Código do parceiro inválido';
    }

    if (!this.state.campaign_name) {
      campaign_name_error = 'Nome da campanha inválido';
    }

    if (!this.state.campaign_code) {
      campaign_code_error = 'Código da campanha inválido';
    }

    if (!this.state.start_date) {
      start_date_error = 'Data de início inválida';
    }

    if (this.state.deadline !== '') {
      var result = isBefore(this.state.deadline, this.state.start_date);
      if (result === true) {
        deadline_error = 'Data final deve ser após a data inicial';
      }
    }

    if (
      partner_name_error ||
      partner_code_error ||
      campaign_name_error ||
      campaign_code_error ||
      start_date_error ||
      deadline_error
    ) {
      this.setState({
        partner_name_error,
        partner_code_error,
        campaign_name_error,
        campaign_code_error,
        start_date_error,
        deadline_error,
      });
      return false;
    }
    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validade();

    if (isValid) {
      event.preventDefault();

      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const campaign = {
        partner_name: this.state.partner_name,
        partner_code: this.state.partner_code,
        campaign_name: this.state.campaign_name,
        campaign_code: this.state.campaign_code,
        start_date: this.state.start_date,
        deadline: this.state.deadline,
      };

      axios
        .post('/portal/api/campaign', campaign, config)
        .then((response) => {
          console.log('Data: ', this.state);
          console.log('Response: ', response);

          this.setState(initialState);
          document.getElementById('form-wrapper').reset();
          this.setState({
            formVisible: false,
          });
          this.props.handleFormCampaignSuccess();
        })
        .catch((error) => {
          console.log(error);

          this.setState(initialState);
          document.getElementById('form-wrapper').reset();
          this.setState({
            formVisible: false,
          });
          this.props.handleFormCampaignFail();
        });
    }
  };

  handleTextInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + '_error']: '',
      successMsg: '',
    });
  };

  handleDateInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: parseISO(event.target.value),
      [event.target.name + '_error']: '',
      successMsg: '',
    });
  };

  cleanStartDateInput = (event) => {
    event.preventDefault();
    this.setState({
      start_date: '',
    });
    document.getElementById('start_date').value = '';
  };

  cleanDeadlineInput = (event) => {
    event.preventDefault();
    this.setState({
      deadline: '',
    });
    document.getElementById('deadline').value = '';
  };

  render() {
    return (
      <div id="page-register-campaign">
        {this.state.formVisible ? (
          <form
            id="form-wrapper"
            className="container"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <div className="input-block">
              <label htmlFor="partner_name">Nome do Parceiro</label>
              <input
                type="text"
                id="partner_name"
                name="partner_name"
                onChange={this.handleTextInputChange}
              />
            </div>
            <div className="error-msg">{this.state.partner_name_error}</div>

            <div className="input-block">
              <label htmlFor="partner_code">Código do Parceiro</label>
              <span> (3 caracteres)</span>
              <input
                type="text"
                id="partner_code"
                name="partner_code"
                onChange={this.handleTextInputChange}
                maxLength="3"
              />
            </div>
            <div className="error-msg">{this.state.partner_code_error}</div>

            <div className="input-block">
              <label htmlFor="campaign_name">Nome da Campanha</label>
              <span> (até 50 caracteres)</span>
              <input
                type="text"
                id="campaign_name"
                name="campaign_name"
                onChange={this.handleTextInputChange}
                maxLength="50"
              />
            </div>
            <div className="error-msg">{this.state.campaign_name_error}</div>

            <div className="input-block">
              <label htmlFor="campaign_code">Código da Campanha</label>
              <span> (até 10 caracteres)</span>
              <input
                type="text"
                id="campaign_code"
                name="campaign_code"
                onChange={this.handleTextInputChange}
                maxLength="10"
              />
            </div>
            <div className="error-msg">{this.state.campaign_code_error}</div>

            <div className="input-block">
              <label htmlFor="start_date">Data de Início</label>
              <div className="input-date-area">
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  onChange={this.handleDateInputChange}
                />
                <button
                  id="clean-start-date-input"
                  onClick={this.cleanStartDateInput.bind(this)}
                >
                  Limpar
                </button>
              </div>
            </div>
            <div className="error-msg">{this.state.start_date_error}</div>

            <div className="input-block">
              <label htmlFor="deadline">Data de Fim</label>
              <span> (Opcional)</span>
              <div className="input-date-area">
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  onChange={this.handleDateInputChange}
                />
                <button
                  id="clean-deadline-input"
                  onClick={this.cleanDeadlineInput.bind(this)}
                >
                  Limpar
                </button>
              </div>
            </div>
            <div className="error-msg">{this.state.deadline_error}</div>

            <div className="button-wrapper">
              <button type="submit" className="button-admin" id="send-form">
                Enviar
              </button>
            </div>
          </form>
        ) : null}
      </div>
    );
  }
}
