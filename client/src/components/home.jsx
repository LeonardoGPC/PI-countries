import { React, useState, useEffect } from "react";
import h from "./home.module.css";
import Cards from "./cards";
import Filter from "./filter";
import Order from "./order";
import { Outlet } from "react-router-dom";

export default function Home({srch, setDtls, dtls}){

    const [data, setData] = useState();
    const [find, setFind] = useState([]);
    
    useEffect(async () => {
        await fetch('http://localhost:3001/countries')
        .then(res => res.json())
        .then(countries => {setData(oldCountries => countries)})
        .catch(e => console.log(e))
    }, [])

    useEffect(()=>{
        if(data && srch.length != 0){
        var resultadoDB = data.filter(e => {if(e.name.toString().toLowerCase().includes(srch.toString().toLowerCase())){
            return e;
        }})
        setFind(resultadoDB);
        } else {
            setFind([])
        }
    }, [srch])

    if(srch == false || srch.length == 0){
    return(
        <div className={h.padre1}>
            <div className={h.padre2}>
                <div className={h.filter}>
                    <Filter/>
                    <Order/>
                </div>
                <div className={h.cards}>
                    <Cards data={data} find={find} setDtls={setDtls} dtls={dtls}/>
                </div>
            </div>
            <Outlet/>
        </div>
    )} else if(find.length > 0){
        return(
            <div className={h.padre1}>
                <div className={h.padre2}>
                    <div className={h.cards}>
                        <Cards data={data} find={find} setDtls={setDtls} dtls={dtls}/>
                    </div>
                </div>
                <Outlet/>
            </div>
        )
    } else {
        return(
            <div className={h.err}>
                <h1>No se encontraron paises</h1>
                <Outlet/>
            </div>
        )
    }
}