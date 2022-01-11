const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database
});

module.exports = db;
