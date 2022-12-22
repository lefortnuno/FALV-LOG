
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from 'react';


import AuthHooks from '../../hooks/AuthHooks';

export default function ModalAddMemorandum(props) {
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
        keyboard={false}
      >
        <div className="columns mt-6">
          <div className="column has-background-light">
            <div>
              <div className="navbar-end">
                <h2>
                  <div className="column is-2">
                    <span> </span>
                    <span> </span>
                  </div>
                </h2>
              </div>
              <div className="navbar-end">
                <h2>
                  Nouveau Memorandum
                  <span> </span>
                </h2>
              </div>

              {/*  ----- FORMULAIRE AJOUT PRODUIT ----- */}
              <div className="columns is-centered">
                <div className="column is-4 is-fullwidth is-centered">
                  <form /*onSubmit={Auth}*/ className="box">
                    <Form>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Matricule du demandeur</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={userInfo.matricule}
                          name="matricule"
                          onChange={handleChange}
                          readOnly={true}
                          placeholder="Matricule"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Objet </Form.Label>
                        <Form.Control
                          type="text"
                          name="objet"
                          onChange={handleChange}
                          placeholder="objet du memorandum"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Destinataires</Form.Label>
                        <Form.Control
                          type="text"
                          name="destinataires"
                          min="0"
                          onChange={handleChange}
                          placeholder="Destinataires"
                        />
                      </Form.Group>
                      <div className="navbar-end" >
                        <Button variant="primary" onClick={onSubmit}>
                          Memorandum
                        </Button>
                        <Button variant="danger" onClick={onClose}>
                          Annuler
                        </Button>
                      </div>
                    </Form>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
  //#endregion
}
