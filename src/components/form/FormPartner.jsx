import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
  partner_name: '',
  partner_code: '',

  disabled_button: false,

  partner_name_error: '',
  partner_code_error: '',
};

export default class FormPartner extends Component {
  state = initialState;

  validade = () => {
    let partner_name_error = '';
    let partner_code_error = '';

    if (!this.state.partner_name) {
      partner_name_error = 'Nome do parceiro inválido';
    }

    if (!this.state.partner_code) {
      partner_code_error = 'Código do parceiro inválido';
    }

    if (this.state.partner_code.length < 3) {
      partner_code_error = 'O código do parceiro deve conter 3 caracteres';
    }

    if (partner_name_error || partner_code_error) {
      this.setState({
        partner_name_error,
        partner_code_error,
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

      if (this.state.disabled_button) {
        return;
      }

      this.setState({
        disabled_button: true,
      });

      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const partner = {
        partnerName: this.state.partner_name,
        partnerCode: this.state.partner_code,
      };

      axios
        .post(
          'https://test-api.esfera.site/portal-parceiro/v1/portal/api/partner',
          partner,
          config
        )
        .then((response) => {
          this.setState(initialState);
          document.getElementById('form-container').reset();
          this.props.handleSendFormPartnerSuccess(
            'Parceiro cadastrado com sucesso!'
          );
        })
        .catch((error) => {
          this.setState(initialState);
          document.getElementById('form-container').reset();
          if (
            error.response &&
            JSON.stringify(error.response.status) === '400'
          ) {
            this.props.handleSendFormPartnerFail(
              'Erro: O código do parceiro informado já consta no cadastro.'
            );
          } else {
            this.props.handleSendFormPartnerFail(
              'Ocorreu um erro. Tente novamente.'
            );
          }
        });
    }
  };

  handlePartnerNameInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + '_error']: '',
      successMsg: '',
    });
  };

  handlePartnerCodeTextInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      successMsg: '',
    });
    if (event.target.value.length === 3) {
      this.setState({
        [event.target.name + '_error']: '',
      });
    }
  };

  render() {
    return (
      <div id="page-register-campaign">
        <form
          id="form-container"
          className="container"
          onSubmit={this.handleSubmit}
        >
          <div className="input-block">
            <label htmlFor="partner_name">Nome do Parceiro</label>
            <input
              type="text"
              id="partner_name"
              name="partner_name"
              onChange={this.handlePartnerNameInputChange}
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
              onChange={this.handlePartnerCodeTextInputChange}
              maxLength="3"
            />
          </div>
          <div className="error-msg">{this.state.partner_code_error}</div>

          <div className="button-wrapper">
            <button
              className="button-admin"
              id="send-form"
              disabled={this.state.disabled_button}
            >
              {this.state.disabled_button ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
