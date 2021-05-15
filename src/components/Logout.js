import React, { useEffect, useReducer } from 'react';
import {useHistory} from 'react-router-dom';
import {reducer, initialState} from'../reducer/useReducer';

const Logout = () => {
    
    const [state, dispatch] =  useReducer(reducer, initialState);
    const history = useHistory();
    useEffect(() => {
        fetch('/Logout', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        }).then((res) => {
            dispatch({action:"USER", payload:false});
            history.push('/', { replace: true});
            if(res.status !== 200){
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    });
    return (
        <>
        <h1>hello</h1>
        </>
    )
}
 export default Logout;