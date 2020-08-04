import React, { useState, useEffect } from 'react'
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
    const valoresIniciais = {
        nome: '',
        descricao: '',
        cor: '',
    }

    const [categorias, setCategorias] = useState([]);
    const [values, setValues] = useState(valoresIniciais);

    function setValue(key, value) {
        setValues({
            ...values,
            [key]: value
        });
    }

    function handleChange(info) {
        setValue(
            info.target.getAttribute('name'),
            info.target.value
        );
    }

    useEffect(() => {
        console.log('Teste effect');
        const URL = window.location.hostname.includes('localhost')
        ? 'http://localhost:8080/categorias'
        : 'https://bobby-flix.herokuapp.com/categorias';

        fetch(URL)
        .then(async(response) => {
            const resposta = await response.json();
            setCategorias([
                ...resposta,
            ]);
        });

        // setTimeout(() => {
        //     setCategorias([
        //         ...categorias,
        //         {
        //             id: 1,
        //             nome: 'Front End',
        //             descricao: 'Categoria',
        //             cor: '#cbd1ff'
        //         },
        //         {
        //             id: 2,
        //             nome: 'Back End',
        //             descricao: 'Categoria 2',
        //             cor: '#cbd1ff'
        //         }
        //     ]);
        // }, 4 * 1000);
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de Categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(info) {
                info.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);

                setValues(valoresIniciais)
            }}>
                <FormField
                    label="Categoria"
                    type="text"
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                />

                <FormField
                    label="Descrição"
                    type="textarea"
                    name="descricao"
                    value={values.descricao}
                    onChange={handleChange}
                />

                <FormField
                    label="Cor"
                    type="color"
                    name="cor"
                    value={values.cor}
                    onChange={handleChange}
                />

                <Button>
                    Cadastrar
                </Button>
            </form>

            {categorias.length === 0 && (<div>
                Loading...
            </div>)}

            <ul>
                {categorias.map((categoria) => {
                    return (
                        <li key={`${categoria.nome}`}>
                            {categoria.nome}
                        </li>
                    );
                })}
            </ul>

            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    );
}

export default CadastroCategoria;