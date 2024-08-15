import axios from "axios";
import { getComment , addComment, delComments} from "../reducers/commentReducer";
import { addCommentToPost } from "../reducers/postReducer";


export const getCommentMidd = ({dispatch, getState}) => next => action => {
    if(action.type === 'GET_COMMENT'){
        axios.get(`http://localhost:8585/api/comment/get/${action.payload}`)
        .then((response) =>{
            console.log('response.data', response.data);
        })
        .catch((error) =>{
            console.error("error fetching comment", error);
        })
    }
    return next(action)
};

export const addCommentMidd = ({dispatch, getstate}) => next => action =>{

    if(action.type === 'ADD_COMMENT'){
        const newComment = action.payload;
        console.log('new post', newComment);
        axios.post(' http://localhost:8585/api/comment/create', newComment)
        .then( (response) =>{
            console.log('response.data', response.data);
            dispatch(addCommentToPost(response.data ))
        })
        .catch((error) =>{
            console.error('Error ',error);
        });
    }
    return next(action);
};

export const delCommentsMidd = ({dispatch, getstate}) => next => action =>{

    if(action.type === 'DEL_COMMENTS'){
        console.log('del action.payload!!!!!!', action.payload);
        axios.delete('http://localhost:8585/api/comment/deleteCommentByPost', action.payload)
        .then((response) =>{
            console.log('success', response);
            dispatch(delComments());
        })
        .catch((error) =>{
            console.error('Error ',error);
        });
    }
    return next(action);
};