import React, { useState, useEffect, useRef } from "react";

// Components
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const configFile = require('./../../config.json');

function SecondScreen() {

    // Armazenando os erros
    let [error, setError] = useState('');

    // Armazenando a foto para exibição no input do formulário
    let [photo, setPhoto] = useState("");
    let imgRef = useRef();

    const convertBase64 = (file) => {
        if (file) {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                    resolve(fileReader.result);
                }
                fileReader.onerror = (error) => {
                    reject(error);
                }
            })
        }
    }

    const submitRegister = async (e) => {
        e.preventDefault();

        const registerOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: e.target[0].value,
                tema: e.target[1].value,
                autor: e.target[2].value,
                editora: e.target[3].value,
                idioma: e.target[4].value,
                estado: e.target[5].value,
                capa: await convertBase64(e.target[6].files[0]),
                codigo: (Math.random().toString(36).slice(2, 7)).toUpperCase(),
            })
        };

        fetch('http://' + configFile.api.url + ':4545/registerbook', registerOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                switch (data.error) {
                    case null:
                        window.history.go(-1);
                        break;
                    default:
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

    return (
        <div className="App flex flex-col">
            <Header></Header>

            <div className="p-12">
                <form onSubmit={submitRegister}>
                    <h1 className="text-gray-100 text-2xl">Informações do livro</h1>

                    {error}

                    <div className="my-5 w-full border border-bottom border-gray-200 opacity-5"></div>
                    <div className="w-full block space-y-6 md:space-y-0 md:flex md:space-x-6">
                        <div className="w-full">
                            <label htmlFor="book-name" className="block text-sm font-medium leading-6 text-gray-100">
                                Nome
                            </label>
                            <input type="text" id="book-name" placeholder="Harry Potter e a Pedra Filosofal" className="mt-2 px-3 block w-full rounded-lg border-0 py-1.5 text-gray-900 focus:ring-0 outline-none sm:text-sm sm:leading-6 placeholder:text-gray-400" />
                        </div>

                        <div className="w-full md:max-w-xs">
                            <label htmlFor="book-theme" className="block text-sm font-medium leading-6 text-gray-100">
                                Tema
                            </label>
                            <input type="text" id="book-theme" placeholder="Ficção" className="mt-2 px-3 block w-full rounded-lg border-0 py-1.5 text-gray-900 focus:ring-0 outline-none sm:text-sm sm:leading-6 placeholder:text-gray-400" />
                        </div>
                    </div>

                    <div className="w-full block md:flex md:space-x-6 space-y-6 md:space-y-0 mt-8">
                        <div className="w-full md:max-w-xs">
                            <label htmlFor="book-author" className="block text-sm font-medium leading-6 text-gray-100">
                                Autor ou autores
                            </label>
                            <input type="text" id="book-author" placeholder="J. K. Rowling" className="mt-2 px-3 block w-full rounded-lg border-0 py-1.5 text-gray-900 focus:ring-0 outline-none sm:text-sm sm:leading-6 placeholder:text-gray-400" />
                        </div>

                        <div className="w-full">
                            <label htmlFor="book-publisher" className="block text-sm font-medium leading-6 text-gray-100">
                                Editora
                            </label>
                            <input type="text" id="book-publisher" placeholder="Bloomsbury Publishing" className="mt-2 px-3 block w-full rounded-lg border-0 py-1.5 text-gray-900 focus:ring-0 outline-none sm:text-sm sm:leading-6 placeholder:text-gray-400" />
                        </div>

                        <div className="w-full md:max-w-xs">
                            <label htmlFor="book-language" className="block text-sm font-medium leading-6 text-gray-100">
                                Idioma
                            </label>

                            <select id="book-language" className="mt-2 px-3 block w-full rounded-lg border-0 py-2 text-gray-900 focus:ring-0 outline-none sm:text-sm sm:leading-6">
                                <option value="Português">Português</option>
                                <option value="Espanhol">Espanhol</option>
                                <option value="Inglês">Inglês</option>
                                <option value="Francês">Francês</option>
                                <option value="Chinês">Chinês</option>
                                <option value="Árabe">Árabe</option>
                                <option value="Russo">Russo</option>
                                <option value="Japonês">Japonês</option>
                                <option value="Turco">Turco</option>
                                <option value="Alemão">Alemão</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>

                        <div className="w-full md:max-w-xs">
                            <label htmlFor="book-state" className="block text-sm font-medium leading-6 text-gray-100">
                                Estado
                            </label>

                            <select id="book-state" className="mt-2 px-3 block w-full rounded-lg border-0 py-2 text-gray-900 focus:ring-0 outline-none sm:text-sm sm:leading-6">
                                <option value="Novo">Novo</option>
                                <option value="Boas condições">Boas condições</option>
                                <option value="Bastante usado">Bastante usado</option>
                                <option value="Estado crítico">Estado crítico</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="block text-sm font-medium leading-6 text-gray-100">Capa</p>
                        <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                            <div>
                                <div className="space-y-1 text-center">
                                    <div className="mb-6">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="book-cover" className="w-full my-2 relative cursor-pointer rounded-md p-2 bg-white font-medium outline-none focus:ring-0">
                                                <span className="px-2">Carregar arquivo</span>
                                                <input onChange={e => {
                                                    setPhoto(e.target.value);
                                                    var src = URL.createObjectURL(e.target.files[0]);
                                                    imgRef.current.src = src;
                                                }} id="book-cover" type="file" className="sr-only" accept="image/png, image/jpeg" />
                                            </label>
                                        </div>

                                        <p className="text-xs text-gray-500">PNG ou JPG</p>
                                    </div>
                                </div>


                                <img className="w-64 overflow-hidden rounded-xl" ref={imgRef} />
                            </div>
                        </div>

                    </div>

                    <div className="mt-8">
                        <button className="transition-all w-full md:w-fit duration-300 bg-white hover:bg-gray-300 font-bold py-2 px-5 rounded inline-flex items-center">

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" fill="currentColor" className="fill-current w-5 h-5 mr-2">
                                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                                <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                            </svg>


                            <span>Adicionar livro</span>
                        </button>
                    </div>


                </form>
            </div>
            <div className="h-12"></div>
            <Footer></Footer>
        </div>
    );
}

export default SecondScreen;