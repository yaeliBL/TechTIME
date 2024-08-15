import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    listComments:[],
}

export const commentSlice = createSlice({
    name:'comment',
    initialState,
    reducers:{
        getComment:(state, action) =>{
            state.listComments = (action.payload);
        },
        addComment:(state, action) =>{
            state.listComments.push(action.payload);
        },
        delComments:(state) =>{
            state.listComments = [];
            console.log("state.listComments: ",state.listComments);
            
        }
    },
})

export const {getComment, addComment, delComments} = commentSlice.actions

export default commentSlice.reducer