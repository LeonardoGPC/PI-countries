import React, { useState, useEffect } from "react";
import act from "./activity.module.css";
import { useDispatch, useSelector } from 'react-redux';
import ActivityCard from './activityCard.jsx';
import { getData, getCounts, search, dltActivitie, createActivity, dltCrtAct, getAct } from '../../redux/actions';
import img_close from '../../img/close.svg';
import left_arrow from '../../img/left_arrow.svg';
import Paginado from '../Home/paginado'

export default function Activity(){

    const dispatch = useDispatch();
    const data = useSelector((state) => state.datos)
    const countries = useSelector((state) => state.counts)
    const cxa_id = useSelector((state) => state.cxa_id)
    const error_srch = useSelector((state) => state.error)
    const crt_act = useSelector((state) => state.crt_act)
    const acts = useSelector((state) => state.act)

    const pag = useSelector((state) => state.pag);

    const index1 = (pag * 25) - 25;
    const index2 = 25 + index1;

    const countriesRender = data.slice(index1, index2)

    const max = (data.length / 25);

    useEffect( () => {
        dispatch(getCounts());
        dispatch(getData());
        dispatch(getAct());
    }, [dispatch])

    useEffect(async () => {
        dispatch(dltActivitie())
    }, [])

    const [error, setError] = useState({
        nameErr: '',
        durationErr: '',
        paisesErr: ''
    })

    const [name, setName] = useState('');

    const nameTest = e => {
        setName(e.target.value);
    }

    useEffect(() => {

        setError({
            ...error,
            nameErr: ['Campo', 'Obligatorio']
        })
        if(!/^([^0-9]*)$/.test(name)){
            setError({
                ...error,
                nameErr: ['⚠️ El nombre no puede', 'contener números ⚠️']
            })
        } else if(name.length === 0){
            setError({
                ...error,
                nameErr: ['Campo', 'Obligatorio']
            })
        } else if(acts.find(e => e.name.toLowerCase() === name.toLowerCase())){
            setError({
                ...error,
                nameErr: ['Lo sentimos 😢, ya existe', 'una actividada con ese nombre']
            })
        } else {
            setError({
                ...error,
                nameErr: ''
            })
        }
    }, [name])

    const [duracion, setDuracion] = useState({
        time: 'H',
        value: 0,
    });

    const timeHandler = e => {
        setDuracion({
            ...duracion,
            time: e.target.value
        })
    }

    const timeTest = e => {
        setDuracion({
            ...duracion,
            value: e.target.value
        })
    }

    useEffect(() => {
        setError({
            ...error,
            durationErr: ['Campo', 'Obligatorio']
        })
        if(duracion.time == 'H'){
            if(duracion.value < 0){
                setError({
                    ...error,
                    durationErr: ['⚠️ No puedes poner','números negativos ⚠️']
                })
            } else if(duracion.value.length === 0){
                setError({
                    ...error,
                    durationErr: ['Campo', 'Obligatorio']
                })
            } else {
                setError({
                    ...error,
                    durationErr: ''
                })
            }
        } else {
            if(duracion.value < 0){
                setError({
                    ...error,
                    durationErr: ['⚠️ No puedes poner','números negativos ⚠️']
                })
            } else if(duracion.value > 59){
                setError({
                    ...error,
                    durationErr: ['⚠️ Si dura más de 1 hora', 'puedes cambiar a Horas ⚠️']
                })
            } else {
                setError({
                    ...error,
                    durationErr: ''
                })
            }
        }
    }, [duracion])

    const [paises, setPaises] = useState(false);

    const paisesHandler = () => {
        setPaises(true)
    }

    const paisesTyping = e => {
        dispatch(search(e.target.value))
    }

    const close = () => {
        setPaises(false)
    }

    useEffect(() => {
        if(paises){
        if(cxa_id.length > 0){
            setError({
                ...error,
                paisesErr: ''
            })
        } else {
            setError({
                ...error,
                paisesErr: ['Campo', 'Obligatorio']
            })
        }
        }
    }, [cxa_id])

    const [button, setButton] = useState({is: true, value: ''});
    const [btnStyle, setBtnStyle] = useState({border: '3px solid rgb(50, 50, 50)', cursor: 'default'})

    useEffect(() => {
        if(error.nameErr.length === 0 && error.durationErr.length === 0 && name.length > 0 && duracion.value !== 0 && cxa_id.length > 0){
            setBtnStyle({border: '3px solid rgb(255, 255, 255)', cursor: 'pointer', width: '150px'})
            setButton({is: false, value: 'Crear 🛠️'})
        } else {
            setBtnStyle({border: '3px solid rgb(50, 50, 50)', cursor: 'default'})
            setButton({is: true, value: ''})
        }
    }, [error])

    const onSubmit = e => {
        alert(`${name} en ${e.target.season.value} se creó correctamente`)
        dispatch(createActivity({
            name: name,
            difficult: Number(e.target.difficult.value),
            duration: duracion.time === 'H' ? duracion.value == 1 ? `${duracion.value} hora` : `${duracion.value} horas` : duracion.value == 1 ? `${duracion.value} minuto` : `${duracion.value} minutos`,
            season: e.target.season.value,
            countries: cxa_id
        }))
    }

    useEffect(() => {
        if(Object.entries(crt_act).length > 0){
            dispatch(dltCrtAct())
        }
    }, [crt_act])

    const upFunction = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return(
        <div className={act.main}>
            <div className='activity_divide'>
                <div className={act.padre1}>
                    <h1 className={act.title}>Crea una actividad</h1>
                <form className={act.form} onSubmit={e => onSubmit(e)}>
                    <div className={act.div_inp}>
                        <label className={act.label_nombre}>Nombre: </label>
                            <input type="text" className={act.inp_name} placeholder="Surf..." value={name} name='name' onChange={e => nameTest(e)} autoComplete='off'/>
                            {error.nameErr && <div className={act.name_error3}>
                                <h7 className={act.name_error2}>{error.nameErr[0]}</h7>
                                <h7 className={act.name_error2}>{error.nameErr[1]}</h7>
                                </div>}
                    </div>
                    <div className={act.div_inp}>
                        <label className={act.label_nombre}>Dificultad: </label>
                            <select defaultValue='1' className={act.select_difficult} name='difficult'>
                                <option value='1'>Muy fácil</option>
                                <option value='2'>fácil</option>
                                <option value='3'>Medio</option>
                                <option value='4'>Difícil</option>
                                <option value='5'>Extremo</option>
                            </select>
                    </div>
                    <div className={act.div_inp}>
                        <label className={act.label_nombre}>Duración: </label>
                            <select className={act.select_time} defaultValue='H' onChange={e => timeHandler(e)}>
                                <option value='H'>Horas: </option>
                                <option value='M'>Minutos: </option>
                            </select>
                            <input type="number" className={act.inp_time} placeholder="1..." name='duration' autoComplete='off' onChange={e => timeTest(e)}/>
                            {error.durationErr && <div className={act.name_error}>
                                <h7 className={act.name_error2}>{error.durationErr[0]}</h7>
                                <h7 className={act.name_error2}>{error.durationErr[1]}</h7>
                                </div>}
                    </div>
                    <div className={act.div_inp}>
                        <label className={act.label_nombre}>Temporada: </label>
                            <select className={act.select_season} defaultValue='primavera' name="season">
                                <option value='primavera'>Primavera</option>
                                <option value='verano'>Verano</option>
                                <option value='otoño'>Otoño</option>
                                <option value='invierno'>Invierno</option>
                            </select>
                    </div>
                    <div className={act.div_inp}>
                        <label className={act.label_nombre}>Paises: </label>
                            <input type="text" className={act.inp_name} placeholder="Mexico..." name='countries' autoComplete='off' onClick={paisesHandler} onChange={e => paisesTyping(e)}/>
                            {error.paisesErr && <div className={act.name_error4}>
                                <h7 className={act.name_error2}>{error.paisesErr[0]}</h7>
                                <h7 className={act.name_error2}>{error.paisesErr[1]}</h7>
                                </div>}
                    </div>
                    <div className={act.div_name_country}>
                    {cxa_id && cxa_id.map(e => <p className={act.country_name} >{countries ? countries.find(f => f.id === e).name : 'Cargando...'}</p>)}
                    </div>
                    <input type="submit" className={act.inp} disabled={button.is} style={btnStyle} value={button.value}/>
                </form>
                </div>
                {paises && <div className={"activity_cards"}>
                    <div className={act.father}>
                        <div className={act.cards_title_btn}>
                            <h1 className={act.cards_title}>Selecciona los paises</h1>
                            <img src={img_close} className={act.cards_img} onClick={close} alt='Close'/>
                        </div>
                    {error_srch ? <h1 className={act.error_srch}>{error_srch[0]}<br/>{error_srch[1]}</h1> : data ? <div className={act.cards}>
                        {countriesRender.map(p => 
                        <div key={p.id}>
                            <ActivityCard
                            name={p.name}
                            img={p.img}
                            id={p.id}
                            key={p.ky}
                            />
                        </div>)}
                        </div> : <h1>Cargando...</h1>}
                        <div className={act.paginado}>
                            <Paginado max={max} pagina={pag}/>
                        </div>
                        {/* <div className={act.up_div} onClick={upFunction}>
                            <img className={act.up} src={left_arrow} alt='Up_Arrow'/>
                            <p className={act.up_txt}>Ir arriba</p>
                        </div> */}
                    </div>
                </div>}
            </div>
        </div>
    )
}