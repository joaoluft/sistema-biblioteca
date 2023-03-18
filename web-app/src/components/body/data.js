// Libs
import React, { useState, useEffect } from "react";
const configFile = require('./../../config.json');

function Data() {

    let [items, setItems] = useState();

    // Consultando API e gerando itens
    useEffect(() => {
        fetch('http://' + configFile.api.url + ':4545/getbooks')
            .then((res) => res.json())
            .then((livros) => {
                if (livros) {
                    const result = [];

                    livros.forEach((livro, index) => {

                        result.push(
                            <a href={window.location.href + "livro?codigo=" + livro.codigo}>
                                <div key={index} className="bg-stone-800 rounded-xl overflow-hidden text-gray-100 cursor-pointer">

                                    <img className="object-cover w-full" src={livro.capa} alt="capa do livro"></img>
                                    <div className="py-2 px-3">
                                        <h1>{livro.nome}</h1>
                                    </div>
                                </div>
                            </a>
                        );
                    });

                    setItems(
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:md:grid-cols-4 xl:md:grid-cols-6 gap-4 place-items-stretch">
                            {result}
                        </div>
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    let [search, setSearch] = useState('');

    const proccessSearch = async (value) => {
        setSearch(value)

        fetch('http://' + configFile.api.url + ':4545/getbooks')
            .then((res) => res.json())
            .then((livros) => {
                if (livros) {

                    const result = [];

                    let searchFiltered = livros.filter(item => item.nome.toLowerCase().includes(search.toLowerCase()) || item.tema.toLowerCase().includes(search.toLowerCase()) || item.autor.toLowerCase().includes(search.toLowerCase()) || item.codigo.toLowerCase().includes(search.toLowerCase()));

                    if (searchFiltered.length !== 0) {
                        searchFiltered.forEach((livro, index) => {
                            result.push(
                                <a href={window.location.href + "livro?codigo=" + livro.codigo}>
                                    <div key={index} className="bg-stone-800 rounded-xl overflow-hidden text-gray-100 cursor-pointer">

                                        <img className="object-cover w-full" src={livro.capa} alt="capa do livro"></img>
                                        <div className="py-2 px-3">
                                            <h1>{livro.nome}</h1>
                                        </div>
                                    </div>
                                </a>
                            );
                        });

                        setItems(
                            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:md:grid-cols-4 xl:md:grid-cols-6 gap-4 place-items-stretch">
                                {result}
                            </div>
                        );

                    } else {
                        setItems(<h1 className="font-bold text-gray-100 text-2xl text-center py-12">Nenhum livro encontrado com sua busca ({search})!</h1>);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const submitSearch = (e) => {
        e.preventDefault();
        proccessSearch(e.target[0].value)
    }

    return (
        <>
            <div className="block md:flex">
                <div className="w-full">
                    <form onSubmit={submitSearch}>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </div>
                            <input onChange={(e) => setSearch(e.target.value)} name="search" type="search" id="default-search" className="block w-full p-4 pl-10 text-sm rounded-lg bg-stone-800 placeholder-gray-400 text-gray-100 focus:ring-0 outline-none" placeholder="Livros, Temas, Autores, etc..."></input>
                            <button type="submit" className="transition-all text-white absolute right-2.5 bottom-2 bg-stone-900 hover:bg-stone-700 focus:ring-0 outline-none font-medium rounded-lg text-sm px-5 py-2">Buscar</button>
                        </div>
                    </form>
                </div>


                <div className="pt-4 md:pt-0 md:pl-4">
                    <a href="registrar-livro" className="transition-all text-gray-100 bg-stone-800 focus:ring-0 outline-none font-medium rounded-lg text-sm px-5 py-3.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        <span className="whitespace-nowrap">Registrar livro</span>
                    </a>
                </div>

            </div>
            <div className="mt-4">
                {items}
            </div>
        </>
    )

}

export default Data;