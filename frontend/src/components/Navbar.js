import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout, user } = authContext;
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    const homeLink = user?.role === 'admin' ? '/admin' : '/user';

    return (
        <nav className="navbar">
            <h1>Library System</h1>
            <div>
                {isAuthenticated && (
                    <>
                        <Link to={homeLink}>Home</Link>
                        <Link to="/reports/books">Reports</Link>
                        <Link to="/transactions">Transactions</Link>
                        <button onClick={onLogout}>Log Out</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

