import React from "react";
import f from "./filter.module.css";
import { orderBy, filterContinent, filterActivitie } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Filter(){

    const act = useSelector((state) => state.act)
    const dispatch = useDispatch();

    const onContinents = e => {
        dispatch(filterContinent(e.target.value))
    }

    const onActivities = e => {
        dispatch(filterActivitie(e.target.value))
    }

    const onOrder = e => {
        dispatch(orderBy(e.target.value))
    }

    return(
        <div className={f.filter}>

            <select defaultValue={'default'} onChange={e => onContinents(e)} className={f.select}>
                <option value='default' disabled>Filtrar Continentes</option>
                <option value='All'>Todos</option>
                <optgroup label="Continentes:">
                    <option value='Africa'>Africa</option>
                    <option value='North America'>America del norte</option>
                    <option value='South America'>America del sur</option>
                    <option value='Antarctica'>Antartica</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europa</option>
                    <option value='Oceania'>Oceania</option>
                </optgroup>
            </select>

            {act.length > 0 ? 
             <select defaultValue='default' onChange={e => onActivities(e)} className={f.select}>
                <option value='default' disabled>Filtrar actividades</option>
                <option value='All'>Todas</option>
                <optgroup label="Actividades:">
                    {act.map(e => 
                        <option key={e.id} value={e.name}>
                            {e.name}
                        </option>
                    )}
                </optgroup>
             </select>
            : <select defaultValue='default' disabled className={f.select}><option value='default'>No hay actividades</option></select>
            }

            <select defaultValue={'default'} onChange={e => onOrder(e)} className={f.select}>
                <option value='default' disabled>Ordenar por</option>
                <optgroup label="Alfabeto">
                    <option value='["name", "asc"]'>{`A a la Z`}</option>
                    <option value='["name", "des"]'>{`Z a la A`}</option>
                </optgroup>
                <optgroup label="Población">
                <option value='["population", "des"]'>{`+ Población`}</option>
                <option value='["population", "asc"]'>{`- Población`}</option>
                </optgroup>
            </select>

        </div>
    )
}