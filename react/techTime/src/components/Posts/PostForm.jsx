import React, { useEffect, useState } from 'react';
import './PostForm.css'; 
import { useDispatch, useSelector } from 'react-redux';

const PostForm = () => {
    const [postTopic, setPostTopic] = useState('');
    const [subject, setSubject] = useState('');
    const [readTime, setReadTime] = useState('');
    const [postContent, setPostContent] = useState('');

    const currentUser = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({ type: 'GET_CATEGORY' });
    }, []);
  
    const topics = useSelector((state) => state.category.listCategory);

    const contentArray = postContent.split('\n');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_POST',
            payload: detailsToPost,
          });
          setPostTopic('');
          setSubject('');
          setReadTime('');
          setPostContent('');
    };

    let currentDate = new Date().toJSON().slice(0, 10);

    const detailsToPost = {
      id: 0,
      topic: subject,
      readTime: readTime,
      dateUpload: currentDate,
      score: 0,
      category: { id: postTopic },
      userPost: { id: currentUser.id },
      contents:contentArray
    };

    const handleInput = (setter, value) => {
        setter(value);
    };

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <div className="input-container">
                <select 
                    onChange={(e) => handleInput(setPostTopic, e.target.value)}
                    required
                    className={`input-field ${postTopic ? 'filled' : ''}`}
                >
                    <option key={0} value={0} >{" "}</option>
                    {topics.map((topic) => (
                        <option  key={topic.id} value={topic.id} >{topic.nameCategory}</option>
              ))}
                </select>
                <label className="input-label">Post Category *</label>
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    value={subject} 
                    onChange={(e) => handleInput(setSubject, e.target.value)}
                    required
                    className={`input-field ${subject ? 'filled' : ''}`}
                />
                <label className="input-label">Subject *</label>
            </div>
            <div className="input-container">
                <input 
                    type="number" 
                    value={readTime} 
                    onChange={(e) => handleInput(setReadTime, e.target.value)}
                    required
                    className={`input-field ${readTime ? 'filled' : ''}`}
                />
                <label className="input-label">Read Time *</label>
            </div>
            <div className="input-container">
                <textarea 
                    value={postContent} 
                    onChange={(e) => handleInput(setPostContent, e.target.value)}
                    required
                    className={`input-field textarea-field ${postContent ? 'filled' : ''}`}
                />
                <label className="input-label">Post Content *</label>
            </div>
            <button type="submit" className="sub-button">Create post</button>
        </form>
    );
};

export default PostForm;
