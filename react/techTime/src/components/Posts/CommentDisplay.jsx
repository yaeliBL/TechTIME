import React from 'react';
import './CommentDisplay.css';

export default function CommentDisplay({ comment }) {
    return (
        <div className="comment-wrapper">
            <div className="avatar" style={{ backgroundColor: comment.userComment.image }}>
                <span className="initials">{comment?.userComment?.firstName?.charAt(0)}</span>
            </div>
            <div className="comment-container">
            <div className="comment-header"> {comment.userComment.firstName + " " + comment.userComment.lastName+"|"+ comment.dateUpload}</div>
            <div className="comment-text">{comment.content} </div>

                
            </div>
        </div>
    );
}
