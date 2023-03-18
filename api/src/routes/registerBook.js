// Libs
const express = require('express');
const router = express.Router();
const mysql = require("mysql");

// Conectando com o banco de dados
let connection = require("../connection/connection");
const conn = connection.connectToDatabase(mysql);

// Se a conexão for estabelecida
if (conn) {
    router.post('/', function (req, res, next) {
        try {
            (async () => {

                // Se algum parâmetro do item (livro) for diferente de "" (string vazia)
                if (req.body.nome && req.body.tema && req.body.capa && req.body.autor && req.body.editora && req.body.idioma && req.body.codigo && req.body.estado != "") {

                    // Enviando query de INSERT para a tabela 'livros' do banco de dados com os valores recebidos na requisição
                    let query = await connection.queryDatabase("INSERT INTO livros VALUES ('', '" + req.body.nome + "', '" + req.body.tema + "', '" + req.body.capa + "', '" + req.body.autor + "', '" + req.body.editora + "', '" + req.body.idioma + "', '" + req.body.codigo + "', NOW(), '" + req.body.estado + "', NOW())", conn);

                    // Se a query for concluída com sucesso, ia retornar o valor de 'error' como null, ou seja, sem erros
                    if (query) {
                        res.send({ error: null });
                    }
                    // Caso algum parâmetro for diferente de "" (string vazia), irá retornar o valor de 'error' como "Erro ao deletar livro!" (string) para exibição na aplicação
                } else {
                    res.send({ error: "Todos os campos precisam ser preenchidos!" });
                }
            })();
        } catch (e) {
            console.error(e);
        }

    });

}

module.exports = router;