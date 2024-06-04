const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: '34.170.100.252',
  user: 'root',
  password: '',
  database: 'utal_asistencia_1'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to the MySQL server');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      if (results.length > 0) {
        res.send('Login exitoso');
      } else {
        res.send('Credenciales incorrectas');
      }
      res.end();
    });
  } else {
    res.send('Por favor, ingrese usuario y contraseña');
    res.end();
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
