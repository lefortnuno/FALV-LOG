import React, { useEffect, useState } from "react";
import "../../../Flexor/assets/css/style.css";
import "../../../NiceAdmin/assets/css/style.css";
import "../../../Flexor/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../../NiceAdmin/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../../../NiceAdmin/assets/css/style.css";
import "../../../NiceAdmin/assets/img/favicon.png";
import "../../../NiceAdmin/assets/img/apple-touch-icon.png";
import "../../../NiceAdmin/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../../../NiceAdmin/assets/vendor/boxicons/css/boxicons.min.css";
import "../../../NiceAdmin/assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
import { useNavigate, Link } from "react-router-dom";
// import moment from "moment";
import Menu from "../../Header/menu";
import Footer from "../../Header/footer";
import Header from "../../Header/header";
import AuthHooks from "../../hooks/AuthHooks";
import AlertAllUser from "../../message/alerteAllUser";
import { toast } from "react-toastify";
import axios from "axios";
import AddModalModele from "./addModalModele";
import AddModalMarque from "./addModalMarque";
import ModalEdition from "./ModalEdit";

function MarqueModele() {
  const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("redirection Marque Modele");
  }, []);

  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);

  const navigate = useNavigate();
  const id = userInfo.matricule;
  useEffect(() => {
    getMarques();
    getModeles();
  }, []);

  const [contenuTab, setContenuTab] = useState(true);

  /** -----------API ---------------- */

  function getMarques() {
    axios
      .get(`http://localhost:5000/api/float/marques`)
      .then(function (response) {
        setMarques(response.data);
      });
  }
  function getModeles() {
    axios
      .get(`http://localhost:5000/api/float/modeles`)
      .then(function (response) {
        setModeles(response.data);
      });
  }

  /**MODAL AJOUT fonction */
  const [showMarque, setShowMarque] = useState(false);
  const showAddModalMarque = () => setShowMarque(true);
  const closeAddModalMarque = () => {
    getMarques();
    setShowMarque(false);
  };

  //#region // MODAL EDIT Individu
  const [numCompteEdit, setNumCompteEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const showEditModal = (numCompte) => {
    setNumCompteEdit(numCompte);
    setShowEdit(true);
  };
  const closeEditModal = () => {
    getMarques();
    getModeles();
    setShowEdit(false);
  };
  //#endregion

  /**MODAL AJOUT fonction */
  const [showModele, setShowModele] = useState(false);
  const showAddModalModele = () => setShowModele(true);
  const closeAddModalModele = () => {
    getModeles();
    setShowModele(false);
  };

  if (userInfo.nom && userInfo.mail) {
    if (userInfo.idUnite === 1) {
      return (
        <div>
          <Header />
          <Menu />
          {/* MODAL AJOUT MODELE */}
          <AddModalModele show={showModele} onHide={closeAddModalModele} />
          {/* MODAL AJOUT*/}
          {/* MODAL AJOUT MARQUE */}
          <AddModalMarque show={showMarque} onHide={closeAddModalMarque} />
          {/* MODAL AJOUT*/}

          <ModalEdition showEdit={showEdit} onHide={closeEditModal}>
            {numCompteEdit}
          </ModalEdition>

          <main id="main" className="main">
            <div className="pagetitle">
              <h1>MARQUES & MODELES</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item">Components</li>
                  <li className="breadcrumb-item active">Marques & Modeles</li>
                </ol>
              </nav>
            </div>
            <section className="section">
              <div className="col-lg">
                <div className="card">
                  <div className="card-body">
                    <ul
                      className="nav nav-tabs d-flex"
                      id="myTabjustified"
                      role="tablist"
                    >
                      <li className="nav-item flex-fill" role="presentation">
                        <button
                          className="nav-link w-100 active"
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home-justified"
                          type="button"
                          role="tab"
                          aria-controls="home"
                          aria-selected="true"
                        >
                          MARQUES
                        </button>
                      </li>
                      <li className="nav-item flex-fill" role="presentation">
                        <button
                          className="nav-link w-100"
                          id="profile-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#profile-justified"
                          type="button"
                          role="tab"
                          aria-controls="profile"
                          aria-selected="false"
                        >
                          MODELES
                        </button>
                      </li>
                    </ul>

                    <div
                      className="tab-content pt-2"
                      id="myTabjustifiedContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="home-justified"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <h5 className="card-title">
                          LISTE DES MARQUES
                          <button
                            type="button"
                            onClick={showAddModalMarque}
                            className="button is-info is-active"
                          >
                            Nouvelle Marque
                          </button>
                        </h5>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Nom de la marque</th>
                              <th scope="col">Logo</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contenuTab ? (
                              marques.map((marque, key) => (
                                <tr key={key}>
                                  <th scope="row"> {marque.nomMarque} </th>
                                  <td>
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        `/pic/${marque.logoMarque}`
                                      }
                                      alt="pdp"
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "10%",
                                      }}
                                    />
                                  </td>
                                  <td className="mr-4">
                                    <button
                                      type="button"
                                      className="btn btn-dark"
                                      variant="primary"
                                      onClick={() =>
                                        showEditModal(marque.idMarque)
                                      }
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
                      </div>
                      <div
                        className="tab-pane fade"
                        id="profile-justified"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <h5 className="card-title">
                          LISTE DES MODELES
                          <button
                            type="button"
                            onClick={showAddModalModele}
                            className="button is-info is-active"
                          >
                            Nouveau Modele
                          </button>
                        </h5>
                        <table className="table table-striped">
                          <thead>
                            <tr>
                              <th scope="col">Nom du modele</th>
                              <th scope="col">Nombre de places</th>
                              <th scope="col">Carburant</th>
                              <th scope="col">Marque</th>
                              <th scope="col">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {contenuTab ? (
                              modeles.map((modele, key) => (
                                <tr key={key}>
                                  <th scope="row"> {modele.nomModele} </th>
                                  <td>{modele.nombrePlaces}</td>
                                  <td>{modele.carburant}</td>
                                  <td>{modele.nomMarque}</td>
                                  <td className="mr-4">
                                    <button
                                      type="button"
                                      className="btn btn-dark"
                                      variant="primary"
                                      onClick={() =>
                                        showEditModal(modele.idMarque)
                                      }
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          {/* <Head/> */}
          <Menu />
          <Footer />
        </div>
      );
    }
  } else
    return (
      <>
        <div>
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-grow text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
}
export default MarqueModele;
