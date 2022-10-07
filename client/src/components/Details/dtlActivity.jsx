import React from "react";

export default function DtlActivity({name, difficult, duration, season}){
    return(
        <div>
            <h3>{name}</h3>
            <p>Dificultad: {difficult === 1 ? 'Muy fácil' : difficult === 2 ? 'Fácil' : difficult === 3 ? 'Medio' : difficult === 4 ? 'Difícil' : 'Extremo'}</p>
            <p>Duración: {duration}</p>
            <p>Temporada: {season}</p>
        </div>
    )
}