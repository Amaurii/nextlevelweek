import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft, FiLogIn } from 'react-icons/fi';

const CreatePoints = () => {
    return (
            <div id="page-create-point">
                    <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                <FiArrowLeft />
                Voltar para home
                </Link>
            </header>

               <form>
                <h1>Cadastro do <br /> ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                    </legend>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                    </legend>
                </fieldset>
               </form>
       </div>
    );
}
export default CreatePoints;

