import React, { useState } from 'react';
import Carousel from '../Carousel-Component/Carousel';
import Login from '../Login-Component/Login';
import './Main.css'
import SignUp from '../Login-Component/SignUp';
import { Outlet } from 'react-router-dom';

const Main = ()=> {
    const [showLogin, setShowLogin] = useState(true)
    return (
        <div className='main-container d-flex'>
            <Carousel />
           < Outlet />
           
        </div>
    )
}

export default Main;