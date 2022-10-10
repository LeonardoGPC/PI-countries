import { React, useEffect } from "react";
import h from "./home.module.css";
import Cards from "../Countries_Cards/cards";
import Filter from "../Filtros/filter";
import { getData, getCxa, getAct, getCounts, resetPag } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loading/loading"

function Home(){

    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);
    const data = useSelector((state) => state.datos);

    useEffect( ()=>{
        dispatch(getCounts());
        dispatch(getData());
        dispatch(getCxa());
        dispatch(getAct());
    }, [dispatch])

    return(
        <div className={h.padre1}>
            <div className={h.padre2}>
                <div className={h.filter}>
                    <Filter/>
                </div>
                {data.length > 0 ? error ? <h1 className={h.error}>{error[0]}: <br/>{error[1]}</h1> : <div className={h.cards}>
                    <Cards/>
                </div> : <div className={h.loader}><Loader/></div>}
            </div>
        </div>
    )
}

export default Home;