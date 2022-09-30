import { React, useEffect, useState } from "react";
import dtl from "./details.module.css";
import { Link } from "react-router-dom";
import DtlActivity from "./dtlActivity";

export default function Details(dtls){

    const [pais, setPais] = useState();
    const [activity, setActivity] = useState();
    const [id, setId] = useState();

    console.log(pais)

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
                <div>
                    <Link to='/home'>X</Link>
                    <img src={pais.img}/>
                    <h1>{pais.name}</h1>
                    <h2>ID del país: {pais.ky}</h2>
                    <h3>La capital es {pais.capital}</h3>
                    <p>Su continente es {pais.continent}</p>
                    <p>Subregion: {pais.subregion}</p>
                    <p>Tiene {pais.poblation} habitantes.</p>
                    <p>Y su area es de {pais.area}km</p>
                </div>
            <h2>Actividades turisticas: </h2>
            {pais.activities.length > 0 ? pais.activities.map(e => <DtlActivity
            name={e.name}
            difficult={e.difficult}
            duration={e.duration}
            season={e.season}
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