import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthState from './context/AuthState';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Page Imports
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminHomePage from './pages/AdminHomePage';
import UserHomePage from './pages/UserHomePage';
import TransactionsPage from './pages/TransactionsPage';
import SearchBookPage from './pages/SearchBookPage';
import BookIssuePage from './pages/BookIssuePage';
import BookReturnPage from './pages/BookReturnPage';
import PayFinePage from './pages/PayFinePage';
import ReportsPage from './pages/ReportsPage';
import MaintenancePage from './pages/MaintenancePage';
import AddBookPage from './pages/AddBookPage';
import AddMembershipPage from './pages/AddMembershipPage';

import './App.css';

const App = () => {
    return (
        <AuthState>
            <Router>
                <div className="container">
                    <Navbar />
                    <div className="page-container">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />

                            {/* Admin Routes */}
                            <Route path="/admin" element={<PrivateRoute component={AdminHomePage} roles={['admin']} />} />
                            <Route path="/maintenance" element={<PrivateRoute component={MaintenancePage} roles={['admin']} />} />
                            <Route path="/maintenance/add-book" element={<PrivateRoute component={AddBookPage} roles={['admin']} />} />
                            <Route path="/maintenance/add-membership" element={<PrivateRoute component={AddMembershipPage} roles={['admin']} />} />
                            
                            {/* User Routes */}
                            <Route path="/user" element={<PrivateRoute component={UserHomePage} roles={['user']} />} />
                            
                            {/* Shared Routes (Admin & User) */}
                            <Route path="/transactions" element={<PrivateRoute component={TransactionsPage} roles={['admin', 'user']} />} />
                            <Route path="/transactions/search" element={<PrivateRoute component={SearchBookPage} roles={['admin', 'user']} />} />
                            <Route path="/transactions/issue" element={<PrivateRoute component={BookIssuePage} roles={['admin', 'user']} />} />
                            <Route path="/transactions/return" element={<PrivateRoute component={BookReturnPage} roles={['admin', 'user']} />} />
                            <Route path="/transactions/pay-fine" element={<PrivateRoute component={PayFinePage} roles={['admin', 'user']} />} />
                            <Route path="/reports/:reportType" element={<PrivateRoute component={ReportsPage} roles={['admin', 'user']} />} />
                            
                            {/* Default Route */}
                            <Route path="/" element={<LoginPage />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthState>
    );
};

export default App;

