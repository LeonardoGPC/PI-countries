import React from "react";
import { Link } from "react-router-dom";
import cds from "./card.module.css";

export default function Card({name, img, continent, ky, setDtls, dtls}){

    return(
        <div>
            <Link to={`details?id=${ky}`} className={cds.main} onClick={e => setDtls(!dtls)}>
                <img src={img} className={cds.img}/>
                <div className={cds.text}>
                    <h3 className={cds.name}>{name}</h3>
                    <p className={cds.paragraph}>{continent}</p>
                </div>
            </Link>
        </div>
    )
}