import axios from 'axios';
import { getPosts, filterPosts , addPost, getPostById, filterUserPosts, delPostById} from '../reducers/postReducer'
// import { delComments } from '../reducers/commentReducer';

export const getPostsMidd = ({dispatch, getstate}) => next => action => {
    if(action.type === 'GET_POSTS'){
        axios.get('http://localhost:8585/api/post/get')
            .then((response) =>{
                console.log('response.data', response.data);
                dispatch(getPosts(response.data));
            })
            .catch((error) =>{
                console.error("error fetching posts", error);
            });      
    } 
    else switch(action.type){
        case 'FILTER_POSTS': dispatch(filterPosts(action.payload)); console.log(" FILTER_POSTS - done"); break;
        case 'GET_USER_POSTS': dispatch(filterUserPosts(action.payload)); console.log("GET_USER_POSTS - done"); break;
    }
    if(action.type === "GET_POST"){
        axios.get(`http://localhost:8585/api/post/getdto/${action.payload}`)
        .then((response) =>{
            console.log('response.data', response.data);
            dispatch(getPostById(response.data));
        })
        .catch((error) =>{
            console.error("error fetching single post", error);
        });

    }
    return next(action);
};

export const addPostMidd = ({dispatch, getstate}) => next => action =>{

    if(action.type === 'ADD_POST'){
        const newPost = action.payload;
        console.log('new post', newPost);
        axios.post('http://localhost:8585/api/post/create',newPost)
        .then( (response) =>{
            console.log('response.data', response.data);
            dispatch(addPost(response.data));
        })
        .catch((error) =>{
            console.error('error, addPost: ',error);
        });
    }
    return next(action);
};

export const deletePostMidd = ({dispatch, getstate}) => next => action =>{
    if(action.type === 'DEL_POST'){
        console.log("DEL_POST -->>>>>", action.payload);
        // dispatch(delComments())
        axios.delete('http://localhost:8585/api/post/deletePostById',action.payload)
          .then(( ) => {
            console.log('success!');
            dispatch(delPostById(action.payload.id));
          })
          .catch((error) => {
            console.error('error deleting', error);
          })
    }
    return next(action);
};