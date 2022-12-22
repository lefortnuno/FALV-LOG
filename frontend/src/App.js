import { BrowserRouter, Routes, Route, useNavigate, useLocation, redirect } from "react-router-dom";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "bulma/css/bulma.css";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./Protected"
import Deconnection from "./deconnection"

/**Login component */
import Login from "./components/login/login.js";

/**authentification, hooks, protection routes */
import { getAccessToken } from "./components/services/AuthServices.js";
import AuthHooks from "./components/hooks/AuthHooks.js";
import HomePageRouteVerification from "./ProtectedRoute/HomePageVerificationRoute.jsx";

/**fournisseur component */
import Fournisseur from "./components/fournisseur/fournisseur.js";

/**home component */
import Dashboard from "./components/Home/dashboard.js";

/**logistique component */
//bon d'entrée produit
import BonEntreeProduit from "./components/logistique/bonEntreeProduit/bonEntreeProduit.js";
//bon d'entrée produit
import BonSortieProduit from "./components/logistique/bonSortieProduit/bonSortieProduit.js";
//demande entrée produit
import DemandeEntreeProduit from "./components/logistique/demandeEntreeProduit/demandeEntreeProduit.js";
//Memorandum
import Memorandum from "./components/logistique/memorandum/memorandum.js";
//produit
import Produit from "./components/logistique/produit/produit.js";
//produit demandée memorandum
import ProduitDemande from "./components/logistique/produitDemande/produitDemande.js";
//produit sollicite demande entrée produit
import ProduitSollicite from "./components/logistique/produitSollicite/produitSollicite.js";

/**parc auto component */
//assurance
import Assurance from "./components/parcAuto/assurance/assurance.js";
//degat
import Degat from "./components/parcAuto/degat/degat.js";
//demande utilisation voiture
import DemandeVoiture from "./components/parcAuto/demandeVoiture/demandeVoiture.js";
//deplacement
import Deplacement from "./components/parcAuto/deplacement/deplacement.js";
//produit demandée memorandum
import Itineraire from "./components/parcAuto/itineraire/itineraire.js";
//marque et modele
import MarqueModele from "./components/parcAuto/marqueModele/marqueModele.js";
//piece
import Piece from "./components/parcAuto/piece/piece.js";
//piece touchée d'une voiture
import PieceTouchee from "./components/parcAuto/pieceTouchee/pieceTouchee.js";
//piece composant une voiture
import PieceVoiture from "./components/parcAuto/pieceVoiture/pieceVoiture.js";
//vignette
import Vignette from "./components/parcAuto/vignette/vignette.js";
//voiture
import Voiture from "./components/parcAuto/voiture/voiture.js";

/**profil utilisateur component */
//aptitude
import Aptitude from "./components/profil/aptitude/aptitude.js";
//employe
import Employe from "./components/profil/employe/employe.js";
//fonction
import Fonction from "./components/profil/fonction/fonction.js";
//deplacement
import MonProfil from "./components/profil/monProfil/monProfil.js";
//ORN
import Orn from "./components/profil/orn/orn.js";
//marque
import Unite from "./components/profil/unite/unite.js";


function App() {

  const { userInfo, getUserInfo } = AuthHooks();
  const token = getAccessToken();
  const getData = async () => {
    await getUserInfo();
  }

  useEffect(() => {
    getData()
  }, [token]);


  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<HomePageRouteVerification> <Dashboard /> </HomePageRouteVerification>} />

          {/* LOGIN ROUTE */}
          <Route index element={<Deconnection Cmp={Login} />} />

          {/* MEMORANDUM */}
          <Route path="/memorandum" element={<Protected Cmp={Memorandum} />} />

          {/* PRODUIT */}
          <Route path="/produit" element={<Protected Cmp={Produit} />} />

          {/* FOURNISSEUR */}
          <Route path="/fournisseur" element={<Protected Cmp={Fournisseur} />} />

          {/* ORN */}
          <Route path="/orn" element={<Protected Cmp={Orn} />} />
          
          {/* UNITÉ */}
          <Route path="/unite" element={<Protected Cmp={Unite} />} />
          
          {/* FONCTION */}
          <Route path="/fonction" element={<Protected Cmp={Fonction} />} />
          
          {/* MARQUE ET MODELE */}
          <Route path="/marqueModele" element={<Protected Cmp={MarqueModele} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
