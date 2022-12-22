"use strict";

const Employes = require("../models/employe.model");
const jwt = require("jsonwebtoken");
const tmp = 3 * 24 * 60 * 60 * 1000;//
const argon2 = require('argon2');



const createToken = (matricule) => {
    return jwt.sign({ matricule }, `08Flavien99Airolg256`, { expiresIn: tmp });
  };

module.exports.getAllEmploye = (req, res) => { //get
    Employes.getAllEmploye((err, resp) => {
        res.send(resp)
    })
}

module.exports.getChauffeur = (req, res) => { //get
    Employes.getChauffeur((err, resp) => {
        res.send(resp)
    })
}

module.exports.getInfoUserConnected = (req, res) => { 
    const token = req.headers.authorization;
    const donnee = {
        message: "Une erreur s'est produite ",
        success: false,
        userLogged: null
    }
    let status = 200;
    let employeDatabase = null;
    if(token){
        let payload = null;
        try {
            payload = jwt.verify(token, "08Flavien99Airolg256")
            donnee.message = "valide token "
            const { matricule } = payload;
            donnee.success = true
            donnee.userLogged = matricule[0];
        } catch (e) {
            if (e instanceof jwt.JsonWebTokenError) {
                console.log("erreur de json web token ")
                donnee.message ="Token n'est plus valide";
                status = 400;
            }else {
                donnee.message ="Une erreur s'est produite veuillez reessayer plus tard   ";
                status = 500;
            }            
        } 
        reponseApi(donnee, status, res);
    }else reponseApi(donnee, 400, res);
   // Employes.getByMatricule();

}

const reponseApi = (donnee, status, res) => {
    res.status(status).json({...donnee});
}

module.exports.loginEmploye = (req, res) => {
    const { mail, motDePasse } = req.body;
    const bcrypt = require("bcrypt");
    Employes.loginEmploye({mail, motDePasse }, (err, resp) => {
        
        if (!err) {
            if (resp.length != 0) {           
                const pwd = resp[0].motDePasse;
                const nom = resp[0].nom;
                console.log(nom  + `\n mail: ` + mail);
                const validPassword = bcrypt.compareSync(motDePasse, pwd);
                if (validPassword) {
                    const token = createToken(resp);
                    res.send({ success: true, token, user: resp });
                } else {
                    // result(err + " mot de passe erroné" + resp, null);
                    res.send({ success: false });
                }
            } else {
                console.log("le mail de cet utilisateur n'est pas valide");                    
                // result(err + " Employe non trouvé", null);
            }
        } else {
            res.send(err + " \n erreur cote serveur");
        }
    });
};

module.exports.getByMatricule = (req, res) => { //get
    Employes.getByMatricule(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByMail = (req, res) => { //get
    Employes.getByMail(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdFonction = (req, res) => { //get
    Employes.getByIdFonction(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getFonction = (req, res) => { //get
    Employes.getFonction(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getRangFonction = (req, res) => { //get
    Employes.getRangFonction(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getUnite = (req, res) => { //get
    Employes.getUnite(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.getEmployeUnite = (req, res) => { //get
    Employes.getEmployeUnite(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.searchEmploye = (req, res) => { //get
    Employes.searchEmploye(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addEmploye = async(req, res) => { //post
    
    const { matricule, nom, prenoms, photoIdentite, mail, motDePasses, idFonction } = req.body;

    const bcrypt = require('bcrypt');

    const motDePasse = bcrypt.hashSync(motDePasses, 10);
    
    const newEmploye = {
        matricule, nom, prenoms, photoIdentite, mail, motDePasse, idFonction
    }
    Employes.addEmploye(newEmploye, (err, resp) => {
        res.send(resp )
    })
    
}

module.exports.updateEmploye = (req, res) => { //put
    const { matricule, nom, prenoms, photoIdentite, mail, motDePasse, idFonction } = req.body;
    const newEmploye = {
        matricule, nom, prenoms, photoIdentite, mail, motDePasse, idFonction
    }
    Employes.updateEmploye(newEmploye, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteEmploye = (req, res) => {  //put
    Employes.deleteEmploye(req.params.id, (err, resp) => {
        res.send(resp)
    })
}


/**mbol misy getCheuffeurLibre et noLibre*/