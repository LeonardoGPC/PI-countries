import React from "react";
import ld from './loading.module.css';

export default function Loader(){
    return(
        <div>
            <span className={ld.loader}></span>
        </div>
    )
}