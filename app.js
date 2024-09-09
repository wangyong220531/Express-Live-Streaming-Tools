const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: '111.231.19.23',
  user: 'forWangyongDev',
  password: 'HsMB74nrmrMCb2jK',
  database: 'forwangyongdev',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM fullFemaleNames', (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});