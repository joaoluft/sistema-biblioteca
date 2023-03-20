// Libs
import React, { useState, useEffect } from "react";

// Componentes
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Data from '../../components/body/data';

// Arquivo de configurações
const configFile = require('./../../config.json');

function SecondScreen() {

    // Armazenando o html da exibição
    let [body, setBody] = useState();

    useEffect(() => {
        // Enviando a requisição para a API
        fetch('http://' + configFile.api.url + ':4545')

            // Tratando os dados retornados como JSON
            .then((res) => res.json())

            // Ao receber alguma resposta
            .then((livros) => {
                if (livros) {
                    // Setando o o html da exibição
                    setBody(
                        <Data></Data>
                    );
                }
            })
            .catch((err) => {
                if (err) {

                    // Setando o o html da exibição
                    setBody(
                        <h1 className="font-bold text-gray-100 text-2xl text-center py-12">Impossível conectar ao banco de dados!</h1>
                    )
                }
            });
    }, []);

    return (
        <div className="App flex flex-col">
            <Header></Header>

            <main className="flex-grow p-10">
                {body}
            </main>

            <div className="h-12"></div>

            <Footer></Footer>
        </div>
    );
}

export default SecondScreen;