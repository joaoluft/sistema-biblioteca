//Libs
const mysql = require('mysql');
let connection = require('./src/connection/connection');

// Conectando no banco de dados
const conn = connection.connectToDatabase(mysql);

// Se a conexão for estabelecida
if (conn) {
    console.log("Conectado no banco de dados!");

    const app = require('./src/app');

    const port = normalizaPort(process.env.PORT || '4545');

    function normalizaPort(val) {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }

        if (port >= 0) {
            return port;
        }

        return false;
    }

    app.listen(port, function () {
        console.log(`API (Sistema de biblioteca) funcionando na porta: ${port}`)
    })
} else {
    console.error("Não foi possível conectar no banco de dados!");
}