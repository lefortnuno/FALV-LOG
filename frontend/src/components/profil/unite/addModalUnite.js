
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

export default function AddModalUnite(props) {
    const navigate = useNavigate();


    const [contenuTab, setContenuTab] = useState(true);
    const [orns, setOrns] = useState([]);

    const { userInfo } = AuthHooks();
    React.useEffect(() => {
        console.log("redirection Unite")
    }, []);

    useEffect(() => {
        getOrns();
    }, []);

    /** -----------API ---------------- */

    function getOrns() {
        axios
            .get(`http://localhost:5000/api/employe/orns`)
            .then(function (response) {
                setOrns(response.data);
            });
    }


    const handleClose = () => setShow(true);
    const [setShow] = useState(false);
    //   const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        codePostal: '',
        nomRegion: '',
        coordonnees: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        axios
            .post(`http://localhost:5000/api/employe/unite`, inputs)
            .then(function (response) {
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate("/unite");
                    onClose();
                } else {
                    toast(response.data.message);
                    navigate("/unite");
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
                                <label for="recipient-name" className="col-form-label">Appellation de l'unité:</label>
                                <input type="text" className="form-control" id="recipient-name"
                                    name="appelation"
                                    onChange={handleChange}
                                    placeholder="Appelation" />
                            </div>
                            <div className="form-group">
                                <label for="message-text" className="col-form-label">ORN concernant</label>

                                <div className="col-sm">
                                    <select className="form-select"
                                        name="codePostal"
                                        onChange={handleChange}
                                        placeholder="ORN" aria-label="Default select example">
                                        <option selected>Rattachement</option>
                                        {contenuTab ? (
                                            orns.map((orn, key) => (
                                                <option key={key} 
                                                    value={orn.codePostal}
                                                >
                                                    - {orn.nomRegion}
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
