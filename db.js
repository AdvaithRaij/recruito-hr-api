require("dotenv").config();

const mysql = require("mysql2");

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL);

// // Example with placeholders
// connection.query("select * from CandidateInfo ", function (err, results) {
//   console.log(results);
// });

module.exports = connection;
