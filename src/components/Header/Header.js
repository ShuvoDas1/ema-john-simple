import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav className='p-2'>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order review</Link>
                <Link to="/inventory">Manage inventory</Link>
                {/* <button className='btn btn-info ml-lg-3'  onClick={() => setLoggedInUser({})}>Sign Out</button> */}
            </nav>
        </div>
    );
};

export default Header;