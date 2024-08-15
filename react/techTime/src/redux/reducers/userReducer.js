import { createSlice } from '@reduxjs/toolkit';
const getUserFromLocalStorage = () => {
    const localUser = localStorage.getItem("USER");
    console.log('localUser from localStorage:', localUser); 
    if (localUser == null) return {};
    return JSON.parse(localUser);
};

const initialState = {
    user: JSON.parse(localStorage.getItem("USER")),
    status:0,
    currentUser: null,
    signInError: true,
    errorNumber: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        addUser:(state, action) =>{
            state.user = getUserFromLocalStorage()
        },
        logIn:(state, action) =>{
            state.status = (action.payload.status)
            console.log(state.user);
            state.user = JSON.parse(localStorage.getItem("USER"))
            console.log("state.user: ", state.user);
            
            
        },
        logOut:(state) =>{
            localStorage.removeItem("USER");
            state.user = getUserFromLocalStorage();

        },
        update:(state) =>{
            state.user= JSON.parse(localStorage.getItem("USER"))
        },
        whatError:(state, action) =>{
            state.errorNumber = action.payload;
        }
        
    },
})

export const {addUser, logIn, logOut, update, whatError} = userSlice.actions

export default userSlice.reducer 