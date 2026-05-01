const express = require('express')
const app = express()
app.use(express.json());
const pgp = require('pg-promise')();
const connection = 'postgres://postgres:secret@postgres:5432/cadastro-clientes-db?sslmode=disable'
const db = pgp(connection);

const port = 4000

// Rotas CRUD para Clientes
app.get('/clientes', (req, res) => {
  db.any('SELECT * FROM users')
    .then(function(data) {
      // success;
      res.send(data);
    })
    .catch(function(error) {
      // error;
      res.send(error)
    });
});

app.get('/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.any('SELECT * FROM users WHERE id = $1', [id])
    .then(function(data) {
      // success;
      res.send(data);
    })
    .catch(function(error) {
      // error;
      res.send(error)
    });
});

app.post('/clientes', (req, res) => {});

app.put('/clientes/:id', (req, res) => {});

app.delete('/clientes/:id', (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
