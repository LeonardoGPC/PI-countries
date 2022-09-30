import React from "react";

export default function DtlActivity({name, difficult, duration, season}){
    return(
        <div>
            <h3>{name}</h3>
            <p>Dificultad: {difficult}</p>
            <p>Duración: {duration}</p>
            <p>Temporada: {season}</p>
        </div>
    )
}