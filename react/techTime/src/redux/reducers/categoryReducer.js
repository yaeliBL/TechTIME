import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listCategory: [],
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers:{
        getCategory:(state, action) =>{
            state.listCategory = (action.payload);
        },
        addCategory:(state, action) =>{
            state.listCategory.push(action.payload);
        }
    },
})

export const {getCategory} = categorySlice.actions

export default categorySlice.reducer 