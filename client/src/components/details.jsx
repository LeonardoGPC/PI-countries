import { React, useEffect, useState } from "react";
import dtl from "./details.module.css";
import { Link } from "react-router-dom";
import DtlActivity from "./dtlActivity";
import { useSelector } from "react-redux";
import close_img from '../img/close.svg';

export default function Details(){

    const dtls = useSelector((state) => state.dtls)

    const [pais, setPais] = useState();
    const [id, setId] = useState();

    useEffect(()=> {
        let key = document.location.href;
        key = key.toString().split('?');
        key = key[1].split('=');
        key.shift();
        setId(key);
    }, [dtls]);

    useEffect(async ()=>{
        if(id){
            await fetch(`http://localhost:3001/cxa/${id}`)
            .then(res => res.json())
            .then(respuesta => setPais(respuesta))
        }
    }, [id]);

    if(pais){
    return(
        <div>
            <div className={dtl.main}>
                <div className={dtl.main2}>
                    <Link to='/home/countries' className={dtl.close}><img src={close_img} className={"close_img"}/></Link>
                    <img src={pais.img} alt='Country_Flag'/>
                    {pais.name.length > 22 ? <h1>{pais.name.split(' ')[0]} {(pais.name.split(' ')[1].includes(',')) ? pais.name.split(' ')[1].split(',')[0] : pais.name.split(' ')[1]}</h1> : <h1>{pais.name}</h1>}
                    <h2>ID del país: {pais.ky}</h2>
                    <h3>La capital es {pais.capital}</h3>
                    <p>Su continente es {pais.continent}</p>
                    <p>Subregion: {pais.subregion}</p>
                    <p>Tiene {pais.population} habitantes.</p>
                    <p>Y su area es de {pais.area}km</p>
                </div>
            <h2>Actividades turisticas: </h2>
            {pais.activities.length > 0 ? pais.activities.map(e => <DtlActivity
            name={e.name}
            difficult={e.difficult}
            duration={e.duration}
            season={e.season}
            key={e.id}
            />) : <h4>No hay actividades</h4>}
            </div>
        </div>
    )
    } else {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}