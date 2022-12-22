"use strict";
const Marques = require("../models/marque.model");
const path = require("path");
const multer = require("multer");

const storageFace = multer.diskStorage({
  destination: path.join(
    __dirname,
    "../../frontend/public/",
    "pic"
  ),
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports.addPhotoLogoMarque = (req, res) => {
  try {
    // 'avatar' is the name of our file input field in the HTML form
    let upload = multer({ storage: storageFace }).single("logoMarque");

    upload(req, res, function (err) {
      if (!req.file) {
        return res.send("Selectioner une image à enregistrer.");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }

      const classifiedsadd = {
        logoMarque: req.file.filename,
      };

      Marques.updateMarque(classifiedsadd, req.params.id, (err, resp) => {
        if (err) {
          res.send(err);
        } else {
          res.send(resp);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllMarque = (req, res) => {
  Marques.getAllMarque((err, resp) => {
    res.send(resp);
  });
};

module.exports.getByIdMarque = (req, res) => {
  Marques.getByIdMarque(req.params.id, (err, resp) => {
    res.send(resp);
  });
};

module.exports.addMarque = (req, res) => {
  const { nomMarque, logoMarque } = req.body;
  const newMarque = {
    nomMarque,
    logoMarque,
  };
  Marques.addMarque(newMarque, (err, resp) => {
    res.send(resp);
  });
};

module.exports.updateMarque = (req, res) => {
  const { idMarque, nomMarque, logoMarque } = req.body;
  const newMarque = {
    idMarque,
    nomMarque,
    logoMarque,
  };
  Marques.updateMarque(newMarque, req.params.id, (err, resp) => {
    res.send(resp);
  });
};

module.exports.deleteMarque = (req, res) => {
  //put
  Marques.deleteMarque(req.params.id, (err, resp) => {
    res.send(resp);
  });
};
