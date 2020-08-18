import React from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


export default props => {


    if (props.tipo === 'alerta' && props.modal) {
     
        return  <MDBModal className="modal-notify modal-info text-center text-white" isOpen={props.modal} toggle={props.metodoHiden}>
                    <MDBModalHeader><strong>Aviso!</strong></MDBModalHeader>
                    <MDBModalBody>
                        <h3>{props.titulo}</h3>
                        <p>{props.subtitulo}</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={props.metodoHiden}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

    } else if (props.tipo === 'sucesso') {

        return  <MDBModal className="modal-dialog modal-notify modal-success text-center text-white" isOpen={props.modal} toggle={props.metodoHiden} >
                    <MDBModalHeader><strong>Arquivo enviado com Sucesso</strong></MDBModalHeader>
                    <MDBModalBody>
                        <h2>Seu arquivo foi enviado para processamento com sucesso.</h2>
                        <p>Apos o processamento será disponibilizado para download.</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={props.metodoHiden}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

    } else if (props.tipo === 'error') {

        return  <MDBModal className="modal-dialog  modal-notify modal-danger text-center text-white" isOpen={props.modal} toggle={props.metodoHiden} >
                    <MDBModalHeader><strong>Error!</strong></MDBModalHeader>
                    <MDBModalBody>
                        <h2>{props.titulo}</h2>
                        <p>Caso a mensagem não ajude favor entre em contato com nossos canais de atendimento e informe o codigo de erro abaixo: <br /> Code error - {props.codeError}</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="danger" onClick={props.metodoHiden}>Close</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

    }


}

