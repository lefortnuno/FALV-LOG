import React from 'react';
import {/* useNavigate,*/ NavLink } from 'react-router-dom';
import AuthHooks from '../../hooks/AuthHooks';
import {IoPricetag, IoCar, IoPerson } from "react-icons/io5";
// import logo from "../../onn.PNG";
// import background from "../../background.jpg";
// import Navbar from "../Navbar";

const MonProfil = () => {
const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("build Homepage ")
  }, []);
  
  if(userInfo.nom && userInfo.mail){
    return (
      <React.Fragment>
        {/* <Navbar /> */}

        <div>
          Profil d'un employé
        </div >
      </React.Fragment>
    );
  }
  else return <><div>chargement spinner </div></>
}

export default MonProfil;
