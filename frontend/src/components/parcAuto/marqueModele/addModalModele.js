
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from 'react';


import AuthHooks from '../../hooks/AuthHooks';
import { useEffect } from "react";

export default function AddModalModele(props) {
    const navigate = useNavigate();


    const [contenuTab, setContenuTab] = useState(true);
    const [marques, setMarques] = useState([]);

    const { userInfo } = AuthHooks();
    React.useEffect(() => {
        console.log("redirection Modele")
    }, []);

    useEffect(() => {
        getMarques();
    }, []);

    /** -----------API ---------------- */

    function getMarques() {
        axios
            .get(`http://localhost:5000/api/float/marques`)
            .then(function (response) {
                setMarques(response.data);
            });
    }


    const handleClose = () => setShow(true);
    const [setShow] = useState(false);
    //   const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        nomModele: '',
        carburant: '',
        nombrePlaces: '',
        idMarque: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`http://localhost:5000/api/float/modele`, inputs)
            .then(function (response) {
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate("/marqueModele");
                    onClose();
                } else {
                    toast(response.data.message);
                    navigate("/marqueModele");
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
                        <h5 className="modal-title" >NOUVELLE MODELE</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Nom du modele</label>
                                <input type="text" className="form-control" id="recipient-name"
                                    name="nomModele"
                                    onChange={handleChange}
                                    placeholder="Nom du Modele" />
                            </div>
                            <div className="form-group">
                                <label for="message-text" className="col-form-label">Carburant</label>
                                <div className="col-sm">
                                    <select className="form-select"
                                        name="carburant"
                                        onChange={handleChange}
                                        placeholder="rang" aria-label="Default select example">
                                        <option selected>Carburant</option>
                                          <option value='GAZ OIL'>GAZ OIL</option>
                                          <option value='SANS PLOMB'>SANS PLOMB</option>
                                          <option value='AUTRE'>AUTRE</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Nombre de places</label>
                                <input type="number" min="1" max="32" className="form-control" id="recipient-name"
                                    name="nombrePlaces"
                                    onChange={handleChange}
                                    placeholder="Nombre de place" />
                            </div>
                            <div className="form-group">
                                <label for="message-text" className="col-form-label">Marque</label>
                                <div className="col-sm">
                                    <select className="form-select"
                                        name="idMarque"
                                        onChange={handleChange}
                                        placeholder="marque" aria-label="Default select example">
                                        <option selected>Marque</option>
                                        {contenuTab ? (
                                            marques.map((marque, key) => (
                                                <option key={key} 
                                                    value={marque.idMarque}
                                                >
                                                    - {marque.nomMarque}
                                                </option>
                                            ))
                                        ) : (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td> La liste est vide .... </td>
                                                <td></td>
                                            </tr>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose} >Close</button>
                        <button type="button" className="btn btn-primary" onClick={onSubmit}>Valider</button>
                    </div>
                </div>
            </Modal>

        </>
    );
    //#endregion
}
