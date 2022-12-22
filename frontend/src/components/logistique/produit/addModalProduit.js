
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
            .post(`http://localhost:5000/api/stock/produit`, inputs)
            .then(function (response) {
                if (response.data.success) {
                    toast.success(response.data.message);
                    navigate("/produit");
                    onClose();
                } else {
                    toast(response.data.message);
                    navigate("/produit");
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
                                <label for="recipient-name" className="col-form-label">Code Immatricule:</label>
                                <input type="text" className="form-control" id="recipient-name"
                                    name="codeImmatricule"
                                    onChange={handleChange}
                                    placeholder="Code Immatricule" />
                            </div>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Nom Produit:</label>
                                <input
                                    type="text"
                                    name="nomProduit"
                                    min="0"
                                    onChange={handleChange}
                                    placeholder="Nom du Prdouit" className="form-control" id="recipient-name" />
                            </div>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Quantité Initiale:</label>
                                <input
                                    type="number"
                                    name="quantiteInitiale"
                                    min='0'
                                    onChange={handleChange}
                                    placeholder="Quantité Initiale du produit" className="form-control" id="recipient-name" />
                            </div>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Quantité Initiale:</label>
                                <input
                                    type="number"
                                    name="quantiteSeuille"
                                    min='0'
                                    onChange={handleChange}
                                    placeholder="Quantité Seuille minimale du produit" className="form-control" id="recipient-name" />
                            </div>
                            <div className="form-group">
                                <label  for="message-text" className="col-form-label">Unité de sorite du produit</label>
                                <div className="col-sm">
                                    <select className="form-select" 
                                    name="unite"
                                    onChange={handleChange}
                                    placeholder="unité" aria-label="Default select example">
                                        <option selected>Unité de sortie du produit</option>
                                        <option value="Pièce(s)">Piece</option>
                                        <option value="Rame(s)">Rame</option>
                                        <option value="Carton(s)">Carton</option>
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
