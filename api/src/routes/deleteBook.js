// Libs
const express = require('express');
const router = express.Router();
const mysql = require("mysql");

// Conectando com o banco de dados
let connection = require("../connection/connection");
const conn = connection.connectToDatabase(mysql);

// Se a conexão for estabelecida
if (conn) {

    // Recebendo requisição POST para deletar um item da tabela no banco de dados (livro)
    router.post('/', function (req, res, next) {
        try {
            (async () => {
                // Se o código de identificação do item (livro) for diferente de "" (string vazia) ou null
                if (req.body.codigo != "" && req.body.codigo != null) {

                    // Enviando query de DELETE para a tabela 'livros' do banco de dados buscando itens com o código indicado como parâmetro
                    let query = await connection.queryDatabase("DELETE FROM livros WHERE codigo='" + req.body.codigo + "'", conn);

                    // Se a query for concluída com sucesso, ia retornar o valor de 'error' como null, ou seja, sem erros
                    if (query) {
                        res.send({error: null});
                    }
                // Caso o código de identificação for diferente de "" (string vazia), irá retornar o valor de 'error' como "Erro ao deletar livro!" (string) para exibição na aplicação
                } else {
                    res.send({error: "Impossível excluir este livro!"});
                }
            })();
        } catch (e) {
            console.error(e);
        }

    });

}

module.exports = router;