import React, { useState } from "react";
import act from "./activity.module.css";

export default function Activity(){

    const [input, setInput] = useState({
        name: '',
        difficult: '',
        duration: '',
        season: '',
        countries: ''
    })

    const onChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input);
    }

    const onSubmit = async (e) => {
        console.log(input)
        console.log(JSON.stringify(input))
        e.preventDefault();
        await fetch("http://localhost:3001/activities", {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(respuesta => console.log(respuesta))
    }

    return(
        <div className={act.main}>
            <h1 className={act.title}>Crea una actividad</h1>
            <form className={act.form} onSubmit={e => onSubmit(e)}>
                <input type="text" className={act.inp} placeholder="Nombre" value={input.name} name='name' onChange={e => onChange(e)}/>
                <input type="number" className={act.inp} placeholder="Dificultad (1-5)" value={input.difficult} name='difficult' onChange={e => onChange(e)}/>
                <input type="text" className={act.inp} placeholder="Duración" value={input.duration} name='duration' onChange={e => onChange(e)}/>
                <input type="text" className={act.inp} placeholder="Temporada" value={input.season} name='season' onChange={e => onChange(e)}/>
                <input type="text" className={act.inp} placeholder="Paises (id)" value={input.countries} name='countries' onChange={e => onChange(e)}/>
                <input type="submit" className={act.inp}/>
            </form>
        </div>
    )
}