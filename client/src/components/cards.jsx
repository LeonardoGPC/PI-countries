import React from "react";
import { useSelector } from "react-redux";
import Card from "./card";
import c from "./cards.module.css";
import Paginado from "./paginado";

export default function Cards(){

    // const [find, setFind] = useState([]);

    // useEffect(()=>{
    //     // if(data && srch.length != 0){
    //     // var resultadoDB = data.filter(e => {if(e.name.toString().toLowerCase().includes(srch.toString().toLowerCase())){
    //     //     return e;
    //     // }})
    //     if(data && srch.length != 0){
    //     var resultadoDB = data.filter(e => {if(e.name.toString().toLowerCase().includes(srch.toString().toLowerCase())){
    //         return e;
    //     }})
    //     setFind(resultadoDB);
    //     } else {
    //         setFind([])
    //     }
    // }, [srch])

    // useEffect(() => {
    //     if(data.length > 9){
    //         console.log('Es mayor a 9')
    //         setPag1([data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8]]);
    //         setPags(data.slice(9, data.length));
    //     } else if (data.length === 0){
    //         console.log('Cargando')
    //     } else {
    //         console.log('Es menor a 9')
    //         setPag1([])
    //         console.log(pag1)
    //         for(let i = 0; i < data.length; i++){
    //             setPag1([...pag1, data[i]])
    //         }
    //     }
    // }, [data])

    const data = useSelector((state) => state.datos);
    const pag = useSelector((state) => state.pag);
    const paginado = useSelector((state) => state.perPage);

    const index1 = (paginado * (pag - 1)) - (pag - (pag - 1));
    const index2 = paginado + index1;

    const countriesRender = pag == 1 ? data.slice(0, 9) : data.slice(index1, index2)

    const max = (data.length / 10) + 1; 

    return(
        <div>
            <div className={c.cards}>
                {countriesRender ? countriesRender.map(e => 
                <Card
                name={e.name}
                img={e.img}
                continent={e.continent}
                ky={e.ky}
                key={e.id}
                />) : <h1>Cargando...</h1>}
            </div>
            <Paginado max={max} pagina={pag} />
        </div>
    )

    // if(find.length === 0){
        // if(data != 0){
        //     if(pagina === 0){
        //         return(
        //             <div>
        //                 <div className={c.cards}>
        //                 {pag1.map(d => <Card
        //                 name={d.name}
        //                 img={d.img}
        //                 continent={d.continent}
        //                 ky={d.ky}
        //                 setDtls={setDtls}
        //                 dtls={dtls}
        //                 />)}
        //                 </div>
        //                 <Paginado max={max} pagina={pagina} setPagina={setPagina} />
        //             </div>
        //     )}else{
        //         return(
        //             <div>
        //                 <div className={c.cards}>
        //                 {pags.slice(
        //                     (pagina - 1) * paginado,
        //                     (pagina - 1) * paginado + paginado
        //                 ).map(d => <Card
        //                 name={d.name}
        //                 img={d.img}
        //                 continent={d.continent}
        //                 ky={d.ky}
        //                 setDtls={setDtls}
        //                 dtls={dtls}
        //                 />)}
        //                 </div>
        //                 <Paginado max={max} pagina={pagina} setPagina={setPagina} />
        //             </div>
        //     )}} else {
        //     return(
        //         <div>
        //             No hay paises
        //         </div>
        //     )
        // }
    // } else {
    //     return(
    //         <div>
    //             <div className={c.cards}>
    //                 {find.map(f => <Card name={f.name} img={f.img} continent={f.continent} ky={f.ky} setDtls={setDtls} dtls={dtls}/>)}
    //             </div>
    //         </div>
    //     )
    // }
}