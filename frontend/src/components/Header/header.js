import { Link } from "react-router-dom";
import React from "react";
import AuthHooks from '../hooks/AuthHooks';
import { useNavigate, NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
function Header() {


    const navigate = useNavigate();
    const { userInfo, logOutUser } = AuthHooks();
    React.useEffect(() => {
        console.log(" generation Navbar")
    }, []);
    const logOut = () => {
        console.log("Deconnection utilisateur employé ")
        logOutUser();
        navigate("/")
    }

    return (
        <div>
            {/* Header */}
            <header id="header" className="header fixed-top d-flex align-items-center">

                <div className="d-flex align-items-center justify-content-between">
                    <NavLink href="index.html" className="logo d-flex align-items-center">
                        <img src="assets/img/logo.png" alt="" />
                        <span className="d-none d-lg-block">OSFB</span>
                    </NavLink>
                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">

                        <li className="nav-item d-block d-lg-none">
                            <NavLink className="nav-link nav-icon " to={"/dashboard"}>
                            <i class="bi bi-house-door"></i>
                            </NavLink>
                        </li>

                        {/* Drop Down menu */}
                        <li className="nav-item dropdown pe-3">

                            <NavLink className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <i className="bi bi-list toggle-sidebar-btn"></i>
                            </NavLink>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">

                                <li>
                                    <div >
                                        <i className="bi bi-box-seam"></i>
                                        <span>Logistique</span>
                                        <li>
                                            <NavLink to={"/memorandum"} className="dropdown-item d-flex align-items-center" >
                                                <span>Memorandum</span>
                                            </NavLink>
                                            <NavLink to={"/produit"} className="dropdown-item d-flex align-items-center" >
                                                <span>Produit</span>
                                            </NavLink>
                                            <NavLink to={"/fournisseur"} className="dropdown-item d-flex align-items-center" >
                                                <span>Fournisseur</span>
                                            </NavLink>
                                        </li>
                                    </div>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <div >
                                        <i className="bi bi-truck"></i>
                                        <span>Parc Auto</span>
                                        <li>
                                            <NavLink to={"/voiture"} className="dropdown-item d-flex align-items-center" >
                                                <span>Voiture</span>
                                            </NavLink>
                                            <NavLink to={"/demandeVoiture"} className="dropdown-item d-flex align-items-center" >
                                                <span>Produit</span>
                                            </NavLink>
                                            <NavLink to={"/itineraire"} className="dropdown-item d-flex align-items-center" >
                                                <span>Itinéraires</span>
                                            </NavLink>
                                            <NavLink to={"/marqueModele"} className="dropdown-item d-flex align-items-center" >
                                                <span>Marques/Modeles</span>
                                            </NavLink>
                                        </li>
                                    </div>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <div >
                                        <i className="bi bi-person"></i>
                                        <span>Autres</span>
                                        <li >
                                            <NavLink to={"/orn"} className="dropdown-item d-flex align-items-center" >
                                                <span>ORN</span>
                                            </NavLink>
                                            <NavLink to={"/unite"} className="dropdown-item d-flex align-items-center" >
                                                <span>Unités</span>
                                            </NavLink>
                                            <NavLink to={"/fonction"} className="dropdown-item d-flex align-items-center" >
                                                <span>Fonctions</span>
                                            </NavLink>
                                        </li>
                                    </div>
                                </li>
                                <li>
                                    <div >
                                        <i className="bi bi-person"></i>
                                        <span>Profil</span>
                                        <li >
                                            <NavLink to={"/monProfil"} className="dropdown-item d-flex align-items-center" >
                                                <span>Mon Profil</span>
                                            </NavLink>
                                            <NavLink to={"/mesCollegue"} className="dropdown-item d-flex align-items-center" >
                                                <span>Mes Collegues</span>
                                            </NavLink>
                                        </li>
                                    </div>
                                </li>

                                <li>
                                    <div >
                                        <i className="bi bi-person"></i>
                                        <span>Bilan</span>
                                        <li >
                                            <NavLink to={"/bilan"} className="dropdown-item d-flex align-items-center" >
                                                <span>Bilan</span>
                                            </NavLink>
                                        </li>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                </div>

                <nav className="header-nav ms-auto">
                    <ul className="d-flex align-items-center">
                        <li className="nav-item dropdown pe-3">
                            <NavLink className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                                <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                                <span className="d-none d-md-block dropdown-toggle ps-2">{userInfo.nom} {userInfo.prenoms}</span>
                            </NavLink>

                            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                <li className="dropdown-header">
                                    <h6>{userInfo.nom} {userInfo.prenoms}</h6>
                                    <span>{userInfo.roles}</span>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <NavLink className="dropdown-item d-flex align-items-center" to={"/produit"}>
                                        <i className="bi bi-person"></i>
                                        <span>My Profile</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <NavLink className="dropdown-item d-flex align-items-center" href="users-profile.html">
                                        <i className="bi bi-gear"></i>
                                        <span>Account Settings</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <NavLink className="dropdown-item d-flex align-items-center" href="pages-faq.html">
                                        <i className="bi bi-question-circle"></i>
                                        <span>Need Help?</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <NavLink className="dropdown-item d-flex align-items-center" href="#">
                                        <i className="bi bi-box-arrow-right"></i>
                                        <span>Sign Out</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </header>
            {/* fin header */}
        </div>
    );
}
export default Header;
