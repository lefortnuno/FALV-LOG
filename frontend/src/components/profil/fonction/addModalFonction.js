
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

export default function AddModalFonction(props) {
    const navigate = useNavigate();


    const [contenuTab, setContenuTab] = useState(true);
    const [unites, setUnites] = useState([]);

    const { userInfo } = AuthHooks();
    React.useEffect(() => {
        console.log("redirection Fonction")
    }, []);

    useEffect(() => {
        getUnites();
    }, []);

    /** -----------API ---------------- */

    function getUnites() {
        axios
            .get(`http://localhost:5000/api/employe/unites`)
            .then(function (response) {
                setUnites(response.data);
            });
    }


    const handleClose = () => setShow(true);
    const [setShow] = useState(false);
    //   const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        role: '',
        rang: '',
        idUnite: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`http://localhost:5000/api/employe/fonction`, inputs)
            .then(function (response) {
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate("/fonction");
                    onClose();
                } else {
                    toast(response.data.message);
                    navigate("/fonction");
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
                        <h5 className="modal-title" >NOUVELLE UNITÉ</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>

                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Role de la fonction</label>
                                <input type="text" className="form-control" id="recipient-name"
                                    name="roles"
                                    onChange={handleChange}
                                    placeholder="Roles" />
                            </div>
                            <div className="form-group">
                                <label for="message-text" className="col-form-label">Rang de la fonction</label>

                                <div className="col-sm">
                                    <select className="form-select"
                                        name="rang"
                                        onChange={handleChange}
                                        placeholder="rang" aria-label="Default select example">
                                        <option selected>Rang</option>
                                          <option value='1'>Chef</option>
                                          <option value='2'>Responsable</option>
                                          <option value='3'>Personnel d'appui</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="message-text" className="col-form-label">Unité de la fonction</label>

                                <div className="col-sm">
                                    <select className="form-select"
                                        name="idUnite"
                                        onChange={handleChange}
                                        placeholder="unite" aria-label="Default select example">
                                        <option selected>Rattachement</option>
                                        {contenuTab ? (
                                            unites.map((unite, key) => (
                                                <option key={key} 
                                                    value={unite.idUnite}
                                                >
                                                    - {unite.appelation} : {unite.nomRegion}
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
