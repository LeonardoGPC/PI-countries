import React from "react";
import { Link, Outlet } from "react-router-dom";
import lp from "../img/LP.png";
import SearchBar from "./searchBar";
import n from "./nav.module.css";

export default function Nav({setSrch}){

    const reload = () => {
        if(window.location.pathname == '/home'){
            window.location.reload(false)
        }
    }

    return(
        <div>
        <div className={n.main}>
            <div className={n.div_title}>
                <img src={lp} className={n.img}/>
                <Link to="/" className={n.title}>Countries Of The World</Link>
            </div>
            <div>
                <SearchBar setSrch={setSrch}/>
            </div>
            <ul className={n.list}>
                <Link to="/home" className={n.link} onClick={() => reload()}>Inicio</Link>
                <Link to="activity" className={n.link}>Crear Actividad</Link>
                <Link to="about" className={n.link}>Acerca De</Link>
            </ul>
        </div>
            <Outlet/>
        </div>
    )
}