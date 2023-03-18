const express = require('express');
const router = express.Router();

// Recebendo requisição de teste (GET)
router.get('/', function (req, res, next) {

    // Retornando o resultado
    res.status(200).send({
        app: "Sistema de biblioteca",
        working: true
    });
});

module.exports = router;