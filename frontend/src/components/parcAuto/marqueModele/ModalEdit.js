import axios from "axios";
import { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `http://localhost:5000/api/float/marque/`;
let i = 0;

export default function ModalEdition(props) {
  //#region // MES VARIABLES
  const [inputs, setInputs] = useState({});

  const id = props.children;
  //#endregion

  //#region // FUNC POUR EVITER UNE BOUCLE INFINIE
  while (props.showEdit && i === 0) {
    if (i !== 0) {
      break;
    }
    getOneUser(id);
    i = 1;
  }
  //#endregion

  //#region // RECUPERER UN Procedure_cin
  function getOneUser(id) {
    axios.get(URL_BASE + `${id}`).then(function (response) {
      setInputs(response.data[0]);
      console.log(response);
    });
  }
  //#endregion

  //#region // CHANGER OU CHARGER LES CONTENUS DES INPUTS
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //#endregion

  //#region // FUNC BOUTTON CLOSE
  function onClose() {
    props.onHide();
    picPhotoPDP.file = []
    i = 0;
  }
  const rowStyle = {
    marginTop: "1rem",
  };

  //#endregion

  const [picPhotoPDP, setPicPhotoPDP] = useState({
    file: [],
    filepreview: null,
  });


  //#region // HANDLE CHANGE IMAGE FUNC
  const handlePicturePhotoPDP = (event) => {
    setPicPhotoPDP({
      ...picPhotoPDP,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };
  //#endregion

  
  //#region //VALIDATION FORMULAIRE
  const validation = (event) => {
    event.preventDefault();

    if (picPhotoPDP.file.length !== 0) {
      ajoutPhotoPDP();
    } else {
      console.log("CHOISIER PHOTO SVP ! ")
    }
  };
  //#endregion

  //#region // IMAGE PHOTO DE FICHE MERE --FACE-- DE L'INDIVIDU
  const ajoutPhotoPDP = async () => {
    const formdata = new FormData();
    formdata.append("logoMarque", picPhotoPDP.file);
    
    axios
      .put(
        URL_BASE + `photoLogoMarque/` + `${inputs.idMarque}`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          // toast.success("modif success.");
          console.log("modif success.");
        }
      });
  };
  //#endregion

  //#region // RENDU HTML MODAL EDITER
  return (
    <>
      <Modal
        size="lg"
        show={props.showEdit}
        onHide={props.closeEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header>
            <h4> Modification</h4>
          </Modal.Header>

          <Modal.Body>
            <Container>
              <Row>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom Marque</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    name="nomMarque"
                    onChange={handleChange}
                    value={inputs.nomMarque}
                    autoComplete="off"
                    placeholder="Numéro CIN ...."
                    inline="true"
                    disabled={true}
                  />
                </Col>
              </Row>
              <Row style={rowStyle}>
                <Col>
                  <div
                    className="input-field monPhotoPDP login100-pic js-tilt "
                    data-tilt
                  >
                    {!picPhotoPDP.filepreview ? (
                      <img
                        src={
                          process.env.PUBLIC_URL + `/imagesNuno/img-01.png`
                        }
                        alt="image"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10%",
                        }}
                      />
                    ) : (
                      <img
                        src={picPhotoPDP.filepreview}
                        alt="image"
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "10%",
                        }}
                      />
                    )}
                  </div>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Logo</Form.Label>
                  <Form.Control
                    type="file"
                    name="photoPDP"
                    onChange={handlePicturePhotoPDP}
                    autoComplete="off"
                    placeholder="Photo"
                    inline="true"
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Form>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button
            variant="primary"
            onClick={validation}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
