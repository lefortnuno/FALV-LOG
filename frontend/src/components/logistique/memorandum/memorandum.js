import React, { useEffect, useState } from 'react';
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
import AuthHooks from '../../hooks/AuthHooks';
import AlertAllUser from '../../message/alerteAllUser';
import { toast } from "react-toastify";
import axios from "axios";
import AddModalMemorandum from "./addModalMemorandum";
import AddModalProduitDemande from "../produitDemande/addModalProduitDemande";

function Memorandum() {
  const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("redirection memorandum")
  }, []);

  const [currentmemos, setCurrentMemos] = useState([]);
  const [memo, setMemo] = useState([]);
  const [memos, setMemos] = useState([]);

  const navigate = useNavigate();
  const id = userInfo.matricule;
  useEffect(() => {
    getMemoEmploye();
    getCurrentMemo();
    getMemoUnite();
  }, []);

  const [contenuTab, setContenuTab] = useState(true);



  /** -----------API ---------------- */

  function getCurrentMemo() {
    axios
      .get(`http://localhost:5000/api/stock/currentmemos`)
      .then(function (response) {
        setCurrentMemos(response.data);
      });
  }

  function getMemoEmploye() {
    axios
      .get(`http://localhost:5000/api/stock/memoemploye/${id}`)
      .then(function (response) {
        setMemos(response.data);
      });
  }

  function getMemoUnite() {
    axios
      .get(`http://localhost:5000/api/stock/memounite/${id}`)
      .then(function (response) {
        setMemo(response.data);
      });
  }

  function validerChefMemo(id) {
    axios
      .put(`http://localhost:5000/api/stock/validerchef/${id}`)
      .then(function (response) {
        toast.success("valid??");
        navigate("/memorandum");
        getCurrentMemo();
      });
  }

  function validerLogMemo(id) {
    axios
      .put(`http://localhost:5000/api/stock/validerlog/${id}`)
      .then(function (response) {
        toast.success("valid??");
        navigate("/memorandum");
        getCurrentMemo();
      });
  }

  /**MODAL AJOUT MEMORANDUM */
  const [show, setShowM] = useState(false);
  const showAddModal = () => setShowM(true);
  const closeAddModal = () => {
    getCurrentMemo();
    setShowM(false);
  };

  /**MODAL AJOUT PRODUIT DEMAND?? */
  const [numCompteEdit, setNumCompteEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const showEditModal = (/*numCompte*/) => {
    // setNumCompteEdit(/*numCompte*/);
    setShowEdit(true);
  };
  const closeEditModal = () => {
    getCurrentMemo();
    setShowEdit(false);
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
  const nbrPage = (Math.ceil(currentmemos.length / itemsPerPage))
  for (let i = 1; i <= nbrPage; i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentmemos.slice(indexOfFirstItem, indexOfLastItem);

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
    if (userInfo.idUnite === 1) {

      return (
        <div>
          <Header />
          <Menu />


          {/* MODAL AJOUT MEMO */}
          <AddModalMemorandum show={show} onHide={closeAddModal} />
          {/* MODAL AJOUT*/}
          <main id="main" className="main">
            <div Name="pagetitle">
              <h1>Memorandum</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Logistique</li>
                  <li className="breadcrumb-item active">Memorandum</li>
                  <a href='https://www.google.com/maps/place/Office+National+de+Nutrition/@-18.9192907,47.5189912,17z/data=!4m5!3m4!1s0x21f07e0cdea439af:0x1bcd8126f9d64ade!8m2!3d-18.9198321!4d47.520432'><i class="bi bi-plus-square"></i>Test</a>
                </ol>
              </nav>
            </div>
            <div className="col-lg-15">

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">LISTE DE DEMANDE MEMORANDUM</h5>
                  <AlertAllUser/>

                  <button
                    type="button"
                    onClick={showAddModal}
                    className="button is-info is-active"
                  >
                    Rediger Memorandum
                  </button>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No Memo</th>
                        <th scope="col">Objet</th>
                        <th scope="col">Date reception</th>
                        <th scope="col">Date d'envoi</th>
                        <th scope="col">Validation Chef</th>
                        <th scope="col">Validation Log</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contenuTab ? (
                        currentItems.map((memo, key) => (
                          <tr key={key}>
                            <th scope="row">{memo.numeroMemorandum} </th>
                            <td>{memo.objet}</td>
                            {/* <td>{moment(memo.dateEnvoie).format('DD/MM/YYYY HH:mm',)} </td>
                            <td>{moment(memo.dateReception).format('DD/MM/YYYY HH:mm',)}</td> */}
                            <td>{memo.validationChef}
                              <button
                                type="button"
                                variant="primary"
                                className='btn btn-primary'
                                onClick={() => validerChefMemo(memo.numeroMemorandum)}
                              >
                                <i class="bi bi-check2-square"></i>
                              </button>
                            </td>
                            <td>{memo.validationLog}
                              <button
                                type="button"
                                variant="primary"
                                className='btn btn-warning'
                                onClick={() => validerLogMemo(memo.numeroMemorandum)}
                              >
                                <i class="bi bi-check2-square"></i>
                              </button>
                            </td>
                            <td className="mr-4">
                              {/* <button
                                type="button"
                                className="btn btn-success"
                                variant="primary"
                              > */}
                                <a href='https://www.google.com/maps/place/Office+National+de+Nutrition/@-18.9192907,47.5189912,17z/data=!4m5!3m4!1s0x21f07e0cdea439af:0x1bcd8126f9d64ade!8m2!3d-18.9198321!4d47.520432'></a><i class="bi bi-plus-square"></i>Test
                              {/* </button> */}
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
                            Pr??c??dent
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
    } else if (userInfo.idUnite === 2 && userInfo.rang === 1) {

      return (
        <div>
          {/* <Head/> */}
          <Menu />

          <main id="main" className="main">
            <div Name="pagetitle">
              <h1>Memorandum</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Logistique</li>
                  <li className="breadcrumb-item active">Memorandum</li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-15">

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Table with stripped rows</h5>

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">Age</th>
                        <th scope="col">Start Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Brandon Jacob</td>
                        <td>Designer</td>
                        <td>28</td>
                        <td>2016-05-25</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Bridie Kessler</td>
                        <td>Developer</td>
                        <td>35</td>
                        <td>2014-12-05</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Ashleigh Langosh</td>
                        <td>Finance</td>
                        <td>45</td>
                        <td>2011-08-12</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Angus Grady</td>
                        <td>HR</td>
                        <td>34</td>
                        <td>2012-06-11</td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>Raheem Lehner</td>
                        <td>Dynamic Division Officer</td>
                        <td>47</td>
                        <td>2011-04-19</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>


            </div>
          </main>
          <Footer />
        </div>
      );
    } else if (userInfo.rang === 1) {

      return (
        <div>
          {/* <Head/> */}
          <Menu />

          <main id="main" className="main">
            <div Name="pagetitle">
              <h1>Memorandum</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Logistique</li>
                  <li className="breadcrumb-item active">Memorandum</li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-15">

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Table with stripped rows</h5>

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">Age</th>
                        <th scope="col">Start Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Brandon Jacob</td>
                        <td>Designer</td>
                        <td>28</td>
                        <td>2016-05-25</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Bridie Kessler</td>
                        <td>Developer</td>
                        <td>35</td>
                        <td>2014-12-05</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Ashleigh Langosh</td>
                        <td>Finance</td>
                        <td>45</td>
                        <td>2011-08-12</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Angus Grady</td>
                        <td>HR</td>
                        <td>34</td>
                        <td>2012-06-11</td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>Raheem Lehner</td>
                        <td>Dynamic Division Officer</td>
                        <td>47</td>
                        <td>2011-04-19</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>


            </div>
          </main>
          <Footer />
        </div>
      );
    } else {

      return (
        <div>
          {/* <Head/> */}
          <Menu />

          <main id="main" className="main">
            <div Name="pagetitle">
              <h1>Memorandum</h1>
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/dashboard">Home</Link>
                  </li>
                  <li className="breadcrumb-item">Logistique</li>
                  <li className="breadcrumb-item active">Memorandum</li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-15">

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Table with stripped rows</h5>

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">Age</th>
                        <th scope="col">Start Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Brandon Jacob</td>
                        <td>Designer</td>
                        <td>28</td>
                        <td>2016-05-25</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Bridie Kessler</td>
                        <td>Developer</td>
                        <td>35</td>
                        <td>2014-12-05</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Ashleigh Langosh</td>
                        <td>Finance</td>
                        <td>45</td>
                        <td>2011-08-12</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Angus Grady</td>
                        <td>HR</td>
                        <td>34</td>
                        <td>2012-06-11</td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>Raheem Lehner</td>
                        <td>Dynamic Division Officer</td>
                        <td>47</td>
                        <td>2011-04-19</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>

            </div>
          </main>
          <Footer />
        </div>
      );
    }
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
export default Memorandum;
