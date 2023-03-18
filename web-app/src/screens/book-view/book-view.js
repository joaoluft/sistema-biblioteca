// Libs
import React, { useState, useEffect } from "react";
import { format } from 'date-fns';

// Componentes
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

// Arquivo de configurações
const configFile = require('./../../config.json');

function SecondScreen() {

    // Armazenando os erros
    let [error, setError] = useState('');

    // Armazenando os dados do livro
    let [book, setBook] = useState();

    // Utilizando o useEffect como uma maneira de evitar os loops desnecessários no código
    useEffect(() => {

        // Pegando o parâmetro "codigo" da URL
        const params = new URLSearchParams(window.location.search);
        let bookCode = params.get('codigo');

        // Criando a função "deleteBook" que enviará uma requisição de DELETE (sql) POST para a API
        const deleteBook = (e) => {
            e.preventDefault();

            // Parâmetros da requisição
            const deleteOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    codigo: bookCode, // Enviando código de identificação do item (livro) á ser excluído
                })
            };

            // Enviando a requisição para a API
            fetch('http://' + configFile.api.url + ':4545/deletebook', deleteOptions)

                // Tratando os dados retornados como JSON
                .then((response) => response.json())

                // Ao receber alguma resposta
                .then((data) => {

                    console.log(data);

                    // Tratando o erro retornado pela requisição
                    switch (data.error) {

                        // Caso não exista erros, voltará para a página anterior
                        case null:
                            window.history.go(-1);
                            break;

                        // Caso o valor de erro seja diferente de null, exibirá o erro recebido pela API dentro de um elemento de alerta
                        default:
                            console.log("erro");

                            // Setando a div de erro no state
                            setError(
                                <div className="flow-root w-full">
                                    <div className="flex">
                                        <div className="float-left relative top-4 mr-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 23 23" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-700">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                            </svg>
                                        </div>
                                        <div className="float-right w-full">
                                            <p className="pt-4 text-red-500">{data.error}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                            break;
                    }
                });
        }

        // Se o código do livro for diferente de null ou "" (string vazia)
        if (bookCode !== null && bookCode !== "") {

            // Parâmetros da requisição
            const getOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ codigo: bookCode })
            };

            // Enviando a requisição para a API
            fetch('http://' + configFile.api.url + ':4545/getbook', getOptions)

                // Tratando os dados retornados como JSON
                .then((response) => response.json())

                // Ao receber alguma resposta
                .then((data) => {

                    // Tratando o erro retornado pela requisição
                    switch (data.error) {

                        // Caso não exista erros, criará os elementos com os dados retornados pela requisição
                        case null:
                            let bookData = data.book[0];

                            setBook(
                                <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">

                                    <img className="object-cover w-full lg:w-1/2 xl:w-1/2 lg:mx-6 rounded-xl h-full" src={bookData.capa} alt={bookData.nome}></img>

                                    <div className="mt-6 w-full lg:mt-0 lg:mx-6">

                                        <p className="block mt-4 text-2xl font-semibold text-white">
                                            {bookData.nome}
                                        </p>

                                        <div className="block space-y-1 mt-4">
                                            <p className="text-white uppercase"><span className="text-gray-400">Tema:</span> {bookData.tema}</p>
                                            <p className="text-white uppercase"><span className="text-gray-400">Lançamento: </span> {format(new Date(bookData.lancamento), 'dd/MM/yyyy')}</p>
                                            <p className="text-white uppercase"><span className="text-gray-400">Chegada: </span> {format(new Date(bookData.chegada), 'dd/MM/yyyy, HH:mm')}</p>
                                            <p className="text-white uppercase"><span className="text-gray-400">Idioma: </span> {bookData.idioma}</p>
                                            <p className="text-white uppercase"><span className="text-gray-400">Estado: </span> {bookData.estado}</p>
                                        </div>

                                        <div className="flex items-center mt-6">
                                            <img className="object-cover object-center w-10 h-10 rounded-full bg-stone-700 p-1" src="https://cdn-icons-png.flaticon.com/512/3671/3671283.png" alt=""></img>

                                            <div className="mx-4">
                                                <h1 className="text-sm text-gray-200">Autor(es): {bookData.autor}</h1>
                                                <p className="text-sm text-gray-200">Editora: {bookData.editora}</p>
                                            </div>
                                        </div>

                                        <div className="mt-8 flex">
                                            <span className="relative top-3 uppercase text-gray-400">Código: </span>
                                            <span className="ml-2 tracking-widest text-2xl font-bold text-gray-100 bg-stone-700 px-4 py-2 rounded-xl">{bookData.codigo}</span>
                                        </div>

                                        <div className="mt-6 w-full border border-bottom border-gray-200 opacity-5"></div>

                                        <div className="mt-6">
                                            <button onClick={deleteBook} type="button" className="inline-flex items-center outline-none focus:ring-0 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2 text-white bg-red-600 hover:bg-red-700 focus:ring-red-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                                <span className="ml-2">Excluir livro</span>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            );
                            break;

                        // Caso aconteça algum erro ao requisitar os dados do livro, voltará para a página anterior
                        default:
                            window.history.go(-1);
                            break;
                    }
                });

            // Caso o código seja diferente de null ou "" (string vazia), voltará para a página anterior
        } else {
            window.history.go(-1);
        }
    }, []);

    // Retornando os elementos para exibição
    return (
        <div className="App flex flex-col">
            <Header></Header>

            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-3xl text-white">Informações do livro:</h1>

                {error}

                <div className="my-5 w-full border border-bottom border-gray-200 opacity-5"></div>

                {book}

            </div>

            <div className="h-12"></div>
            <Footer></Footer>
        </div>
    );
}

export default SecondScreen;