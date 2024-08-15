import React, { useState } from 'react';
import './CommentForm.css';
import { useDispatch, useSelector } from 'react-redux';

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  let currentDate = new Date().toJSON().slice(0, 10);
  
  const commentToSend ={
    "id": 0,
    "topic": "",
    "content": comment,
    "dateUpload":currentDate,
    "score": 0,
    "postComment":{"id":postId},
     "userComment": {"id":currentUser.id}
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_COMMENT',
      payload: commentToSend
    })
    setComment('');
  };
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="input-container">
        <input type="text" value={comment} onChange={e => setComment(e.target.value)} className="comment-input" placeholder="Write your comment..." />
        <button type="submit" className="submit-button">Send</button>      
      </div>
      
    </form>
  );
};

export default CommentForm;
