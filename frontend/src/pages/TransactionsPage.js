import React from 'react';
import { Link } from 'react-router-dom';

const TransactionsPage = () => {
    return (
        <div>
            <h2>Transactions</h2>
            <p>Select a transaction to perform:</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li style={{ marginBottom: '10px' }}>
                    <Link to="/transactions/issue" className="btn">Issue Book</Link>
                </li>
                <li style={{ marginBottom: '10px' }}>
                    <Link to="/transactions/return" className="btn">Return Book & Pay Fine</Link>
                </li>
                 <li style={{ marginBottom: '10px' }}>
                    <Link to="/reports/books" className="btn">Check Book Availability</Link>
                </li>
            </ul>
        </div>
    );
};

export default TransactionsPage;
