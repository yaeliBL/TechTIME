import React, { useEffect, useState } from 'react';
import './userProfile.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/reducers/userReducer';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const user = useSelector((state) => state.user.user);
  const [selectedColor, setSelectedColor] = useState(user.image);
  const [password, setPassword] = useState(user.password);
  const [name, setName] = useState(user.firstName + " " +user.lastName);
  const [status, setStatus] = useState(user.status);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const userPosts = useSelector((state) => state.post.userPosts);

  useEffect(() => {
    dispatch({ type: 'GET_USER_POSTS', payload: user.id });
  }, [dispatch, user.id]);

  const handleEditClick = () => {
    setShowPopup(!showPopup);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedData = {
      id: user.id,
      mail: user.mail,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      password: password,
      status: status,
      image: selectedColor
    };
    dispatch({ type: 'UPDATE', payload: updatedData });
    localStorage.setItem("USER", JSON.stringify(updatedData));
    setShowPopup(false);  // close the popup after saving
  }

  const handleLogout = () => {
    dispatch(logOut());
  };

  const del = (post) => {
    console.log(post);
    dispatch({ type: 'DEL_POST', payload: post });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-circle" style={{ backgroundColor: user.image }}>
          {user?.firstName?.charAt(0)}
          <button className="edit-button" onClick={handleEditClick}>🖊</button>
        </div>

        {showPopup && (
          <div className="edit-popup">
            <button className="cancel" onClick={() => setShowPopup(false)}>X</button>
            <label htmlFor=''>change color</label>
            <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}/>
            <label htmlFor=''>name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor=''>status</label>
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
            <label htmlFor=''>password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button className="save" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        )}

        <div className="actions-container">
        <Link to={'/newPost'}>
            <button className="add-post-button">
              <span role="img" aria-label="add post">➕</span> Add Post
            </button>
          </Link>
        <a href='/'>
          <button className="logout-button" onClick={handleLogout}>
            <span role="img" aria-label="logout">🔓</span> Logout
          </button>
          </a>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-item">
          <h3>📧</h3>
          <h2>{user?.mail}</h2>
        </div>
        <div className="stat-item">
          <h3>✏</h3>
          <h2>{user?.firstName + " " + user?.lastName}</h2>
        </div>
        <div className="stat-item">
          <h3>🚩</h3>
          <h2>{user.status}</h2>
        </div>
      </div>

      <div className="posts-section">
        <h3>You have {userPosts.length} posts:</h3>
        {userPosts.map(post => (
          <div key={post.id} className="post-item">
            <span className="post-title">{post.topic}</span>
            {/* <button onClick={() => del(post)} className="delete">🗑️</button> */}
            {/* <button className="edit">✏️</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
