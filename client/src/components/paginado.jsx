import { React, useState } from "react";
import lfarr from "../img/left_arrow.svg";
import rgarr from "../img/rigth_arrow.svg";
import pag from "./paginado.module.css";

export default function Paginado({max, pagina, setPagina}){

    const [input, setInput] = useState(1)

    max = Math.floor(max + 1)

    const movePagI = ()=>{
        if(pagina === 0){
            alert("Estas en la primer página")
        } else {
            setInput(parseInt(input) - 1)
            setPagina(pagina - 1);
        }
    }

    const movePagD = ()=>{
        if(pagina === max){
            alert("Estas en la ultima página")
        } else {
            setInput(parseInt(input) + 1)
            setPagina(pagina + 1);
        }
    }

    const onKeyDown = e => {
        if(e.keyCode == 13){
            if(
                parseInt(e.target.value) < 1 ||
                parseInt(e.target.value) > max + 1 ||
                isNaN(parseInt(e.target.value))
            ){
                alert(`${e.target.value} No es un número entre 1 y ${max + 1}`)
            } else {
                setPagina(parseInt(e.target.value) - 1);
            }
        }
    }

    const onChange = e => {
        setInput(e.target.value)
    }

    return(
        <div className={pag.main}>
            <button className={pag.btn} onClick={movePagI}><img src={lfarr}/></button>
            <input onChange={e => onChange(e)} onKeyDown={e => onKeyDown(e)} name="page" autoComplete="off" value={input}/>
            <p>De {max + 1}</p>
            <button className={pag.btn} onClick={movePagD}><img src={rgarr}/></button>
        </div>
    )
}