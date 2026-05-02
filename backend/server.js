const express = require('express')
const app = express()
app.use(express.json());
const pgp = require('pg-promise')();
const connection = 'postgres://postgres:secret@postgres:5432/cadastro-clientes-db?sslmode=disable'
const db = pgp(connection);

const port = 4000

app.get('/clientes', (req, res) => {
  db.any('SELECT * FROM users')
    .then(function(data) {
      res.send(data);
    })
    .catch(function(error) {
      res.send(error)
    });
});

app.get('/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.any('SELECT * FROM users WHERE id = $1', [id])
    .then(function(data) {
      res.send(data);
    })
    .catch(function(error) {
      res.send('ERROR:', error);
    });
});

app.post('/clientes', (req, res) => {
  const {name, email, password } = req.body;
  db.one('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id', [name, email, password])
    .then(data => {
      const newUser = {
        id: data.id,
        name: name,
        email: email,
        password: password
      }
      res.json(newUser);
    })
    .catch(error => {
      res.send('ERROR:', error);
    });
});

app.put('/clientes/:id', (req, res) => {});

app.delete('/clientes/:id', (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
