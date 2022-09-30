import { React, useState } from "react";

export default function SearchBar({setSrch}){

    const [pais, setPais] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        setSrch(pais)
    }

    const onChange = (e) => {
        setSrch(e.target.value);
        setPais(e.target.value);
    }

    return(
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <input type="text" placeholder="País..." name="searchBar" onChange={e => onChange(e)} autoComplete="off"/>
                <input type="submit" name="button" value="Buscar"/>
            </form>
        </div>
    )
}