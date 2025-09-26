import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const AdminHomePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h2>Admin Home Page</h2>
            <p>Welcome, {user && user.name}!</p>
            <p>You have access to the following modules:</p>
            <ul>
                <li><Link to="/maintenance">Maintenance (Not Implemented)</Link></li>
                <li><Link to="/reports/books">Reports</Link></li>
                <li><Link to="/transactions/issue">Transactions</Link></li>
            </ul>
             <h4>Product Categories</h4>
            <table>
                <thead>
                    <tr>
                        <th>Code No From</th>
                        <th>Code No To</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>SC(B/M)000001</td><td>SC(B/M)000004</td><td>Science</td></tr>
                    <tr><td>EC(B/M)000001</td><td>EC(B/M)000004</td><td>Economics</td></tr>
                    <tr><td>FC(B/M)000001</td><td>FC(B/M)000004</td><td>Fiction</td></tr>
                    <tr><td>CH(B/M)000001</td><td>CH(B/M)000004</td><td>Children</td></tr>
                    <tr><td>PD(B/M)000001</td><td>PD(B/M)000004</td><td>Personal Development</td></tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdminHomePage;