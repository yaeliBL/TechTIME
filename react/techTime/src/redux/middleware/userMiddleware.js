import React from 'react'
import axios from 'axios';
import { addUser ,logIn, update, whatError} from '../reducers/userReducer';


    export const addUserMidd = ({dispatch, getstate}) => next => action =>{

        if(action.type === 'ADD_USER'){
            const newUser = action.payload;
            console.log('new post', newUser);
            axios.post('http://localhost:8585/api/user/create', newUser)
            .then( (response) =>{
                console.log('response.data: ', response.data);
                localStorage.setItem("USER", JSON.stringify(response.data));
                dispatch(addUser(response.data));
            })
            .catch((error) =>{
                console.error('error, addUser: ',error);
                dispatch(whatError(error.response.status));
            });
        }
        if(action.type === 'LOG_IN'){
            const newUser = action.payload
            console.log('new user', newUser);
            axios.post(`http://localhost:8585/api/user/logIn`, newUser)
            .then((response) => {
                console.log('resp.data', response.data);
                localStorage.setItem("USER", JSON.stringify(response.data));
                dispatch(logIn({data:response.data,status:response.status}))
            })
            .catch((error) => {
                console.log('error:', error.response.status);
                dispatch(whatError(error.response.status));

            })
        }
        if(action.type === 'UPDATE'){
            const updatesUser = action.payload;
            axios.put(`http://localhost:8585/api/user/update/${updatesUser.id}`, updatesUser)
            .then((response) => {
                console.log('resp.data: ', response.data);
                dispatch(update(response.data))
            })
            .catch((error) => {
                console.error('erro: ', error);
            })
        }
        return next(action);
    };

