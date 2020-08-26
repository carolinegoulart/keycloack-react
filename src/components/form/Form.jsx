import React, { Component } from "react";
import { parseISO, isBefore } from "date-fns";
import axios from "axios";

const initialState = {
  partner_name: "",
  partner_code: "",
  campaign_name: "",
  campaign_code: "",
  start_date: "",
  deadline: "",

  partners: [],
  disabled_button: false,
  disabled_select: true,
  loading_message: "Carregando parceiros...",

  partner_name_error: "",
  partner_code_error: "",
  campaign_name_error: "",
  campaign_code_error: "",
  start_date_error: "",
  deadline_error: "",
};

export default class Form extends Component {
  state = initialState;

  componentDidMount() {
    axios
      .get("https://test-api.esfera.site/portal-parceiro/v1/portal/api/partner")
      .then((response) => {
        const partnersData = response.data.results;

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
            disabled_select: false,
          });
        } else {
          this.setState({
            partners: [],
            disabled_select: false,
          });
        }
      });
  }

  validade = () => {
    let partner_name_error = "";
    let partner_code_error = "";
    let campaign_name_error = "";
    let campaign_code_error = "";
    let start_date_error = "";
    let deadline_error = "";

    if (!this.state.partner_name) {
      partner_name_error = "Nome do parceiro inválido";
    }

    if (!this.state.partner_code || this.state.partnerCode === "select") {
      partner_code_error = "Código do parceiro inválido";
    }

    if (!this.state.campaign_name) {
      campaign_name_error = "Nome da campanha inválido";
    }

    if (!this.state.campaign_code) {
      campaign_code_error = "Código da campanha inválido";
    }

    if (!this.state.start_date) {
      start_date_error = "Data de início inválida";
    }

    if (this.state.deadline !== "") {
      var result = isBefore(this.state.deadline, this.state.start_date);
      if (result === true) {
        deadline_error = "Data final deve ser após a data inicial";
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
      if (this.state.disabled_button) {
        return;
      }

      this.setState({
        disabled_button: true,
      });

      event.preventDefault();

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const campaign = {
        partnerName: this.state.partner_name,
        partnerCode: this.state.partner_code,
        campaignName: this.state.campaign_name,
        campaignCode: this.state.campaign_code,
        startDate: this.state.start_date,
        deadline: this.state.deadline,
      };

      axios
        .post(
          "https://test-api.esfera.site/portal-parceiro/v1/portal/api/campaign",
          campaign,
          config
        )
        .then((response) => {
          this.setState(initialState);
          document.getElementById("form-container").reset();
          this.props.handleSendFormCampaignSuccess(
            "Campanha cadastrada com sucesso!"
          );
        })
        .catch((error) => {
          this.setState(initialState);
          document.getElementById("form-container").reset();

          if (error.response) {
            const httpStatusError = JSON.stringify(error.response.status);
            if (httpStatusError === "400") {
              this.props.handleSendFormCampaignFail(
                "Erro: O código da campanha informado já consta no cadastro."
              );
            } else if (httpStatusError === "404") {
              this.props.handleSendFormCampaignFail(
                "Erro: O código do parceiro informado não consta no cadastro."
              );
            } else {
              this.props.handleSendFormCampaignFail(
                "Ocorreu um erro. Tente novamente."
              );
            }
          } else {
            this.props.handleSendFormCampaignFail(
              "Ocorreu um erro. Tente novamente."
            );
          }
        });
    }
  };

  handleTextInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + "_error"]: "",
      successMsg: "",
    });
  };

  handleDateInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: parseISO(event.target.value),
      [event.target.name + "_error"]: "",
      successMsg: "",
    });
  };

  cleanStartDateInput = (event) => {
    event.preventDefault();
    this.setState({
      start_date: "",
    });
    document.getElementById("start_date").value = "";
  };

  cleanDeadlineInput = (event) => {
    event.preventDefault();
    this.setState({
      deadline: "",
    });
    document.getElementById("deadline").value = "";
  };

  handleChangeSelectMenu = (event) => {
    if (event.target.value === "select") {
      this.setState({
        partner_code: "",
        partner_name: "",
      });
    } else {
      const partner_name_selected = event.target.value;
      const partner_found = this.state.partners.filter((partner) => {
        return partner.partnerName === partner_name_selected;
      });
      this.setState({
        partner_code: partner_found[0].partnerCode,
        partner_name: partner_name_selected,
        partner_code_error: "",
        partner_name_error: "",
      });
    }
  };

  render() {
    return (
      <div id="page-register-campaign">
        <form
          id="form-container"
          className="container"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <div className="input-block" id="partner_name_container">
            <label htmlFor="partner_name">Nome do Parceiro</label>

            {this.state.disabled_select === false ? (
              <select
                onChange={this.handleChangeSelectMenu}
                value={this.state.partner_name}
              >
                <option value="select">Selecione</option>
                {this.state.partners.map((partner) => (
                  <option key={partner.partnerName} value={partner.partnerName}>
                    {partner.partnerName}
                  </option>
                ))}
              </select>
            ) : (
              <div className="loading-msg">{this.state.loading_message}</div>
            )}
          </div>
          <div className="error-msg">{this.state.partner_name_error}</div>

          <div className="input-block">
            <label htmlFor="partner_name">Código do Parceiro</label>
            <input
              className="hidden"
              type="text"
              id="partner_code"
              name="partner_code"
              value={this.state.partner_code}
              readOnly={true}
            />
          </div>
          <div className="error-msg">{this.state.partner_name_error}</div>

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
            <button
              type="submit"
              className="button-admin"
              id="send-form"
              disabled={this.state.disabled_button}
            >
              {this.state.disabled_button ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
