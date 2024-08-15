import React from 'react'
import axios from 'axios';
import { getCategory } from '../reducers/categoryReducer'


export const getCategoryMidd = ({dispatch, getState}) => next => action => {
        if(action.type === 'GET_CATEGORY'){
    
            axios.get('http://localhost:8585/api/category/get')
                .then((response) =>{
                    console.log('response.data', response.data);
                    dispatch(getCategory(response.data));
                })
                .catch((error) =>{

                    console.error("error fetching category", error);
                });
        } 
        return next(action);
    };
