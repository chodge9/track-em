const mysql=require("mysql2")

const db = mysql.createConnection({
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'chantal',
    database: 'employee_db'
  });



  module.exports=db;

