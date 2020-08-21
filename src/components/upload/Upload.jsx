import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { post } from 'axios';

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
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onHiden = this.onHiden.bind(this);
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
          console.log(error);
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
    const BASE_URL = `${window.REACT_APP_URL}`;
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

  render() {
    return (
      <div className="col-md-6 mb-4 upload-download-box">
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
        <div className="card mb-4" id="upload-box">
          <div className="card-header text-center ">
            Upload (Arquivos de pontos em CSV)
          </div>

          <div className="upload-area">
            <div className="input-area">
              <div className="custom-file col-md-7">
                <input
                  type="file"
                  onChange={this.onChange}
                  className="custom-file-input"
                  id="customFileLang"
                  lang="pt-br"
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
              >
                <i className="fas fa-cloud-upload-alt" />
              </button>

              <button
                type="button"
                onClick={this.onClear}
                className="btn btn-red "
                id="delete-csv"
              >
                <i className="fas fa-trash-alt" />
              </button>
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
