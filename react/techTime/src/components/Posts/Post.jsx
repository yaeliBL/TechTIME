import React from 'react';
import './Post.css'; // Make sure to link the CSS file
import { Link } from 'react-router-dom';


const Post = ({ post}) => {
  return (
    <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
        <div className="post-container">
      <div className="profile-image" style={{ backgroundColor: post?.userPost?.image }}>
        {post?.userPost?.firstName?.charAt(0)}
      </div>
      <div className="post-content">
        <div className="post-title">{post?.topic}</div>
        <div className="post-author">{post?.userPost?.firstName }  |  {post?.dateUpload}  |{post?.readTime} 🕒</div>
        <div className="post-text">{post?.contents?.[0]} 
            <br></br>
            {post?.contents?.[1]} 
        </div>
      </div>
    </div>
    </Link>
    
  );
};

export default Post;
