import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewDetails } from "../redux/actions";
import { Link } from "react-router-dom";
import cds from "./card.module.css";

export default function Card({name, img, continent, ky}){

    const dispatch = useDispatch();
    const dtls = useSelector((state) => state.dtls)

    const scrolling = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        dispatch(viewDetails(!dtls))
    }

    return(
        <div>
            <Link to={`/home/countries/details?id=${ky}`} className={cds.main} onClick={scrolling}>
                <img src={img} className={cds.img} alt='Country_Flag'/>
                <div className={cds.text}>
                    <h3 className={cds.name}>{name}</h3>
                    <p className={cds.paragraph}>{continent}</p>
                </div>
            </Link>
        </div>
    )
}