const express = require("express");
const mysql = require("mysql");

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

// mysql://b52e7461f7c68f:58b4e85c@us-cdbr-east-02.cleardb.com/heroku_86eaed4516e7395?reconnect=true
// MySql
const connection = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b52e7461f7c68f",
  password: "58b4e85c",
  database: "heroku_86eaed4516e7395",
  //   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

// Route
app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

// Get all customers
app.get("/customers", (req, res) => {
  const sql = "SELECT * FROM customer";

  connection.query(sql, (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("Not result");
    }
  });
});

// Get customer by id
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM customer WHERE id = ${id}`;

  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("Not result");
    }
  });
});

// Update customer by id
app.put("/customers/:id", (req, res) => {
  const { id } = req.params;
  const { name, budget, budget_spent, date_of_first_purchase } = req.body;

  const sql = `UPDATE customer SET name = '${name}', budget = '${budget}',  budget_spent = '${budget_spent}', date_of_first_purchase = '${date_of_first_purchase}' WHERE id =${id}`;
  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Customer updated!");
  });
});

// Add New customer
app.post("/customers", (req, res) => {
  const sql = "INSERT INTO customer SET ?";

  const customerObj = {
    name: req.body.name,
    budget: req.body.budget,
    budget_spent: req.body.budget_spent,
    date_of_first_purchase: req.body.date_of_first_purchase,
  };

  connection.query(sql, customerObj, (error) => {
    if (error) throw error;
    res.send("Customer created!");
  });
});

// Delete customer by id
app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM customer WHERE id = ${id}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("Delete customer");
  });
});

// Check connect
connection.connect((error) => {
  if (error) throw error;
  console.log("Database server running!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
