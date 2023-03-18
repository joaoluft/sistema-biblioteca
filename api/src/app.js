// Libs
const express = require('express');
const app = express();
const cors = require('cors');

// Arquivos de rotas
const test = require('./routes/test');
const getBooksRoute = require('./routes/getBooks');
const getBookRoute = require('./routes/getBook');
const registerBookRoute = require('./routes/registerBook');
const deleteBookRoute = require('./routes/deleteBook');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors({
    origin: "*", // Liberação para requisição para qualquer IP por ser um projeto educacional
    methods: ['GET', 'POST'] // Métodos autorizados pelo CORS da API
}));

// Setando as rotas da API
app.use('/', test); // Rota de teste
app.use('/getbooks', getBooksRoute); // Rota para obter a lista de livros
app.use('/getbook', getBookRoute); // Rota para obter um livro específico
app.use('/registerbook', registerBookRoute); // Rota para registrar um livro
app.use('/deletebook', deleteBookRoute); // Rota para excluir um livro

module.exports = app;