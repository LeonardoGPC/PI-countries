import React from "react";
import { Link } from "react-router-dom";
import bg from "../img/map.jpg";
import l from "./landing.module.css"

export default function Landing(){
    return(
        <div className={l.main}>
            <div className={l.div_img}>
                <img src={bg} className={l.img}/>
            </div>
            <div className={l.div_text}>
                <h1 className={l.title}>Countries Of The World</h1>
                <Link to={'/home'} className={l.button}>Entrar</Link>
            </div>
            <p className={l.codeBy}>CodeBy: <span className={l.name}>Vyncii</span></p>
        </div>
    )
}