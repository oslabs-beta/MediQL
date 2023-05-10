import React from 'react';
import logo from './logo.png';
import './navbarStyles.scss';

const Navbar = () => {
    return (
        <>
            <nav>
                <a href='/'>
                    <img src={logo}/>
                </a>

                <div id='title'>
                    <h1>MediQL</h1>
                    {/* <ul id='navbar'>
                        <li>
                            if you want to add links
                        </li>
                    </ul> */}
                </div>
            </nav>
        </>
    )
}

export default Navbar;