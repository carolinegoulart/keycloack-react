import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
  partner_name: '',
  partner_code: '',

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

      const config = {
        headers: {
          'content-type': 'application/json',
        },
      };

      const partner = {
        partner_name: this.state.partner_name,
        partner_code: this.state.partner_code,
      };

      axios
        .post('/portal/api/partner', partner, config)
        .then((response) => {
          this.setState(initialState);
          document.getElementById('form-wrapper').reset();
          this.props.handleFormPartnerSuccess(
            'Parceiro cadastrado com sucesso.'
          );
        })
        .catch((error) => {
          this.setState(initialState);
          document.getElementById('form-wrapper').reset();
          if (error.response) {
            this.props.handleFormPartnerFail(error.response.data);
          } else {
            this.props.handleFormPartnerFail(
              'Ocorreu um erro. Tente novamente.'
            );
          }
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

  render() {
    return (
      <div id="page-register-campaign">
        <form
          id="form-wrapper"
          className="container"
          onSubmit={this.handleSubmit}
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

          <div className="button-wrapper">
            <button className="button-admin" id="send-form">
              Enviar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
