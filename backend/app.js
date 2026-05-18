require('dotenv').config();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const authMiddleware = require('./authMiddleware')
const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
const pgp = require('pg-promise')();
const connection = process.env.DATABASE_URL
const jwt_secret = process.env.JWT_SECRET
const db = pgp(connection);

const port = 4000

/* retorna a lista de contas de usuários */
app.get('/users', (req, res) => {
  db.any('SELECT * FROM users')
    .then(function(data) {
      // Retorna o status 200 (OK) e os dados explicitamente em formato JSON
      res.status(200).json(data);
    })
    .catch(function(error) {
      // Retorna o status 500 (Erro Interno do Servidor) e um objeto JSON estruturado
      res.status(500).json({ 
        error: "Erro interno no servidor ao buscar usuarios.",
        details: error.message || error 
      });
    });
});

/* rota responsável por apagar uma conta de usuário */
app.delete('/users/:id', (req, res) => {
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



/* autenticação do usuário */

/* cria uma nova conta de usuário */
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validação básica de entrada
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos os campos (name, email, password) são obrigatórios." });
  }

  try {
    const userExists = await db.oneOrNone('SELECT id FROM users WHERE email = $1', [email]);
    
    if (userExists) {
      return res.status(409).json({ error: "Este e-mail já está cadastrado." }); // 409 = Conflito
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await db.one(
      'INSERT INTO users(name, email, password_hash) VALUES($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, passwordHash]
    );

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: newUser
    });

  } catch (error) {
    console.error("Erro no processo de cadastro de usuário:", error);
    
    res.status(500).json({
      error: "Erro interno no servidor ao tentar criar a conta.",
      details: error.message || error
    });
  }
});

/* login e geração do token jwt */
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Validação básica de entrada
  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." }); 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    const token = jwt.sign(
      { user_id: user.id }, 
      jwt_secret,   
      { expiresIn: '8h' }
    );

    res.status(200).json({
      message: "Login realizado com sucesso!",
      token: token,
      user: {
        user_id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error("Erro durante o processo de login:", error);
    res.status(500).json({
      error: "Erro interno no servidor ao tentar fazer login.",
      details: error.message || error
    });
  }
});



/* rotas responsáveis pelo cadastro de clientes no app */

/* retorna a lista de clientes cadastrados em um usuário */
app.get('/customers',authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const clientes = await db.any('SELECT * FROM customers WHERE user_id = $1', [userId]);

    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar clientes." });
  }

});

/* realiza o cadastro de um novo cliente na conta de usuário*/
app.post('/customers',authMiddleware, async (req, res) => {
  const {name, email, phone, address } = req.body;
  db.one('INSERT INTO customers(user_id, name, email, phone, address) VALUES($1, $2, $3, $4, $5) RETURNING id', [req.userId, name, email, phone, address])
    .then(data => {
      const newUser = {
        user_id: req.userId,
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

/* atualiza um cliente na base de dados */
app.put('/customers/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  db.result('UPDATE users SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5', [name, email, phone, address, id])
    .then(result => {
      if(result.rowCount > 0){
        res.json({
          mensagem: 'usuário Atualizado com sucesso',
          id: id,
          name: name,
          email: email,
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = { app, db, pgp };