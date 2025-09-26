import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const SignupPage = () => {
    const authContext = useContext(AuthContext);
    const { register, isAuthenticated, user, error } = authContext;
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user', // Default role is user
    });

    const { name, email, password, role } = formData;

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
        // Simple validation
        if(password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        register({ name, email, password, role });
    };

    return (
        <div className="form-container">
            <h1>Create Account</h1>
             {error && <p className="error-msg">{error}</p>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required />
                </div>
                 <div className="form-group">
                    <label>Account Type</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="user"
                                checked={role === 'user'}
                                onChange={onChange}
                            /> User
                        </label>
                        <label style={{ marginLeft: '1rem' }}>
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={role === 'admin'}
                                onChange={onChange}
                            /> Admin
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn">Sign Up</button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default SignupPage;

