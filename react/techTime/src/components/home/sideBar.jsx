import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './sideBar.css'; // Make sure to create this CSS file

export default function SideBar() {
  const currentUser = useSelector((state) => state.user.user);

  return (
    <>
      <Link to={'/MyAccount'}>
        <div className='avatar-container'>
          <div className='avatar-circle' style={{ backgroundColor:currentUser?.image }} >
            {currentUser?.firstName?.charAt(0)}
          </div>
        </div>
      </Link>
    </>
  );
}


