import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
    const authContext = useContext(AuthContext);
    const { login, isAuthenticated, user, error } = authContext;
    const navigate = useNavigate();

    const [loginAs, setLoginAs] = useState('user'); // 'user' or 'admin'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        }
    }, [isAuthenticated, user, navigate]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className="form-container">
            <div className="login-toggle">
                <button
                    className={loginAs === 'user' ? 'active' : ''}
                    onClick={() => setLoginAs('user')}
                >
                    User Login
                </button>
                <button
                    className={loginAs === 'admin' ? 'active' : ''}
                    onClick={() => setLoginAs('admin')}
                >
                    Admin Login
                </button>
            </div>

            <h1>{loginAs === 'user' ? 'User Login' : 'Admin Login'}</h1>
            {error && <p className="error-msg">{error}</p>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
             <p style={{ marginTop: '1rem' }}>
                Don't have an account? <Link to="/signup">Sign up here</Link>
            </p>
        </div>
    );
};

export default LoginPage;

