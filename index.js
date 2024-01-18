const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req?.body);
    connection.query(
      `SELECT username FROM users WHERE email = '${email}' AND password = '${password}'`,
      (err, results) => {
        console.log(results);
        res.json(results);
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/apply", (req, res) => {
  try {
    const { name, email, phone, skillsQualifications, currentStatus, salary } =
      req.body;
    connection.query(
      `INSERT INTO CandidateInfo (CandidateName, Email, Phone, SkillsQualifications, CurrentStatus, ExpectedSalary) VALUES('${name}', '${email}', '${phone}', '${skillsQualifications}', '${currentStatus}', '${salary}')`,
      (err, results) => {
        res.json(results);
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/update-info", (req, res) => {
  try {
    const {
      id,
      name,
      email,
      phone,
      skillsQualifications,
      currentStatus,
      salary,
    } = req.body;
    console.log(id, currentStatus);
    connection.query(
      `UPDATE CandidateInfo SET CandidateName = '${name}', Email = '${email}', Phone = '${phone}', SkillsQualifications = '${skillsQualifications}', CurrentStatus = '${currentStatus}', ExpectedSalary = '${salary}' WHERE CandidateID = '${id}';`,
      (err, results) => {
        res.json(results);
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/applications", (req, res) => {
  try {
    connection.query("SELECT * FROM CandidateInfo", function (err, results) {
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      `SELECT * FROM CandidateInfo WHERE todo_id = ${id}`,
      (err, result) => {
        res.json(result);
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/todos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const {
      CandidateName,
      Phone,
      SkillsQualifications,
      CurrentStatus,
      ExpectedSalary,
    } = req.body;
    connection.query(
      `UPDATE CandidateInfo SET description = $1 WHERE CandidateID = ${id}`,
      (err, result) => {
        res.json("Todo was updated!");
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await connection.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(8000, () => {
  console.log("server has started on port 8000");
});
