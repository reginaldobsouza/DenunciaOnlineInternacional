const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

const registerForm = document.querySelector('.form-box.register form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    fetch('cadastro.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Cadastro realizado com sucesso!');
              window.location.href = 'welcome.html';
          } else {
              alert('Erro no cadastro: ' + data.message);
          }
      });
});

function openRegisterPage() {
    window.location.href = 'cadastro.html';
}

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'denuncia_online'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados.');
});

// Rota para criar um novo usuário
app.post('/users', (req, res) => {
    const { username, email, password } = req.body;
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) throw err;
        res.send('Usuário cadastrado com sucesso!');
    });
});

// Rota para listar todos os usuários
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Rota para atualizar um usuário
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const sql = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
    db.query(sql, [username, email, password, id], (err, result) => {
        if (err) throw err;
        res.send('Usuário atualizado com sucesso!');
    });
});

// Rota para deletar um usuário
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send('Usuário deletado com sucesso!');
    });
});

// Exemplo de integração com as funções do index.js
import { acessarLogin, criarConta } from './index.js';

// Caso necessário, adicione lógica adicional para integração
function inicializarApp() {
    console.log('Inicializando o aplicativo...');
    acessarLogin();
    criarConta();
}

// Chamada da inicialização
inicializarApp();

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000.');
});
