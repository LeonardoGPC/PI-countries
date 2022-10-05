import { React, useEffect } from "react";
import h from "./home.module.css";
import Cards from "./cards";
import Filter from "./Filtros/filter";
import { getData, getCxa, getAct, getCounts } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";

function Home(){

    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);

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
                {error ? <h1 className={h.error}>{error[0]}: <br/>{error[1]}</h1> : <div className={h.cards}>
                    <Cards/>
                </div>}
            </div>
        </div>
    )

    // if((srch == false || srch.length == 0)){
    // return(
    //     <div className={h.padre1}>
    //         <div className={h.padre2}>
    //             <div className={h.filter}>
    //                 <Filter/>
    //             </div>
    //             <div className={h.cards}>
    //                 {/* <Cards data={data} find={find} setDtls={setDtls} dtls={dtls}/> */}
    //                 <Cards srch={srch} setDtls={setDtls} dtls={dtls}/>
    //             </div>
    //         </div>
    //     </div>
    // )} else if(srch.length > 0){
    //     return(
    //         <div className={h.padre1}>
    //             <div className={h.padre2}>
    //                 <div className={h.cards}>
    //                     {/* <Cards data={data} find={find} setDtls={setDtls} dtls={dtls}/> */}
    //                     <Cards srch={srch} setDtls={setDtls} dtls={dtls}/>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // } else {
    //     return(
    //         <div className={h.err}>
    //             <h1>Cargando...</h1>
    //         </div>
    //     )
    // }
}

export default Home;