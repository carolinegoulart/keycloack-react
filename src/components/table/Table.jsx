import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MDBDataTable } from 'mdbreact';

import { getListImport } from './TableActions';
import { getFileImport } from '../download/DownloadAction';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imports: [],
      modal: false,
      titulo: '',
      subtitulo: '',
      codeError: '',
      tipo: '',
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.props.getListImport();
  }

  downloadArquivo(name) {}

  render() {
    const data = {
      columns: [
        {
          label: 'Nome',
          field: 'namePartner',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Nome Arquivo',
          field: 'nameFile',
          sort: 'asc',
          width: 270,
        },
        {
          label: 'Data Importação',
          field: 'dateImport',
          sort: 'asc',
          width: 200,
        },
        {
          label: 'Downalod',
          field: 'download',
          sort: 'asc',
          width: 100,
        },
      ],
      rows: [
        ...this.props.listImport.map((importacao, i) => ({
          namePartner: importacao.namePartner,
          nameFile: importacao.nameFile,
          dateImport: importacao.dateImport,
          download: (
            <button
              key={i}
              disabled={!importacao.flagArquivoProcessado}
              onClick={() => getFileImport(importacao.nameFile)}
              className="btn btn-danger btn-rounded"
            >
              <i className="fas fa-cloud-download-alt ml-2" />
            </button>
          ),
        })),
      ],
    };

    return (
      <div className="row wow fadeIn">
        <div className="col-md-12 mb-4">
          <div className="card mb-4">
            <div className="card-header text-center ">
              Lista de Importações / Download de arquivos importados
            </div>
            <div className="card-body">
              <MDBDataTable
                responsive={true}
                scrollY={true}
                fixed
                hover
                paginationLabel={['Anterior', 'Próximo']}
                searchLabel="Pesquisar"
                entriesLabel="Exibir"
                infoLabel={['Existe', 'de', 'de', 'Itens']}
                entriesOptions={[5, 10, 15]}
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ listImport: state.table.listImport });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getListImport }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
