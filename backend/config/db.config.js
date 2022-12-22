"use strict";
const mysql = require("mysql");
//local mysql db connection
const dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "osfb_db",
});
dbConn.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données!");
});
module.exports = dbConn;
