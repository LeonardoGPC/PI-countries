import React from "react";
import { useSelector } from "react-redux";
import Card from "./card";
import c from "./cards.module.css";
import Paginado from "../Home/paginado";

export default function Cards(){

    const data = useSelector((state) => state.datos);
    const pag = useSelector((state) => state.pag);
    const paginado = useSelector((state) => state.perPage);

    const index1 = (paginado * (pag - 1)) - (pag - (pag - 1));
    const index2 = paginado + index1;

    const countriesRender = pag == 1 ? data.slice(0, 9) : data.slice(index1, index2)

    const max = (data.length / 10) + 1; 

    return(
        <div>
            <div className={c.cards}>
                {countriesRender ? countriesRender.map(e => 
                <Card
                name={e.name}
                img={e.img}
                continent={e.continent}
                ky={e.ky}
                key={e.id}
                />) : <h1>Cargando...</h1>}
            </div>
            <Paginado max={max} pagina={pag} />
        </div>
    )
}