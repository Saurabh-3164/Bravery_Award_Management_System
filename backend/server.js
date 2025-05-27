const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');
const app = express();
const PORT = 3000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


const config = {
  host: 'localhost',
  user: 'root',
  password: 'Cammilt@10',
  port: 3306,
  database: 'bravery_award',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  },
};

const connection = mysql.createConnection(config);
const NomineeRoute = require('./routes/NomineeRoute.js')(connection);
app.use('/api', NomineeRoute); // All routes will be prefixed with /api
const AdminRoute = require('./routes/Adminroute.js')(connection);
app.use('/api', AdminRoute); // All routes will be prefixed with /api
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  connection.query('CREATE DATABASE IF NOT EXISTS bravery_award', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');
    connection.query('USE bravery_award', (err) => {
      if (err) {
        console.error('Error using database:', err);
        return;
      }
      console.log('Using database bravery_award');
    });
  
    console.log('Connected to the MySQL database');
    
connection.query(`CREATE TABLE  IF NOT EXISTS nominees(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  address TEXT,
  contact VARCHAR(20),
  category VARCHAR(100),
  story TEXT,
  proofFiles JSON,
  nominatedBy VARCHAR(100),
  nominatorName VARCHAR(100),
  relation VARCHAR(100),
  orgName VARCHAR(100),
  contactPerson VARCHAR(100),
  followupQuestionsAndAnswers JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`, (err) => {
  if (err) {
    console.error('Error creating nominees table:', err);
    return;
  }
  console.log('Nominees table created or already exists');
});
  });
  });

 
// ✅ Home Route
app.get('/', (req, res) => {
  res.send(`
    <div>
      <h1>Bravery Award Management System</h1>
      <p>In development</p>
    </div>
  `);
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
