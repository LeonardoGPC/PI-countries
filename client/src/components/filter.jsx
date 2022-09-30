import React from "react";
import f from "./filter.module.css";

export default function Filter(){
    return(
        <div className={f.filter}>
            <label for='filtro'>Filtro: </label>
            <select>
                <option value='Sin filtro'>Sin filtro</option>
                <option value='Continentes'>Continentes</option>
                <option value='Actividades'>Actividades</option>
            </select>
        </div>
    )
}