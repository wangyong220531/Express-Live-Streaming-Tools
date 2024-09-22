const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(express.json());

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

app.post('/data', (req, res) => {
  
  const { lastNameOfFather, lastNameOfMother, gender } = req.body;

  let table_name = gender === '男' ? 'boy_names' : 'girl_names'


  let query = `SELECT * FROM ${table_name}`;

  if (lastNameOfFather || lastNameOfMother || gender) {
    query += ' WHERE ';
    const conditions = [];
    if (lastNameOfFather) {
      conditions.push(`last_name = '${lastNameOfFather}'`);
    }
    // if (lastNameOfMother) {
    //   conditions.push(`last_name_of_mother = '${lastNameOfMother}'`);
    // }
    query += conditions.join(' AND ');
  }
  connection.query(query, (error, results, fields) => {
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