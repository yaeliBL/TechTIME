import React, { useEffect } from 'react';
import './PostDisplay.css';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CommentDisplay from './CommentDisplay';

const PostDisplay = () => {
    const {id}=useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_POST' ,
          payload:id
  })
      }, []);
  
    const post = useSelector( (state) => state.post.post);
    console.log("@@@@@@@@@@@': ", post);
    
    return (
        <>
        <div className='all-compo'>
     <div className="post-display-container">
      <div className="post-header">
        <h2 className="post-title">{post?.topic}</h2>
        <div className="post-meta">
          <span className="post-author">{post?.userPost?.firstName}  {post?.userPost?.lastName}  |  {post?.dateUpload}  |  {post?.readTime} 🕒</span>
        </div>
      </div>
      
      <div className="post-content">
        { post&&post.contents&& post.contents.map((line, index) => (
              <p key={index}>{line}</p>
            )) }
      </div>
    </div>
    <CommentForm postId={post?.id} />
    <div >
        
      {post&&post.comment&&post.comment.map((comment, index) => <CommentDisplay key={index} comment={comment}/> )}
      </div> 
      </div>
      
    

        </>
    );
};

export default PostDisplay;
