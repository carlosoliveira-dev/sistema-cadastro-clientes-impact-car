require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
const pgp = require('pg-promise')();
const connection = process.env.DATABASE_URL
const db = pgp(connection);

const port = 4000

app.get('/clientes', (req, res) => {
  db.any('SELECT * FROM users')
    .then(function(data) {
      // Retorna o status 200 (OK) e os dados explicitamente em formato JSON
      res.status(200).json(data);
    })
    .catch(function(error) {
      // Retorna o status 500 (Erro Interno do Servidor) e um objeto JSON estruturado
      res.status(500).json({ 
        error: "Erro interno no servidor ao buscar clientes.",
        details: error.message || error 
      });
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
  const {name, email, phone, address } = req.body;
  db.one('INSERT INTO users(name, email, phone, address) VALUES($1, $2, $3, $4) RETURNING id', [name, email, phone, address])
    .then(data => {
      const newUser = {
        id: data.id,
        name: name,
        email: email,
        phone: phone,
        address: address
      }
      // Retorna o status 201 (Created) que é o padrão ideal para criação de registros
      res.status(201).json(newUser);
    })
    .catch(error => {
      // Registra o erro no terminal do seu backend
      console.error("Erro ao inserir usuário no banco:", error);

      // Retorna o status 400 (Bad Request) ou 500 se for erro do banco
      res.status(400).json({
        error: "Erro ao cadastrar o cliente.",
        details: error.message || error
      });
    });
});

app.put('/clientes/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  db.result('UPDATE users SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5', [name, email, phone, address, id])
    .then(result => {
      if(result.rowCount > 0){
        res.json({
          mensagem: 'usuário Atualizado com sucesso',
          id: id,
          name: name,
          phone: phone,
          address: address
        });
      }
      else{
        res.send('ERROR: id de usuário não cadastrado');
      }
    })
    .catch(error => {
        console.log('ERROR:', error);
    });
});

app.delete('/clientes/:id', (req, res) => {
  const { id } = req.params;
  db.result('DELETE FROM users WHERE id = $1', id)
    .then(result => {
        if(result.rowCount > 0){
          res.send('usuário Excluido com Sucesso');
        }
        else{
          res.send('ERROR: id de usuário não cadastrado');
        }
    })
    .catch(error => {
        console.log('ERROR:', error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = { app, db, pgp };