import React from "react";
import { Link } from "react-router-dom";
import lp from "../img/LP.png";
import SearchBar from "./searchBar";
import n from "./nav.module.css";

export default function Nav(){

    const reload = () => {
        if(window.location.pathname == '/home/countries'){
            window.location.reload(false)
        }
    }

    return(
        <div>
            <div className={n.main}>
                <div className={n.div_title}>
                    <img src={lp} className={n.img} alt='Logo'/>
                    <Link to="/" className={n.title}>Countries Of The World</Link>
                </div>
                <div>
                    <SearchBar/>
                </div>
                <ul className={n.list}>
                    <Link to="/home/countries" className={n.link} onClick={() => reload()}>Inicio</Link>
                    <Link to="/home/activity" className={n.link}>Crear Actividad</Link>
                    <Link to="/home/about" className={n.link}>Acerca De</Link>
                </ul>
            </div>
        </div>
    )
}