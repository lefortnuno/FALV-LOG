import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.scss";
import "../../Login_form/css/main.css";
import "../../Login_form/css/util.css";
import "../../Login_form/vendor/bootstrap/css/bootstrap.min.css";
import { getAccessToken } from "../services/AuthServices";
import AuthHooks from "../hooks/AuthHooks";

export default function Login() {
    
  const navigate = useNavigate();
  const {logIn} = AuthHooks();
  // FONCTION A EXECUTER LORS DU CLIC ' SE-CONNECTER ' ----- () => SE CONNECTER -----
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  //ENVOYER DONNER FORMULAIRE AU BACK-END
  const onSubmit = async (event) => {
    event.preventDefault();
    const redirection = await logIn(inputs);
    if(redirection) {
      // window.reload();
      const token = getAccessToken();
      if(token) navigate("/dashboard");
    }
  };
    return (
        <div className="limiter">
            <div className="container-login100" id="test">
                <div className="wrap-login100">
                    <div className="login100-form-title" id="imagTitle">
                        <span className="login100-form-title-1">Sign In</span>
                    </div>
                    <form
                        className="login100-form validate-form"
                        id="formLogin"
                        encType="multipart/form-data"
                    >
                        <div>
                            <p className="text-danger text-center">
                                {/* {errorMsg} */}
                            </p>
                        </div>
                        <div
                            className="wrap-input100 validate-input m-b-26"
                            data-validate="Username is required"
                        >
                            <span className="label-input100">Mail</span>
                            <input
                                className="input100"
                                type="text"
                                name="mail"
                                // defaultValue={username}
                                placeholder="Entrer votre mail"
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div
                            className="wrap-input100 validate-input m-b-18"
                            data-validate="Password is required"
                        >
                            <span className="label-input100">Mot de passe</span>
                            <input
                                className="input100"
                                type="password"
                                name="motDePasse"
                                placeholder="Entrer Mot de passe"
                                onChange={handleChange}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="flex-sb-m w-full p-b-30">
                            <div>
                                
                            </div>
                        </div>

                        <div className="container-login100-form-btn">
                            <button
                                id="btn"
                                className="login100-form-btn"
                                onClick={onSubmit}
                            >   
                                SE CONNECTER
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
