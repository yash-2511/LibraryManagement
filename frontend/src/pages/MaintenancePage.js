import React from 'react';
import { Link } from 'react-router-dom';

const MaintenancePage = () => {
    return (
        <div>
            <h2>Maintenance & Housekeeping</h2>
            <p>Select a task to perform:</p>
            
            <h4>Membership Management</h4>
            <ul>
                <li><Link to="/maintenance/add-membership">Add New Membership</Link></li>
                <li>Update Membership (Not Implemented)</li>
            </ul>

            <h4>Books/Movies Management</h4>
            <ul>
                <li><Link to="/maintenance/add-book">Add New Book/Movie</Link></li>
                <li>Update Book/Movie (Not Implemented)</li>
            </ul>

             <h4>User Management</h4>
            <ul>
                <li>Add/Update User (Not Implemented)</li>
            </ul>
        </div>
    );
};

export default MaintenancePage;

