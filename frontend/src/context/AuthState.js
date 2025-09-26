import React, { useReducer, useEffect } from 'react';
import AuthContext from './AuthContext';
import api from '../api/api';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOADED':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };
        case 'LOGIN_SUCCESS': // This will also be used for registration success
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                error: null, // Clear previous errors
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            try {
                const res = await api.get('/auth/me');
                dispatch({
                    type: 'USER_LOADED',
                    payload: res.data.data,
                });
            } catch (err) {
                dispatch({ type: 'AUTH_ERROR' });
            }
        } else {
             dispatch({ type: 'AUTH_ERROR' });
        }
    };
    
    useEffect(() => {
        loadUser();
    }, []);

    // Register User
    const register = async (formData) => {
        try {
            const res = await api.post('/auth/signup', formData);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data,
            });
            // The loadUser() call was removed from here. It's not needed
            // because the user object is already in the response payload.
        } catch (err) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: err.response?.data?.message || 'Registration failed',
            });
        }
    };

    // Login User
    const login = async (formData) => {
        try {
            const res = await api.post('/auth/login', formData);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: res.data,
            });
            // The loadUser() call was removed from here. It's not needed
            // because the user object is already in the response payload.
        } catch (err) {
            dispatch({
                type: 'AUTH_ERROR',
                payload: err.response?.data?.message || 'Login Failed',
            });
        }
    };

    // Logout
    const logout = () => dispatch({ type: 'LOGOUT' });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                login,
                logout,
                loadUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;

