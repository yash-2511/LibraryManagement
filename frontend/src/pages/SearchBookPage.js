import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const SearchBookPage = () => {
    const [search, setSearch] = useState({ name: '', author: '' });
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onChange = e => setSearch({ ...search, [e.target.name]: e.target.value });

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search.name && !search.author) {
            setError('Please enter a book name or an author to search.');
            return;
        }
        setError('');
        setSearched(true);
        try {
            const res = await api.get(`/books?name=${search.name}&author=${search.author}`);
            setResults(res.data.data);
        } catch (err) {
            setError('Failed to fetch search results.');
        }
    };

    const handleSelectBook = (bookId) => {
        // Navigate to the issue page, passing the selected book's ID
        navigate('/transactions/issue', { state: { selectedBookId: bookId } });
    }

    return (
        <div>
            <h2>Check Book Availability</h2>
            <form onSubmit={handleSearch} className="form-container">
                <div className="form-group">
                    <label>Book Name</label>
                    <input type="text" name="name" value={search.name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" name="author" value={search.author} onChange={onChange} />
                </div>
                <button type="submit" className="btn">Search</button>
                {error && <p className="error-msg" style={{ marginTop: '10px' }}>{error}</p>}
            </form>

            <hr style={{ margin: '2rem 0' }} />

            <h3>Search Results</h3>
            {searched && results.length === 0 ? (
                <p>No books found matching your criteria.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Book Name</th>
                            <th>Author</th>
                            <th>Serial Number</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(book => (
                            <tr key={book._id}>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.serialNumber}</td>
                                <td>{book.status}</td>
                                <td>
                                    {book.status === 'Available' ? (
                                        <button className="btn" onClick={() => handleSelectBook(book._id)}>Issue this Book</button>
                                    ) : (
                                        'Not Available'
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SearchBookPage;
