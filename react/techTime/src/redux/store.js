import { configureStore } from '@reduxjs/toolkit'
import { addPostMidd, deletePostMidd, getPostsMidd } from './middleware/postMiddleware'
import { getCategoryMidd } from './middleware/categoryMiddleware'
import categoryReducer from './reducers/categoryReducer'
import commentReducer from './reducers/commentReducer'
import postReducer from './reducers/postReducer'
import { addCommentMidd, delCommentsMidd, getCommentMidd } from './middleware/commentMiddleware'
import userReducer from './reducers/userReducer'
import { addUserMidd } from './middleware/userMiddleware'


export const store = configureStore({
    reducer: {
      post: postReducer,
      category:categoryReducer,
      comment:commentReducer,
      user:userReducer
    },

    middleware:(getDefaultMiddleware) => [...getDefaultMiddleware(), getPostsMidd,getCategoryMidd,getCommentMidd,addPostMidd,deletePostMidd, addUserMidd, addCommentMidd, delCommentsMidd],


  })