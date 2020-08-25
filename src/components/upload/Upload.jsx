import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { post } from 'axios';
import axios from 'axios';

import { getListImport } from '../table/TableActions';
import Modal from '../modal/Modal';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      nameFile: 'Selecione um arquivo CSV',
      modal: false,
      titulo: '',
      subtitulo: '',
      codeError: '',
      tipo: '',

      partners: [],

      partner: {},
      partner_name: '',
      partner_code: '',
      campaign_name: '',
      campaign_code: '',
      partner_campaigns: [],

      loading_message: 'Carregando parceiros...',
      no_campaigns_message: false,
      disabled_select: true,
      disabled_select_campaign: true,
      disabled_upload: true,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onHiden = this.onHiden.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://test-api.esfera.site/portal-parceiro/v1/portal/api/partner')
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
            loading_message: false,
          });
        } else {
          this.setState({
            partners: [],
            disabled_select: false,
            loading_message: false,
          });
        }
      });
  }

  onFormSubmit(e) {
    if (this.state.file != null) {
      e.preventDefault();

      this.fileUpload(this.state.file)
        .then((resp) => {
          this.onClear();
          this.setState({ modal: true, tipo: 'sucesso' });
          this.props.getListImport();
        })
        .catch((error) => {
          this.onClear();
          if (typeof error.response.data.results.userMessage === 'undefined') {
            this.setState({
              modal: true,
              titulo:
                'Erro inesperado entre em contato com nossos canais de atendimento',
              codeError: error.response.data.results.code,
              tipo: 'error',
            });
          } else {
            this.setState({
              modal: true,
              titulo: error.response.data.results.userMessage,
              codeError: error.response.data.results.code,
              tipo: 'error',
            });
          }
        });
    } else {
      this.onClear();
      this.setState({
        modal: true,
        titulo: 'Selecione um arquivo csv para o envio!',
        subtitulo: 'Favor baixar o arquivo csv de modelo.',
        tipo: 'alerta',
      });
    }
  }

  fileUpload(file) {
    const BASE_URL =
      'https://review-feature-mo-nmdn1g-test-api.esfera.site/portal-parceiro/v1/portal/api';
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return post(`${BASE_URL}/file`, formData, config);
  }

  getFileExtension(filename) {
    return filename.split('.').pop();
  }

  onChange(e) {
    if (typeof e.target.files[0] != 'undefined') {
      var retorno = this.getFileExtension(e.target.files[0].name);
      if (retorno === 'csv') {
        this.setState({
          file: e.target.files[0],
          nameFile: e.target.files[0].name,
        });
      } else {
        this.onClear();
        this.setState({
          modal: true,
          titulo: 'Permitido apenas arquivo CSV!',
          subtitulo: 'Favor baixar o arquivo modelo.',
          tipo: 'alerta',
        });
      }
    }
  }

  onClear() {
    this.setState({ file: null, nameFile: 'Selecione um arquivo CSV' });
    document.getElementById('customFileLang').value = '';
  }

  onHiden() {
    this.setState({
      modal: false,
      titulo: '',
      subtitulo: '',
      codeError: '',
      tipo: '',
    });
  }

  handleChangeSelectPartner = (event) => {
    event.preventDefault();
    if (event.target.value === 'select') {
      this.setState({
        partner_code: '',
        partner_name: '',
      });
    } else {
      const partner_name_selected = event.target.value;
      const partner_array = this.state.partners.filter((partner) => {
        return partner.partnerName === partner_name_selected;
      });
      const partner = partner_array[0];
      this.setState({
        partner: partner,
        partner_code: partner.partnerCode,
        partner_name: partner_name_selected,
      });
      if (partner.campaigns) {
        partner.campaigns.sort(function(a, b) {
          if (a.campaignName < b.campaignName) {
            return -1;
          }
          if (a.campaignName > b.campaignName) {
            return 1;
          }
          return 0;
        });

        this.setState({
          partner_campaigns: partner.campaigns,
          disabled_select_campaign: false,
          no_campaigns_message: false,
        });
      } else {
        this.setState({
          no_campaigns_message: true,
          disabled_select_campaign: true,
        });
      }
    }
  };

  handleChangeSelectCampaign = (event) => {
    event.preventDefault();
    if (event.target.value === 'select') {
      this.setState({
        campaign_name: '',
        campaign_code: '',
      });
    } else {
      const campaign_name_selected = event.target.value;
      const campaign_found = this.state.partner_campaigns.filter((campaign) => {
        return campaign.campaignName === campaign_name_selected;
      });
      this.setState({
        campaign_name: campaign_name_selected,
        campaign_code: campaign_found[0].campaignCode,
        disabled_upload: false,
      });
    }
  };

  render() {
    return (
      <div className="col-md-6 mb-4" id="upload-box">
        {this.state.modal ? (
          <Modal
            modal={this.state.modal}
            metodoHiden={this.onHiden}
            titulo={this.state.titulo}
            codeError={this.state.codeError}
            tipo={this.state.tipo}
            subtitulo={this.state.subtitulo}
          />
        ) : null}

        <div className="card mb-4 download-and-upload" id="upload-box">
          <div className="card-header text-center">
            Upload (Arquivos de pontos em CSV)
          </div>

          <div className="upload-wrapper">
            {this.state.disabled_select === false ? (
              <div className="input-block" id="select-container">
                <div className="select-box" id="select-box-partner">
                  <label>Parceiro</label>
                  <select
                    onChange={this.handleChangeSelectPartner}
                    value={this.state.partner_name}
                  >
                    <option value="select">Selecione</option>
                    {this.state.partners.map((partner) => (
                      <option
                        key={partner.partnerName}
                        value={partner.partnerName}
                      >
                        {partner.partnerName}
                      </option>
                    ))}
                  </select>
                </div>

                {this.state.no_campaigns_message ? (
                  <div className="no-campaigns-msg">
                    Não há campanhas ativas para este parceiro.
                  </div>
                ) : (
                  <div className="select-box" id="select-box-campaign">
                    <label>Campanha</label>
                    <select
                      onChange={this.handleChangeSelectCampaign}
                      value={this.state.campaign_name}
                      disabled={this.state.disabled_select_campaign}
                    >
                      <option value="select">Selecione</option>
                      {this.state.partner_campaigns.map((campaign) => (
                        <option
                          key={campaign.campaignName}
                          value={campaign.campaignName}
                        >
                          {campaign.campaignName}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ) : (
              <div className="loading-msg">{this.state.loading_message}</div>
            )}

            <div className="upload-area">
              <div className="input-area">
                <div className="custom-file col-md-7">
                  <input
                    type="file"
                    onChange={this.onChange}
                    className="custom-file-input"
                    id="customFileLang"
                    lang="pt-br"
                    disabled={this.state.disabled_upload}
                  />
                  <label className="custom-file-label" htmlFor="customFileLang">
                    {this.state.nameFile}
                  </label>
                </div>
              </div>

              <div className="buttons-area">
                <button
                  type="button"
                  onClick={this.onFormSubmit}
                  className="btn btn-primary "
                  id="upload-csv"
                  disabled={this.state.disabled_upload}
                >
                  <i className="fas fa-cloud-upload-alt" />
                </button>

                <button
                  type="button"
                  onClick={this.onClear}
                  className="btn btn-red "
                  id="delete-csv"
                  disabled={this.state.disabled_upload}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ uploadImport: state.table.listImport });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getListImport }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
