import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import acc from "./activityCard.module.css";
import { addActivitie } from "../../redux/actions";

export default function ActivityCard({name, img, id}){

    const dispatch = useDispatch();
    const cxa_id = useSelector((state) => state.cxa_id);

    const [selected, setSelected] = useState({gray: 'grayscale(100%)'})

    const scrolling = () => {
        dispatch(addActivitie(id))
    }

    useEffect(() => {
        if(cxa_id.includes(id)){
            setSelected({gray: 'grayscale(0%)'})
        } else {
            setSelected({gray: 'grayscale(100%)'})
        }
    }, [cxa_id])

    return(
        <div>
            <div className={acc.main} onClick={scrolling}>
                <img src={img} className={acc.img} style={{filter: `${selected.gray}`}} alt='Country_Flag'/>
                <div className={acc.text}>
                    {/* <h3 className={acc.name}>{name}</h3> */}
                    {name.length > 22 ? <h3 className={acc.name}>{name.split(' ')[0]} {(name.split(' ')[1].includes(',')) ? name.split(' ')[1].split(',')[0] : name.split(' ')[1]}</h3> : <h3 className={acc.name}>{name}</h3>}
                </div>
            </div>
        </div>
    )
}