import React from "react";
import { Link } from "react-router-dom";
import bg from "../../img/map.jpg";
import l from "./landing.module.css";
import { Vyncii } from "../vyncii_assci";
import top_arrow from '../../img/top_arrow.svg';

export default function Landing(){

    return(
        <div className={l.main}>
            <img src={bg} className={l.img} alt='Background'/>
            <div className={l.div_img}>
                <div className={l.div_text}>
                    <Link to={'/home/countries'} className={l.container}>
                        <div className={l.title}>
                            <h1>Countries Of The World
                                <div className={l.title_highlight}></div>
                            </h1>
                            <div className={l.title_underline}></div>
                            <div aria-hidden className={l.title_filled}>Countries Of The World</div>
                        </div>
                    </Link>
                    <div className={l.click}>
                        <img className={l.arrow} src={top_arrow} alt='Top_Arrow'/>
                        <p>Click Here</p>
                    </div>
                </div>
                <p className={l.codeBy}>CodeBy: <span className={l.name} onClick={Vyncii}>Vyncii</span></p>
            </div>
        </div>
    )
}