const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "postgres",
  host: "skdb.cjawyscksd9j.eu-central-1.rds.amazonaws.com",
  database: "postgres",
  password: "postgres",
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false
 }
});


// Add user
app.post('/api/users', async (req, res) => {
  const { name, age } = req.body;
  try {
    await pool.query('INSERT INTO users (name, age) VALUES ($1, $2)', [name, age]);
    res.status(201).send('User added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

