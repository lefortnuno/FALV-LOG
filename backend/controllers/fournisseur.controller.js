"use strict";
const Fournisseurs = require("../models/fournisseur.model");

module.exports.getAllFournisseur = (req, res) => {
    Fournisseurs.getAllFournisseur((err, resp) => {
        res.send(resp)
    })
}

module.exports.getByIdFournisseur = (req, res) => {
    Fournisseurs.getByIdFournisseur(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.searchFournisseur = (req, res) => {
    Fournisseurs.searchFournisseur(req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.addFournisseur = (req, res) => {
    const { nomMagasin, coordonneesMagasin, raisonFidelisation } = req.body;
    const newFournisseur = {
        nomMagasin, coordonneesMagasin, raisonFidelisation
    }
    Fournisseurs.addFournisseur(newFournisseur, (err, resp) => {
        res.send(resp)
    })
}

module.exports.updateFournisseur = (req, res) => {
    const {idFournisseur, nomMagasin, raisonFidelisation, coordonneesMagasin } = req.body;
    const newFournisseur = {
       idFournisseur, nomMagasin, raisonFidelisation, coordonneesMagasin
    }
    Fournisseurs.updateFournisseur(newFournisseur, req.params.id, (err, resp) => {
        res.send(resp)
    })
}

module.exports.deleteFournisseur = (req, res) => {//put
    Fournisseurs.deleteFournisseur(req.params.id, (err, resp) => {
        res.send(resp)
    })
}