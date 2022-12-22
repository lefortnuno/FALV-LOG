import React, { useEffect, useState } from 'react';
import "../../Flexor/assets/css/style.css";
import "../../NiceAdmin/assets/css/style.css";
import "../../Flexor/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../NiceAdmin/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../NiceAdmin/assets/css/style.css";
import "../../NiceAdmin/assets/img/favicon.png";
import "../../NiceAdmin/assets/img/apple-touch-icon.png";
import "../../NiceAdmin/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../NiceAdmin/assets/vendor/boxicons/css/boxicons.min.css";
import "../../NiceAdmin/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
import { useNavigate, Link } from "react-router-dom";
// import moment from "moment";
import Menu from "../Header/menu";
import Footer from "../Header/footer";
import Header from "../Header/header";
import AuthHooks from '../hooks/AuthHooks';
import AlertAllUser from '../message/alerteAllUser';
import { toast } from "react-toastify";
import axios from "axios";
import AddModalMemorandum from "./addModalFournisseur";
import AddModalFournisseur from './addModalFournisseur';
// import AddModalProduitDemande from "../produitDemande/addModalProduitDemande";

function Fournisseur() {
    const { userInfo } = AuthHooks();
    React.useEffect(() => {
        console.log("redirection fournisseur")
    }, []);

    const [fournisseurs, setFournisseurs] = useState([]);
    // const [memo, setMemo] = useState([]);
    // const [memos, setMemos] = useState([]);

    const navigate = useNavigate();
    const id = userInfo.matricule;
    useEffect(() => {
        getFournisseur();
    }, []);

    const [contenuTab, setContenuTab] = useState(true);



    /** -----------API ---------------- */

    function getFournisseur() {
        axios
            .get(`http://localhost:5000/api/stock/fournisseurs`)
            .then(function (response) {
                setFournisseurs(response.data);
            });
    }

    /**MODAL AJOUT FOURNISSEUR */
    const [show, setShowM] = useState(false);
    const showAddModal = () => setShowM(true);
    const closeAddModal = () => {
        getFournisseur();
        setShowM(false);
    };


    const [showEdit, setShowEdit] = useState(false);

    /**MODAL EDIT */
    const showEditModal = (/*numCompte*/) => {
        // setNumCompteEdit(/*numCompte*/);
        setShowEdit(true);
    };

    /** ---------PAGINATION----------- */
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    function retourALaPremierPage() {
        setcurrentPage(1);
        if (currentPage > 5) {
            setmaxPageNumberLimit(5);
            setminPageNumberLimit(0);
        }
    }

    const pages = [];
    const nbrPage = (Math.ceil(fournisseurs.length / itemsPerPage))
    for (let i = 1; i <= nbrPage; i++) {
        pages.push(i);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = fournisseurs.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? "active" : null}
                >
                    <li className="page-item" aria-disabled="true">
                        {number}
                    </li>
                </li>
            );
        } else {
            return null;
        }
    });

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);
        if (currentPage - 2 < minPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    if (userInfo.nom && userInfo.mail) {
        return (
            <div>
                <Header />
                <Menu />


                {/* MODAL AJOUT MEMO */}
                <AddModalFournisseur show={show} onHide={closeAddModal} />
                {/* MODAL AJOUT*/}
                <main id="main" className="main">
                    <div Name="pagetitle">
                        <h1>Fournisseur</h1>
                        <nav>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/dashboard">Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/dashboard">Logistique</Link>
                                </li>
                                <li className="breadcrumb-item active">Fournisseur</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-lg-15">

                        <div className="card">
                            <div className="card-body">

                                <h5 className="card-title">LISTE DE FOURNISSEUR</h5>

                                <AlertAllUser />

                                <button
                                    type="button"
                                    onClick={showAddModal}
                                    className="button is-info is-active"
                                >
                                    Nouveau Fournisseur
                                </button>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nom Magasin</th>
                                            <th scope="col">Coordonnées</th>
                                            <th scope="col">Raison Fidélisation</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contenuTab ? (
                                            currentItems.map((fournisseur, key) => (
                                                <tr key={key}>
                                                    <th scope="row">{fournisseur.nomMagasin} </th>
                                                    <td>{fournisseur.coordonneesMagasin}</td>
                                                    <td>{fournisseur.raisonFidelisation}</td>

                                                    <td className="mr-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-dark"
                                                            variant="primary"
                                                            onClick={() => showEditModal()}
                                                        >
                                                            <i class="bi bi-pencil-square"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td> La liste est vide .... </td>
                                                <td></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                {/* RENDU HTML DU PAGINATION  */}
                                {nbrPage !== 1 ? <><nav class="pagination" role="navigation" aria-label="pagination">
                                    <ul class="pagination-list">
                                        <li>
                                            <a class="pagination-link" aria-label="Precedent">
                                                <button class="button is-primary"
                                                    disabled={currentPage === pages[0] ? true : false}
                                                    onClick={handlePrevbtn}
                                                >
                                                    Précédent
                                                </button>
                                            </a>
                                        </li>

                                        {renderPageNumbers}
                                        <li>
                                            <a class="pagination-link" aria-label="Precedent">
                                                <button class="button is-info is-hovered"
                                                    disabled={
                                                        currentPage === pages[pages.length - 1] ? true : false
                                                    }
                                                    onClick={handleNextbtn}
                                                >
                                                    Suivant
                                                </button>
                                            </a>
                                        </li>
                                    </ul>
                                </nav> <br /></> : null}
                                {/* RENDU HTML DU PAGINATION  */}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    } else return (
        <>
            <div>
                <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-danger" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-warning" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-info" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-light" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow text-dark" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    );
}
export default Fournisseur;
