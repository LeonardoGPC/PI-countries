import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pagSwitch, resetPag, setPagInput } from "../../redux/actions";
import lfarr from "../../img/left_arrow.svg";
import rgarr from "../../img/rigth_arrow.svg";
import pag from "./paginado.module.css";

export default function Paginado({max}){

    const dispatch = useDispatch();
    const pagina = useSelector((state) => state.pag);
    const input = useSelector((state) => state.pagInput);

    // const [input, setInput] = useState(pagina)

    useEffect(() => {
        dispatch(resetPag(1))
        // setInput(pagina)
    }, [dispatch])

    max = Math.ceil(max)

    const movePagI = ()=>{
        if(pagina !== 1){
            // setInput(parseInt(input) - 1)
            dispatch(pagSwitch(pagina - 1));
            dispatch(setPagInput(parseInt(input) - 1));
        }
    }

    const movePagD = ()=>{
        if(pagina !== max){
            // setInput(parseInt(input) + 1)
            dispatch(pagSwitch(pagina + 1));
            dispatch(setPagInput(parseInt(input) + 1));
        }
    }

    const onKeyDown = e => {
        if(e.keyCode == 13){
            if(
                parseInt(e.target.value) < 1 ||
                parseInt(e.target.value) > max ||
                isNaN(parseInt(e.target.value))
            ){
                alert(`${e.target.value} No es un número entre 1 y ${max}`)
            } else {
                dispatch(pagSwitch(parseInt(e.target.value)));
            }
        }
    }

    const onChange = e => {
        dispatch(setPagInput(e.target.value));
    }

    return(
        <div className={pag.main}>
            <button className={pag.btn} onClick={movePagI}><img src={lfarr} className={pag.img} alt='Left_Arrow'/></button>
            <input onChange={e => onChange(e)} onKeyDown={e => onKeyDown(e)} name="page" autoComplete="off" value={input} className={pag.input} />
            <p className={pag.paragraph} >De {max}</p>
            <button className={pag.btn} onClick={movePagD}><img src={rgarr} className={pag.img} alt='Left_Arrow'/></button>
        </div>
    )
}