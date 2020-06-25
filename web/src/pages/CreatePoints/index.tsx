import React, {useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft} from 'react-icons/fi';
import {Map, TileLayer, Marker }  from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface MunicipiosResponse{
    nome: string;
}

interface IBGEUFResponse{
    sigla: string;
}

const CreatePoints = () => {
    const [items, setItems] = useState<Item[]> ([]);
    const [ufs, setUfs] = useState<string[]> ([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectUfs] = useState('0');
    const [selectedCity, setSelectCity] = useState('0');
    const [selectedPosition, setSelectPosition] = useState<[number, number]>([0,0])
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0])

    //Array ou Objeto precisamos manulamente informar o tipo da varivel armazenada no objeto.

    // [] vazio ! A função vai ser executada uma unica vez, assim que o componete for 
    //exibido em tela !
    useEffect(() => {
        api.get('items').then(response =>{
        setItems(response.data);
        })
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
        const ufInitials = response.data.map(uf => uf.sigla);
        setUfs(ufInitials);
        })
    }, []);

    useEffect(()=>{
        axios.get<MunicipiosResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response =>{
        const municipiosInitials = response.data.map(nome => nome.nome);
        setCities(municipiosInitials);
        });
    }, [selectedUf]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, [])
    function halnderSelectUfs(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value ;
        setSelectUfs(uf);
    }
    
    function halndleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value ;
        setSelectCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent){
        setSelectPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        console.log(event.target)
    }

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
                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input 
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="whatsap">Whatsap</label>
                        <input 
                        type="text"
                        name="whatsap"
                        id="whatsap"
                        onChange={handleInputChange}
                        />
                    </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                    
                   <Map center={[-2.5601377,-44.2471775]} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <Marker position={selectedPosition} />
                   </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={halnderSelectUfs}>
                                <option value="0">Selecione um UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                            name="city" 
                            id="city"
                            value={selectedCity}
                            onChange={halndleSelectCity}
                            >
                                <option value="0">Selecione uma Cidade</option>
                               {cities.map(cities => (
                                    <option key={cities} value={cities}>{cities}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item =>(
                            <li key={item.id}>
                            <img src={item.image_url} alt={item.title}/>
                            <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
               </form>
       </div>
    );
}
export default CreatePoints;