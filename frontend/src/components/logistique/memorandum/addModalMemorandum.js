
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from 'react';


import AuthHooks from '../../hooks/AuthHooks';

export default function AddModalMemorandum(props) {
  const navigate = useNavigate();


  const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("redirection produit")
  }, []);

  const handleClose = () => setShow(true);
  const [setShow] = useState(false);
  //   const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    matricule: userInfo.matricule,
    objet: '',
    destinataires: ''
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`http://localhost:5000/api/stock/memo`, inputs)
      .then(function (response) {
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/memorandum");
          onClose();
        } else {
          toast(response.data.message);
          navigate("/memorandum");
          onClose();
        }
      });
  };
  function onClose() {
    props.onHide();

    const inputsArray = Object.keys(inputs);

    inputsArray.forEach((element) => {
      setInputs((values) => ({ ...values, [element]: "" }));
      inputs[element] = "";
    });
  }
  //#endregion

  //#region // RENDU HTML DU MODAL AJOUT
  return (
    <>
    <Modal
        size="sm"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}>
          
          <div class="modal-content">
                    <div class="modal-header">
            <h5 className="modal-title" >New message</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">Matricule:</label>
                  <input type="text" className="form-control" id="recipient-name" 
                          defaultValue={userInfo.matricule}
                          name="matricule"
                          onChange={handleChange}
                          readOnly={true}
                          placeholder="Matricule"/>
                </div>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">Destinataire:</label>
                  <input 
                          type="text"
                          name="destinataires"
                          min="0"
                          onChange={handleChange}
                          placeholder="Destinataires" className="form-control" id="recipient-name" />
                </div>
                <div className="form-group">
                  <label for="message-text" className="col-form-label">Objet:</label>
                  <textarea className="form-control" id="message-text"
                  
                  type="text"
                  name="objet"
                  onChange={handleChange}
                  placeholder="objet du memorandum"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={onClose} >Close</button>
              <button type="button" className="btn btn-primary" onClick={onSubmit}>Valider</button>
            </div>
            </div>
        </Modal>
      
    </>
  );
  //#endregion
}
