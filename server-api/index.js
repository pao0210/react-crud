const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const saltRounds = 10; 
const secret = "mysecretkey";

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  localhost: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "employees",
});

app.get("/api/getemployees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err, status: "error", message: "Fail getted employees" });
    } else {
      res.send({ employees: result, status: "ok", message: "Employees fetched successfully" });
    }
  });
});

app.post("/api/insert", (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const position = req.body.position;
    const salary = req.body.salary;
    db.query("INSERT INTO employees (name, surname, position, salary) VALUES (?, ?, ?, ?)", [name, surname, position, salary], (err, result) => {
        if (err) {
            res.send({ err:err, status : "error", message: "This employee already exists" });
        } else {
            res.send({ result: result, status: "ok", message: "Employee added successfully" });
        }
    })
});

app.put("/api/update/:id", (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const surname = req.body.surname;
    const position = req.body.position;
    const salary = req.body.salary;
    db.query("UPDATE employees SET name = ?, surname = ?, position = ?, salary = ? WHERE id = ?", [name, surname, position, salary, id], (err, result) => {
        if (err){
            res.send({ err:err, status : "error", message: "Fail updated employee" });
        } else {
            res.send({ result: result, status: "ok", message: "Employee updated successfully" });
        }
    });
});

app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.send({ err:err, status : "error", message: "Fail deleted employee" });
        } else {
            res.send({ result: result, status: "ok", message: "Employee deleted successfully" });
        }
    })
});

app.listen(3001, () => {
    console.log("server is running...")
})