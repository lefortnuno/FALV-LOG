import React from 'react';
import {/* useNavigate,*/ NavLink } from 'react-router-dom';
import AuthHooks from '../../hooks/AuthHooks';
import {IoPricetag, IoCar, IoPerson } from "react-icons/io5";
// import logo from "../../onn.PNG";
// import background from "../../background.jpg";
// import Navbar from "../Navbar";

const BonSortieProduit = () => {
const { userInfo } = AuthHooks();
  React.useEffect(() => {
    console.log("build Homepage ")
  }, []);
  
  if(userInfo.nom && userInfo.mail){
    return (
      <React.Fragment>
        {/* <Navbar /> */}

        <div>
          bon sortie produit
        </div >
      </React.Fragment>
    );
  }
  else return <><div>chargement spinner </div></>
}

export default BonSortieProduit;
