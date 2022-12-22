var dbConn = require("../config/db.config");
var marque = require('./marque.model');

var Modeles = function (modele) {
    this.idModele = modele.idModele;
    this.nomModele = modele.nomModele;
    this.carburant = modele.carburant;
    this.nombrePlaces = modele.nombrePlaces;
    this.idMarque = modele.idMarque;
};

Modeles.addModele = function (newModele, result) {
    dbConn.query("insert into modele set ?", newModele, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Ajout avec succes id: ${res.insertId}` });
        }
    });

};

Modeles.getAllModele = function (result) {
    dbConn.query("SELECT * from modele join marque on modele.idMarque=marque.idMarque where modele.idMarque != 0", function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Modeles.getByIdModele = function (idModele, result) {
    dbConn.query("SELECT * from modele where idModele = ?", idModele, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Modeles.getByIdMarque = function (idMarque, result) {
    dbConn.query("SELECT * from modele where idMarque = ?", idMarque, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

Modeles.deleteModele = function (idModele, result) {
    dbConn.query(`update modele set idMarque = 0 where idModele = ${idModele}`, function (err, res) {
        if (err) {
            result(err, null);
        } else {
            result(null, { message: `Modèle portant l identifiant : ${idModele} a été bien Supprimée ` });
        }
    });
};

Modeles.updateModele = function (newModele, idModele, result) {
    marque.getByIdMarque(newModele.idMarque, (err, resMq) => {
        if (resMq) {
            dbConn.query(`update modele set ? where idModele = ${idModele}`, newModele, function (err, res) {
                if (err) {
                    result(err, null);
                } else {
                    result(null, { message: `modification avec succes idModele: ${idModele}` });
                }
            });
        } else {
            result(null, { message: 'Marque inconnue' })

        }
    });
};



module.exports = Modeles;