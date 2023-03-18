const fs = require('fs');

// Arquivo de configurações
const configFile = JSON.parse(fs.readFileSync('./config.json'));

// Criando pool de conexão com o banco de dados
function connectToDatabase(mysql) {
    let connection = mysql.createPool(configFile.connectionData);
    return connection;
}

// Query no banco de dados
function queryDatabase(sql, connection) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

module.exports.connectToDatabase = connectToDatabase;
module.exports.queryDatabase = queryDatabase;