import { ORDER_BY, GET_DATA, GET_CXA, GET_ACT, FILTER_CONTINENT, FILTER_ACTIVITIE, GET_COUNTS, SEARCH, VIEW_DETAILS, PAG_SWITCH, ADD_ACTIVITIE, DLT_ACTIVITIE, CREATE_ACTIVITY, DLT_CRT_ACT, RESET_PAG, SET_PAG_INPUT } from "../actions";

const initialState = {
    counts: [],
    datos: [],
    cxa: [],
    act: [],
    search: false,
    dtls: false,
    error: false,
    pag: 1,
    pagInput: 1,
    perPage: 9,
    cxa_id: [],
    crt_act: {},
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COUNTS:
            return {
                ...state,
                counts: action.payload
            }
        case GET_DATA:
            return {
                ...state,
                datos: action.payload
            }
        case GET_CXA:
            return {
                ...state,
                cxa: action.payload
            }
        case GET_ACT:
            return{
                ...state,
                act: action.payload
            }
        case VIEW_DETAILS:
            return{
                ...state,
                dtls: action.payload
            }
        case DLT_ACTIVITIE:
            return{
                ...state,
                cxa_id: action.payload
            }
        case DLT_CRT_ACT:
            return{
                ...state,
                crt_act: {}
            }
        case RESET_PAG:
            return{
                ...state,
                pag: action.payload,
                pagInput: action.payload
            }
        case SET_PAG_INPUT:
            return{
                ...state,
                pagInput: action.payload
            }
        case CREATE_ACTIVITY:
            if(Object.entries(action.payload).length !== 0){
                return{
                    ...state,
                    crt_act: action.payload,
                    cxa_id: []
                }
            }
            return{ ...state }
        case ADD_ACTIVITIE:
            let id;
            if(state.cxa_id.includes(action.payload)){
                id = state.cxa_id.filter(e => e !== action.payload)
                return{
                    ...state,
                    cxa_id: id
                }
            } else {
                return{
                    ...state,
                    cxa_id: [...state.cxa_id, action.payload]
                }
            }
        case PAG_SWITCH:

            let pp;

            if(action.payload === 1){
                pp = 9;
            } else {
                pp = 10;
            }

            return{
                ...state,
                pag: action.payload,
                perPage: pp
            }
        case SEARCH:
            let data;
            data = state.counts;
            let $search;

            if(action.payload.length === 0){
                data = state.counts;
                $search = false;
            } else {
                data = data.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
                if(data.length < 1){
                    data = ['No pudimos encontrar ese país llamado ', `${action.payload}, lo sentimos 😢`];
                    $search = true;
                    return{
                        ...state,
                        error: data,
                        search: $search
                    }
                } else {
                    $search = true;
                    return{
                        ...state,
                        error: false,
                        datos: data,
                        search: $search
                    }
                }
            }

            return{
                ...state,
                error: false,
                datos: data,
                search: $search
            }
        case FILTER_CONTINENT:

            let filtCont;

            if(action.payload === "All"){
                filtCont = state.counts;
            } else {
                filtCont = state.counts.filter(e => e.continent === action.payload)
            }

            return{
                ...state,
                datos: filtCont
            }
        case FILTER_ACTIVITIE:
            
            let filtAct;

            if(action.payload === "All"){
                filtAct = state.cxa.filter(e => e.activities.length > 0)
            } else {
                filtAct = state.cxa.filter(e => e.activities && e.activities.map(c => c.name).includes(action.payload))
            }
            return{
                ...state,
                datos: filtAct
            }
        case ORDER_BY:

            let ordenDatos;
            ordenDatos = [...state.datos]

            let key = JSON.parse(action.payload)[0];

            let value = JSON.parse(action.payload)[1];

            if (value === "asc") {
                ordenDatos.sort((a, b) => {
                    // console.log(a[key])
                    if (a[key] > b[key]) {
                        return 1;
                    }
                    if (a[key] < b[key]) {
                        return -1
                    }
                    return 0
                })
            }
            if (value === "des") {
                ordenDatos.sort((a, b) => {
                    if (a[key] > b[key]) {
                        return -1;
                    }
                    if (a[key] < b[key]) {
                        return 1
                    }
                    return 0
                })
            }
            return {
                ...state,
                datos: ordenDatos
            };
        default: return{...state};
    }
}

export default rootReducer;