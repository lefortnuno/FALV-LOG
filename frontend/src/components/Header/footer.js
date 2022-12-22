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
            <footer id="footer" class="footer">
    <div class="copyright">
      &copy; Copyright <strong><span>{userInfo.nom}  {userInfo.prenoms}</span></strong>. 2022
    </div>
    <div class="credits">
      Designed by <a href="https://web.facebook.com/flavien.randriambololona">Glo Flavien</a>
    </div>
  </footer>
        </div>
    );
}
export default Menu;
