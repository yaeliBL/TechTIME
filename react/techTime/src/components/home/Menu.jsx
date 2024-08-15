import React, { useEffect, useState } from 'react';
import './Menu.css';
import logo from '../../imges/200.png'
import SideBar from './sideBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_CATEGORY' });
      }, []);

    const categories = useSelector((state) => state.category.listCategory);
    
    const filterPostsByCategory = (categoryId) => {
      dispatch({ type: "FILTER_POSTS", payload: categoryId })
    }

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu-container">
            <div className="sidebar">
            <Link to={'/'}>
                <img src={logo} alt="Logo" className="logo" />
                </Link>
                    {categories.map((category, index) => (
                            <Link to={'/'} key={index} >
                            <button className="menu-button" onClick={() => filterPostsByCategory(category.id)}>{category.nameCategory}</button>
                            </Link>
                    ))}
            </div>

            <div className={`overlay ${isOpen ? 'open' : ''}`}>
                    {categories.map((category, index) => (
                            <Link to={'/'} key={index}> <button className="menu-button" onClick={toggleMenu}>{category.nameCategory}</button></Link>
                    ))}
            </div>

            <button className="menu-toggle" onClick={toggleMenu}> {isOpen? 'X' : '☰' }</button>
            {/* <img className='airplan' src={airplan} /> */}
            <SideBar />
        </div>
    );
}
