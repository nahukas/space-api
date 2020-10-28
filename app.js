const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootpass",
  database: "node20_mysql",
});

// Check connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
