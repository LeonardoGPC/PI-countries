import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./card";
import c from "./cards.module.css";
import Paginado from "./paginado";

export default function Cards({data, find, setDtls, dtls}){

    useEffect(() => {
        if(data){
        setPag1([data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]]);
        setPags(data.slice(9, data.length));
        }
    }, [data])

    const [pag1, setPag1] = useState([])
    const [pags, setPags] = useState([]);

    const [pagina, setPagina] = useState(0);
    const [paginado, setPaginado] = useState(10);

    const max = pags.length / paginado;

    if(find.length === 0){
        if(data){
            if(pagina === 0){
                return(
                    <div>
                        <div className={c.cards}>
                        {pag1.map(d => <Card
                        name={d.name}
                        img={d.img}
                        continent={d.continent}
                        ky={d.ky}
                        setDtls={setDtls}
                        dtls={dtls}
                        />)}
                        </div>
                        <Paginado max={max} pagina={pagina} setPagina={setPagina} />
                    </div>
            )}else{
                return(
                    <div>
                        <div className={c.cards}>
                        {pags.slice(
                            (pagina - 1) * paginado,
                            (pagina - 1) * paginado + paginado
                        ).map(d => <Card
                        name={d.name}
                        img={d.img}
                        continent={d.continent}
                        ky={d.ky}
                        setDtls={setDtls}
                        dtls={dtls}
                        />)}
                        </div>
                        <Paginado max={max} pagina={pagina} setPagina={setPagina} />
                    </div>
            )}} else {
            return(
                <div>
                    No hay paises
                </div>
            )
        }
    } else {
        return(
            <div>
                <div className={c.cards}>
                    {find.map(f => <Card name={f.name} img={f.img} continent={f.continent} ky={f.ky} setDtls={setDtls} dtls={dtls}/>)}
                </div>
            </div>
        )
    }
}