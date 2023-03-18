// Libs
const express = require('express');
const router = express.Router();
const mysql = require("mysql");

// Conectando com o banco de dados
let connection = require("../connection/connection");
const conn = connection.connectToDatabase(mysql);

// Se a conexão for estabelecida
if (conn) {
    router.get('/', function (req, res, next) {
        try {
            (async () => {

                // Enviando query de SELECT para a tabela 'livros' do banco de dados buscando todos itens para criar uma lista de exibição na aplicação
                let query = await connection.queryDatabase("SELECT * FROM livros", conn);

                // Se a query for concluída com sucesso, irá retornar uma array com os itens encontrados
                if (query) {
                    res.status(200).send(query);
                }
            })();
        } catch (e) {
            console.error(e);
        }

    });

}

module.exports = router;