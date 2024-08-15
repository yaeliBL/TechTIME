import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    listPosts: [],  
    filteredPosts: [],
    post:{},
    userPosts: []
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{
        getPostById:(state,action) =>{
            state.post = action.payload;
        },
        getPosts:(state, action) =>{
            state.listPosts = (action.payload);
            const tempFilterList = state.listPosts.filter(post => post.category.id === 1)
            state.filteredPosts = tempFilterList;
        },
        filterPosts:(state, action) =>{
            const tempFilterList = state.listPosts.filter(post => post.category.id === action.payload)
            state.filteredPosts = tempFilterList;
        },
        addPost:(state, action) =>{
            state.listPosts.push(action.payload);
        },
        filterUserPosts:(state, action) =>{
            if(state.listPosts.length != 0){
                const tempList = state.listPosts.filter(post => post.userPost.id === action.payload);
                console.log("#tempList:", tempList);
                state.userPosts = tempList;
            }

        }, 
        delPostById:(state, action) =>{
            state.listPosts = state.listPosts.filter(p => p.id !== action.payload ); // if t.id != id it we'll keep the item. else - del
            state.filteredPosts = state.filteredPosts.filter(p => p.id !== action.payload );
            state.userPosts = state.userPosts.filter(p => p.id !== action.payload );
        },
        addCommentToPost: (state, action) => {
            state.post.comment.push(action.payload)
        }
    },
})

export const {getPosts, addPost, filterPosts, getPostById, filterUserPosts, delPostById,addCommentToPost} = postSlice.actions

export default postSlice.reducer 