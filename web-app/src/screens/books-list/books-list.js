// Libs
import React, { useState, useEffect } from "react";

// Componentes
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Data from '../../components/body/data';

// Arquivo de configurações
const configFile = require('./../../config.json');

function SecondScreen() {

    let [body, setBody] = useState();

    useEffect(() => {
        fetch('http://' + configFile.api.url + ':4545')
            .then((res) => res.json())
            .then((livros) => {
                if (livros) {
                    setBody(
                        <Data></Data>
                    );
                }
            })
            .catch((err) => {
                if (err) {
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