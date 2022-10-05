import React, { useState, useEffect } from "react";
import act from "./activity.module.css";
import { useDispatch, useSelector } from 'react-redux';
import ActivityCard from './activityCard.jsx';
import { getData, getCounts, search, dltActivitie, createActivity, dltCrtAct } from '../redux/actions';
import img_close from '../img/close.svg';
import left_arrow from '../img/left_arrow.svg';

export default function Activity(){

    // const [input, setInput] = useState({
    //     name: '',
    //     difficult: '',
    //     duration: '',
    //     season: '',
    //     countries: ''
    // })

    // const onChange = e => {
    //     setInput({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     })
    //     console.log(input);
    // }

    // const onSubmit = async (e) => {
    //     console.log(input)
    //     console.log(JSON.stringify(input))
    //     e.preventDefault();
    //     await fetch("http://localhost:3001/activities", {
    //         method: 'POST',
    //         body: JSON.stringify(input),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }).then(res => res.json())
    //     .then(respuesta => console.log(respuesta))
    // }

    const dispatch = useDispatch();
    const data = useSelector((state) => state.datos)
    const countries = useSelector((state) => state.counts)
    const cxa_id = useSelector((state) => state.cxa_id)
    const error_srch = useSelector((state) => state.error)
    const crt_act = useSelector((state) => state.crt_act)

    // const pag = useSelector((state) => state.pag);

    // const index1 = (pag * 12) - 12;
    // const index2 = 12 + index1;

    // const countriesRender = data.slice(index1, index2)

    // const max = (data.length / 12) + 2;

    useEffect( () => {
        dispatch(getCounts());
        dispatch(getData());
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
                // console.log(error.durationErr)
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

    const [button, setButton] = useState(true);
    const [btnStyle, setBtnStyle] = useState({border: '2px solid rgb(50, 50, 50)', cursor: 'default'})

    useEffect(() => {
        // console.log(error.nameErr.length)
        // console.log(error.durationErr.length)
        // console.log(error.paisesErr.length )
        if(error.nameErr.length === 0 && error.durationErr.length === 0 && name.length > 0 && duracion.value !== 0 && cxa_id.length > 0){
            setBtnStyle({border: '2px solid rgb(195, 0, 255)', cursor: 'pointer'})
            setButton(false)
        } else {
            setBtnStyle({border: '2px solid rgb(50, 50, 50)', cursor: 'default'})
            setButton(true)
        }
    }, [error])

    const onSubmit = e => {
        e.preventDefault()
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
            alert(`${crt_act.name} en ${crt_act.season} se creó correctamente`)
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
                    {/* {length > 22 ? countries.find(f => f.id === e).name.split(' ')[0] (countries.find(f => f.id === e).name.split(' ')[1].includes(',')) ? countries.find(f => f.id === e).name.split(' ')[1].split(',')[0] : countries.find(f => f.id === e).name.split(' ')[1] : countries.find(f => f.id === e).name} */}
                    </div>
                    <input type="submit" className={act.inp} disabled={button} style={btnStyle}/>
                </form>
                </div>
                {paises && <div className={"activity_cards"}>
                    <div className={act.father}>
                        <div className={act.cards_title_btn}>
                            <h1 className={act.cards_title}>Selecciona los paises</h1>
                            <img src={img_close} className={act.cards_img} onClick={close} alt='Close'/>
                        </div>
                    <div className={act.cards}>
                    {error_srch ? <h1>{error_srch}</h1> : data ? data.map(p => 
                        <div key={p.id}>
                            <ActivityCard
                            name={p.name}
                            img={p.img}
                            id={p.id}
                            key={p.ky}
                            />
                        </div>) : <h1>Cargando...</h1>}
                        </div>
                        {/* <Paginado max={max} pagina={pag}/> */}
                        <div className={act.up_div} onClick={upFunction}>
                            <img className={act.up} src={left_arrow} alt='Up_Arrow'/>
                            <p className={act.up_txt}>Ir arriba</p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}