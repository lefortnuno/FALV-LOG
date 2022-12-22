
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React from 'react';


import AuthHooks from '../../hooks/AuthHooks';

const URL_DE_BASE = `arrondissement/`;
let isValidate = false;

export default function ModalAddMemorandum(props) {
    //#region // MES VARIABLES


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

    //   const [inputs, setInputs] = useState({
    //     nomArrondissement: "",
    //   });
    const [erreurs, setErreurs] = useState([]);
    const [messages, setMessages] = useState({
        nomArrondissement: "Nom de l'arrondissement obligatoire",
        messageErreur: "",
    });
    //#endregion

    //#region // FONCTION DU BOUTTON ENREGISTRER
    const onSubmit = () => {
        const opts = {
            headers: {
                Authorization: userInfo,
            },
        };
        axios.post(`http://localhost:5000/api/stock/memo`, inputs).then(function (response) {
            if (response.status === 200) {
                toast.success("Ajout Reussi.");
                onClose();
            } else {
                toast.error("Echec de l'Ajout!");
            }
        });
    };
    //#endregion

    //#region // HANDLE CHANGE FONCTION
    const handleChange = (event) => {

        isValidate = true;
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setInputs((values) => ({ ...values, [name]: value }));
        setErreurs((values) => ({ ...values, messageErreur: false }));

        if (value.length === 0) {
            isValidate = false;
            setErreurs((values) => ({ ...values, [name]: true }));
            setMessages((values) => ({
                ...values,
                [name]: name + " obligatoire",
            }));
        } else if (value.length < 4) {
            isValidate = false;
            setErreurs((values) => ({ ...values, [name]: true }));
            setMessages((values) => ({
                ...values,
                [name]: name + " trop court",
            }));
        } else if (value.length > 64) {
            isValidate = false;
            setErreurs((values) => ({ ...values, [name]: true }));
            setMessages((values) => ({
                ...values,
                [name]: name + " trop long",
            }));
        } else {
            isValidate = true;
            setErreurs((values) => ({ ...values, [name]: false }));
            setMessages((values) => ({ ...values, [name]: "" }));
        }
    };
    //#endregion

    //#region //VALIDATION FORMULAIRE
    const validation = (event) => {
        event.preventDefault();

        const inputsArray = Object.keys(inputs);
        inputsArray.forEach((element) => {
            const value = Object.values(inputs[element]);
            if (value.length === 0) {
                setErreurs((values) => ({ ...values, [element]: true }));
                isValidate = false;
            }
        });

        if (isValidate) {
            onSubmit();
        }
    };
    //#endregion

    //#region // QUAND JE FERMER MON MODAL, CETTE FONCTIO EST APPELLER
    function onClose() {
        props.onHide();

        const inputsArray = Object.keys(inputs);

        inputsArray.forEach((element) => {
            setInputs((values) => ({ ...values, [element]: "" }));
            inputs[element] = "";
            isValidate = false;
            setErreurs((values) => ({ ...values, [element]: false }));
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
                <div className="modal fade" id="modalDialogScrollable" tabindex="-1">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal Dialog Scrollable</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.

                                This content should appear at the bottom after you scroll.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal.Footer>
                    <Button variant="danger" onClick={onClose}>
                        Annuler
                    </Button>

                    <Button variant="primary" onClick={validation}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
