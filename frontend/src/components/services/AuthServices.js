import axios from "axios";
import { useNavigate } from "react-router-dom";

export const TOKEN = "token";

export const setAccessToken = (tokenValue) => {
    localStorage.setItem(TOKEN, tokenValue);
}

export const getAccessToken = () => {
    const token = localStorage.getItem(TOKEN);
    // check validite token 
    return token;
}

export const isAuthenticatedVerification =  () => {
    return new Promise(async (resolve, reject) => {
        let userAuthenticated = null;

    const token = getAccessToken();
    axios.defaults.headers.common.Authorization = token;
    // const reponseAxios = await axios.get("http://localhost:5000/api/employe/userConnected");
    try{
        const reponseApi = await axios.get("http://localhost:5000/api/employe/userConnected");
        const {message, success, userLogged} = reponseApi.data;
        if(success && userLogged){
            userAuthenticated = userLogged;
            return resolve(userAuthenticated);
        }else {
            console.log(message)
            return null;
        }
    }catch(err) {
        console.log(err.message)
        if(err.message.includes("400")){
            console.log("Token n'est plus valide ")
            
        }else {
            console.log("Une erreur s'est produite, veuillez reessayer plus tard")
        }

    }
    return resolve(userAuthenticated);
    // console.log(reponseAxios.data);
    })
    
}

export const logout = () => {
    // vider le local storage 
    localStorage.clear();
}