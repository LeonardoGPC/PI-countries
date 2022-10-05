export const ORDER_BY = 'ORDER_BY';
export const GET_DATA = 'GET_DATA';
export const GET_CXA = 'GET_CXA';
export const GET_ACT = 'GET_ACT';
export const GET_COUNTS = 'GET_COUNTS';
export const FILTER_ACTIVITIE = 'FILTER_ACTIVITIE';
export const FILTER_CONTINENT = 'FILTER_CONTINENT';
export const SEARCH = 'SEARCH';
export const VIEW_DETAILS = 'VIEW_DETAILS';
export const PAG_SWITCH = 'PAG_SWITCH';
export const ADD_ACTIVITIE = 'ADD_ACTIVITIE';
export const DLT_ACTIVITIE = 'DLT_ACTIVITIE';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const DLT_CRT_ACT = 'DLT_CRT_ACT';

export const getCounts = () => {
    return function (dispatch){
        return fetch('http://localhost:3001/countries')
        .then(res => res.json())
        .then(response => dispatch({
            type: GET_COUNTS,
            payload: response
        }))
    }
}

export const getData = () => {
    return function (dispatch){
        return fetch('http://localhost:3001/countries')
        .then(res => res.json())
        .then(response => dispatch({
            type: GET_DATA,
            payload: response
        }))
    }
}

export const getCxa = () => {
    return function (dispatch){
        return fetch('http://localhost:3001/cxa')
        .then(res => res.json())
        .then(response => dispatch({
            type: GET_CXA,
            payload: response
        }))
    }
}

export const getAct = () => {
    return function (dispatch){
        return fetch('http://localhost:3001/getActivities')
        .then(res => res.json())
        .then(response => dispatch({
            type: GET_ACT,
            payload: response
        }))
    }
}

export const createActivity = input => {
    return function (dispatch){
        return fetch('http://localhost:3001/activities', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                    "Content-Type": "application/json"
                    }
                })
            .then(res => res.json())
            .then(response => dispatch({
                type: CREATE_ACTIVITY,
                payload: response
        }))
    }
}

export const dltCrtAct = () => {
    return {type: DLT_CRT_ACT}
}

export const dltActivitie = () => {
    return {type: DLT_ACTIVITIE, payload: []}
}

export const addActivitie = (id) => {
    return { type: ADD_ACTIVITIE, payload: id}
}

export const pagSwitch = (swtch) => {
    return { type: PAG_SWITCH, payload: swtch}
}

export const viewDetails = (dtls) => {
    return { type: VIEW_DETAILS, payload: dtls }
}

export const search = (srch) => {
    return { type: SEARCH, payload: srch}
}

export const filterContinent = (continent) => {
    return { type: FILTER_CONTINENT, payload: continent }
};

export const filterActivitie = (activitie) => {
    return {type: FILTER_ACTIVITIE, payload: activitie}
}

export const orderBy = (order) => {
    return { type: ORDER_BY, payload: order }
  
};