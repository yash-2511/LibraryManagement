import React, { useState, useEffect } from 'react';
import api from '../api/api';

const BookIssuePage = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    
    // State for loading and error messages
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Set issue date to today by default
        const today = new Date().toISOString().split('T')[0];
        setIssueDate(today);

        // Fetch available books
        const fetchBooks = async () => {
            setLoading(true);
            setError('');
            try {
                // Explicitly request ONLY available books
                const res = await api.get('/books?status=Available');
                if (res.data.data.length === 0) {
                    setError('No available books found in the library.');
                }
                setBooks(res.data.data);
            } catch (err) {
                setError('Failed to fetch books from the server.');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleIssueDateChange = (e) => {
        const selectedDate = e.target.value;
        setIssueDate(selectedDate);
        
        // Auto-populate return date to 15 days ahead
        const date = new Date(selectedDate);
        date.setDate(date.getDate() + 15);
        setReturnDate(date.toISOString().split('T')[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!selectedBook) {
            setError('Please select a book to issue.');
            return;
        }

        const payload = {
            bookId: selectedBook,
            issueDate: issueDate,
            dueDate: returnDate,
        };

        try {
            await api.post('/transactions/issue', payload);
            setSuccess('Book issued successfully!');
            // Reset form
            setSelectedBook('');
            // Refetch available books to update the list
            const res = await api.get('/books?status=Available');
            setBooks(res.data.data);
            if (res.data.data.length === 0) {
                setError('No available books found in the library.');
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to issue book.');
        }
    };

    const getMinDate = () => new Date().toISOString().split('T')[0];
    const getMaxReturnDate = () => {
        if (!issueDate) return '';
        const date = new Date(issueDate);
        date.setDate(date.getDate() + 15);
        return date.toISOString().split('T')[0];
    }

    return (
        <div>
            <h2>Issue a Book</h2>
            {error && <p className="error-msg">{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label>Book Name</label>
                    <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)} required disabled={loading || books.length === 0}>
                        <option value="">
                            {loading ? "Loading books..." : "Select a book"}
                        </option>
                        {books.map(book => (
                            <option key={book._id} value={book._id}>{book.name} by {book.author}</option>
                        ))}
                    </select>
                </div>
                 <div className="form-group">
                    <label>Author</label>
                    <input type="text" value={books.find(b => b._id === selectedBook)?.author || ''} readOnly />
                </div>
                <div className="form-group">
                    <label>Issue Date</label>
                    <input type="date" value={issueDate} onChange={handleIssueDateChange} min={getMinDate()} required />
                </div>
                <div className="form-group">
                    <label>Return Date</label>
                    <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} min={issueDate} max={getMaxReturnDate()} required />
                </div>
                <button type="submit" className="btn" disabled={loading || books.length === 0}>Issue Book</button>
            </form>
        </div>
    );
};

export default BookIssuePage;

