// Libs
const express = require('express');
const router = express.Router();
const mysql = require("mysql");

// Conectando com o banco de dados
let connection = require("../connection/connection");
const conn = connection.connectToDatabase(mysql);

// Se a conexão for estabelecida
if (conn) {

    // Recebendo requisição POST para consultar um item da tabela no banco de dados (livro)
    router.post('/', function (req, res, next) {
        try {
            (async () => {

                // Se o código de identificação do item (livro) for diferente de "" (string vazia) ou null
                if (req.body.codigo != "" && req.body.codigo != null) {

                    // Enviando query de SELECT para a tabela 'livros' do banco de dados buscando itens com o código indicado como parâmetro, limitando a busca a 1 item
                    let query = await connection.queryDatabase("SELECT * FROM livros WHERE codigo='" + req.body.codigo + "' LIMIT 1", conn);

                    // Se a query for concluída com sucesso e a array retornada tiver algum item, ia retornar o valor de 'error' como null, ou seja, sem erros e o valor de book com o valor recebido pela consulta (item/livro)
                    if (query && query.length !== 0) {
                        res.send({ error: null, book: query });

                    // Caso a consulta (query) seja mal-sucedida ou a array recebida não tenha nenhum item, o valor de 'error' será "Nenhum livro encontrado com este código!" (string) para exibição na aplicação
                    } else {
                        res.send({ error: "Nenhum livro encontrado com este código!" });
                    }
                // Caso o código de identificação for diferente de "" (string vazia), irá retornar o valor de 'error' como "Código inválido para pesquisa!" (string) para exibição na aplicação
                } else {
                    res.send({ error: "Código inválido para pesquisa!" });
                }
            })();
        } catch (e) {
            console.error(e);
        }

    });

}

module.exports = router;