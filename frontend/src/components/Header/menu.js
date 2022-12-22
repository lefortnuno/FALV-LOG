import { Link } from "react-router-dom";
import React from "react";
import AuthHooks from '../hooks/AuthHooks';
import { useNavigate, NavLink } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
function Menu() {


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
      <aside id="sidebar" className="sidebar">

        <ul className="sidebar-nav" id="sidebar-nav">

          <li className="nav-item">
            <NavLink className="nav-link " to={"/dashboard"}>
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
              <i class="bi bi-box-seam"></i><span>Logistique</span><i className="bi bi-chevron-down ms-auto"></i>
            </NavLink>
            <ul id="components-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <NavLink to={"/memorandum"}>
                  <i className="bi bi-circle"></i><span>Memorandum</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/produit"}>
                  <i className="bi bi-circle"></i><span>Produit</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/fournisseur"}>
                  <i className="bi bi-circle"></i><span>Fournisseur</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
              <i class="bi bi-truck"></i><span>Parc Auto</span><i className="bi bi-chevron-down ms-auto"></i>
            </NavLink>
            <ul id="forms-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <NavLink href="forms-elements.html">
                  <i className="bi bi-circle"></i><span>Voiture</span>
                </NavLink>
              </li>
              <li>
                <NavLink href="forms-layouts.html">
                  <i className="bi bi-circle"></i><span>Demande Voiture</span>
                </NavLink>
              </li>
              <li>
                <NavLink href="forms-editors.html">
                  <i className="bi bi-circle"></i><span>Itineraires</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/marqueModele"}>
                  <i className="bi bi-circle"></i><span>Marques/Modeles</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
              <i class="bi bi-person"></i><span>Profil</span><i className="bi bi-chevron-down ms-auto"></i>
            </NavLink>
            <ul id="tables-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <NavLink href="tables-general.html">
                  <i className="bi bi-circle"></i><span>Mon Profil</span>
                </NavLink>
              </li>
              <li>
                <NavLink href="tables-data.html">
                  <i className="bi bi-circle"></i><span>Mes Collegues et moi</span>
                </NavLink>
              </li>
            </ul>
          </li>


          <li className="nav-item">
            <NavLink className="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
              <i class="bi bi-menu-button-wide-fill"></i><span>Autres</span><i className="bi bi-chevron-down ms-auto"></i>
            </NavLink>
            <ul id="icons-nav" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <NavLink to={"/orn"}>
                  <i className="bi bi-circle"></i><span>ORN</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/unite"}>
                  <i className="bi bi-circle"></i><span>Unites</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/fonction"}>
                  <i className="bi bi-circle"></i><span>Fonctions</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
              <i className="bi bi-bar-chart"></i>
              <span>Bilan</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link collapsed" onClick={logOut}>
            <i className="bi bi-box-arrow-right"></i>
                <span>Se deconnecter</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
}
export default Menu;
