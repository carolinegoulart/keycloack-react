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

  start_date_br_format: "",
  deadline_br_format: "",

  disabled_button: false,
  disabled_select: true,
  loading_message: "Carregando parceiros...",

  start_date_error: "",
  deadline_error: "",
};

export default class FormCampaignEdit extends Component {
  state = initialState;

  componentDidMount() {
    this.setState({
      partner_name: this.props.campaign.partnerName,
      partner_code: this.props.campaign.partnerCode,
      campaign_name: this.props.campaign.campaignName,
      campaign_code: this.props.campaign.campaignCode,

      start_date: parseISO(this.props.campaign.startDate),
      start_date_br_format: this.props.campaign.startDateBrlFormat,
    });
    if (this.props.campaign.deadline) {
      this.setState({
        deadline: parseISO(this.props.campaign.deadline),
        deadline_br_format: this.props.campaign.deadlineBrlFormat,
      });
    }
  }

  validade = () => {
    let start_date_error = "";
    let deadline_error = "";

    if (!this.state.start_date) {
      start_date_error = "Data de início inválida";
    }

    if (this.state.deadline !== "") {
      var result = isBefore(this.state.deadline, this.state.start_date);
      if (result === true) {
        deadline_error = "Data final deve ser após a data inicial";
      }
    }

    if (start_date_error || deadline_error) {
      this.setState({
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
        deadline: this.state.deadline || null,
      };

      axios
        .put(
          "https://review-feature-mo-rr70i1-test-api.esfera.site/portal-parceiro/v1/portal/api/campaign",
          campaign,
          config
        )
        .then((response) => {
          this.setState(initialState);
          document.getElementById("form-container").reset();
          this.props.handleSendFormCampaignSuccess(
            "Campanha atualizada com sucesso!"
          );
        })
        .catch((error) => {
          this.setState(initialState);
          document.getElementById("form-container").reset();

          if (error.response) {
            const httpStatusError = JSON.stringify(error.response.status);
            if (httpStatusError === "404") {
              this.props.handleSendFormCampaignFail(
                "Erro: Parceiro ou campanha não encontrados."
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

  cleanStartDateInput = (event) => {
    event.preventDefault();
    this.setState({
      start_date: {},
      start_date_br_format: "",
    });
    document.getElementById("start_date").value = "";
  };

  cleanDeadlineInput = (event) => {
    event.preventDefault();
    this.setState({
      deadline: {},
      deadline_br_format: "",
    });
    document.getElementById("deadline").value = "";
  };

  handleStartDateInputChange = (event) => {
    event.preventDefault();
    this.setState({
      start_date: parseISO(event.target.value),
      start_date_br_format: this.convertHtmlDateToBrlFormat(event.target.value),
      start_date_error: "",
    });
  };

  handleDeadlineInputChange = (event) => {
    event.preventDefault();
    this.setState({
      deadline: parseISO(event.target.value),
      deadline_br_format: this.convertHtmlDateToBrlFormat(event.target.value),
      deadline_error: "",
    });
  };

  convertBrlDateToHtmlFormat(brlDate) {
    if (brlDate.replace("/", "").length > 0) {
      const day = brlDate.slice(0, 2);
      const month = brlDate.slice(3, 5);
      const year = brlDate.slice(6, 10);
      return year.concat("-", month, "-", day);
    }
  }

  convertHtmlDateToBrlFormat(htmlDate) {
    const day = htmlDate.slice(8, 10);
    const month = htmlDate.slice(5, 7);
    const year = htmlDate.slice(0, 4);
    return day.concat("/", month, "/", year);
  }

  render() {
    return (
      <div id="page-wrapper">
        <form
          id="form-container"
          className="container"
          onSubmit={this.handleSubmit.bind(this)}
        >
          <div className="input-block">
            <label htmlFor="partner_name">Nome do Parceiro</label>
            <input
              className="hidden"
              type="text"
              id="partner_code"
              name="partner_code"
              value={this.state.partner_name}
              readOnly={true}
            />
          </div>

          <div className="input-block">
            <label htmlFor="partner_code">Código do Parceiro</label>
            <input
              className="hidden"
              type="text"
              id="partner_code"
              name="partner_code"
              value={this.state.partner_code}
              readOnly={true}
            />
          </div>

          <div className="input-block">
            <label htmlFor="campaign_name">Nome da Campanha</label>
            <span> (até 50 caracteres)</span>
            <input
              className="hidden"
              readOnly={true}
              type="text"
              id="campaign_name"
              name="campaign_name"
              value={this.state.campaign_name}
            />
          </div>
          <div className="error-msg">{this.state.campaign_name_error}</div>

          <div className="input-block">
            <label htmlFor="campaign_code">Código da Campanha</label>
            <span> (até 10 caracteres)</span>
            <input
              className="hidden"
              readOnly={true}
              type="text"
              id="campaign_code"
              name="campaign_code"
              value={this.state.campaign_code}
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
                onChange={this.handleStartDateInputChange}
                value={
                  this.convertBrlDateToHtmlFormat(
                    this.state.start_date_br_format
                  ) || ""
                }
              />
              <button
                id="clean-start-date-input"
                onClick={this.cleanStartDateInput}
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
                onChange={this.handleDeadlineInputChange}
                value={
                  this.convertBrlDateToHtmlFormat(
                    this.state.deadline_br_format
                  ) || ""
                }
              />
              <button
                id="clean-deadline-input"
                onClick={this.cleanDeadlineInput}
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
