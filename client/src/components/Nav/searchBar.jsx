import { React } from "react";
import { resetPag, search } from "../../redux/actions";
import { useDispatch } from "react-redux";
import sb from './searchBar.module.css';

export default function SearchBar(){

    const dispatch = useDispatch();

    const onTyping = e => {
        dispatch(search(e.target.value))
        dispatch(resetPag(1))
    }

    return(
        <div className={sb.main}>
            <input type="text" placeholder="País..." name="searchBar" autoComplete="off" className={sb.input} onChange={e => onTyping(e)}/>
        </div>
    )
}