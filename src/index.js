const express = require("express");
const path = require("path");
const mysql = require("mysql");
const app = express();
const jwt = require("jsonwebtoken");
const expressSession = require("express-session");
const bodyParser = require("body-parser");
var cors = require("cors");

const port = 3000;
// Database
const db = require("./config/db.config");
// ROUTE
const HOME_ROUTE = require("./routes/site");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use(cors());

// EJS
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Site Route
app.use("/", HOME_ROUTE);

if (process.env.NODE_ENV === "test") {
	app.set("port", 3002);
}

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
module.exports = app;
