const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@2002Mysql#',
  database: 'ambulance_portal'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Database connected');
});

module.exports = connection;