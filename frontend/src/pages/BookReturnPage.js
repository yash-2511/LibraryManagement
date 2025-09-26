import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const BookReturnPage = () => {
    const [issuedBooks, setIssuedBooks] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssuedBooks = async () => {
            try {
                const res = await api.get('/transactions/my-transactions');
                setIssuedBooks(res.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch your issued books.');
                setLoading(false);
            }
        };
        fetchIssuedBooks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!selectedTransaction) {
            setError('Please select a book to return.');
            return;
        }
        
        const returnDate = new Date().toISOString().split('T')[0];

        try {
            const res = await api.post('/transactions/return', {
                transactionId: selectedTransaction,
                returnDate: returnDate
            });

            const returnedTransaction = res.data.data;
            
            // If there is a fine, navigate to the PayFinePage
            if (returnedTransaction.fine > 0) {
                navigate('/transactions/pay-fine', { state: { transaction: returnedTransaction } });
            } else {
                alert('Book returned successfully with no fine!');
                // Refresh the list of issued books
                const updatedList = issuedBooks.filter(t => t._id !== selectedTransaction);
                setIssuedBooks(updatedList);
                setSelectedTransaction('');
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to return book.');
        }
    };

    if (loading) return <p>Loading your issued books...</p>;

    return (
        <div>
            <h2>Return a Book</h2>
            {error && <p className="error-msg">{error}</p>}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Select Book to Return</label>
                    <select value={selectedTransaction} onChange={e => setSelectedTransaction(e.target.value)} required>
                        <option value="">-- Select a Book --</option>
                        {issuedBooks.length > 0 ? (
                            issuedBooks.map(t => (
                                <option key={t._id} value={t._id}>
                                    {t.book.name} (Due: {new Date(t.dueDate).toLocaleDateString()})
                                </option>
                            ))
                        ) : (
                            <option disabled>You have no books to return.</option>
                        )}
                    </select>
                </div>
                 <button type="submit" className="btn" disabled={issuedBooks.length === 0}>
                    Proceed to Return
                </button>
            </form>
        </div>
    );
};

export default BookReturnPage;
