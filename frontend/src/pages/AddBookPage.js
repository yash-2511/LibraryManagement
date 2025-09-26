import React, { useState } from 'react';
import api from '../api/api';

const AddBookPage = () => {
    const [formData, setFormData] = useState({
        type: 'Book',
        name: '',
        author: '',
        category: 'Science',
        procurementDate: new Date().toISOString().split('T')[0],
        cost: '',
        quantity: 1,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { type, name, author, category, procurementDate, cost, quantity } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!name || !author || !cost || quantity < 1) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            const res = await api.post('/books', formData);
            if (res.data.success) {
                setSuccess(`${quantity} ${type}(s) named "${name}" added successfully!`);
                // Reset form
                setFormData({
                    type: 'Book', name: '', author: '', category: 'Science',
                    procurementDate: new Date().toISOString().split('T')[0],
                    cost: '', quantity: 1
                });
            }
        } catch (err) {
            setError(err.response?.data?.message || `Failed to add ${type}.`);
        }
    };

    return (
        <div>
            <h2>Add a New Book or Movie</h2>
            {error && <p className="error-msg">{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={onSubmit} className="form-container">
                <div className="form-group">
                    <label>Type</label>
                    <div>
                        <input type="radio" name="type" value="Book" checked={type === 'Book'} onChange={onChange} /> Book
                        <input type="radio" name="type" value="Movie" checked={type === 'Movie'} onChange={onChange} style={{ marginLeft: '20px' }}/> Movie
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="name">{type} Name</label>
                    <input type="text" name="name" value={name} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author/Director</label>
                    <input type="text" name="author" value={author} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select name="category" value={category} onChange={onChange}>
                        <option value="Science">Science</option>
                        <option value="Economics">Economics</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Children">Children</option>
                        <option value="Personal Development">Personal Development</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="procurementDate">Date of Procurement</label>
                    <input type="date" name="procurementDate" value={procurementDate} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cost">Cost</label>
                    <input type="number" name="cost" value={cost} onChange={onChange} required min="0" />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity/Copies</label>
                    <input type="number" name="quantity" value={quantity} onChange={onChange} required min="1" />
                </div>
                <button type="submit" className="btn">Add {type}</button>
            </form>
        </div>
    );
};

export default AddBookPage;

