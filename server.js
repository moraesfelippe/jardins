const express = require('express');
const mysql = require('mysql'); // ou mongoose para MongoDB
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'meu_banco_de_dados',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados MySQL.');
    }
});

// Rota para lidar com o envio do formulário
app.post('/api/formulario', (req, res) => {
    const { nome, email, mensagem } = req.body;

    const query = 'INSERT INTO formulario (nome, email, mensagem) VALUES (?, ?, ?)';
    db.query(query, [nome, email, mensagem], (err) => {
        if (err) {
            return res.status(500).send('Erro ao salvar os dados.');
        }
        res.status(200).send('Dados salvos com sucesso!');
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
