import React, { useState } from 'react';
import api from '../api/api';

const AddMembershipPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '', // Added email field
        contactNumber: '',
        contactAddress: '',
        aadharCardNo: '',
        membershipDuration: '6 months', // Default value
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const {
        firstName,
        lastName,
        email,
        contactNumber,
        contactAddress,
        aadharCardNo,
        membershipDuration,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!firstName || !lastName || !email || !contactNumber || !contactAddress || !aadharCardNo) {
            setError('All fields are required.');
            return;
        }

        try {
            await api.post('/memberships', formData);
            setSuccess('Membership created successfully! The member can now log in with the default password "password123".');
            // Reset form
            setFormData({
                firstName: '', lastName: '', email: '', contactNumber: '',
                contactAddress: '', aadharCardNo: '', membershipDuration: '6 months'
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create membership.');
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Membership</h2>
            {error && <p className="error-msg">{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={firstName} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={lastName} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Email Address (for user login)</label>
                    <input type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" name="contactNumber" value={contactNumber} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Contact Address</label>
                    <input type="text" name="contactAddress" value={contactAddress} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Aadhar Card Number</label>
                    <input type="text" name="aadharCardNo" value={aadharCardNo} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Membership Duration</label>
                    <div>
                        <input type="radio" value="6 months" name="membershipDuration" checked={membershipDuration === '6 months'} onChange={onChange} /> 6 Months
                    </div>
                    <div>
                        <input type="radio" value="1 year" name="membershipDuration" checked={membershipDuration === '1 year'} onChange={onChange} /> 1 Year
                    </div>
                    <div>
                        <input type="radio" value="2 years" name="membershipDuration" checked={membershipDuration === '2 years'} onChange={onChange} /> 2 Years
                    </div>
                </div>
                <button type="submit" className="btn">Add Membership</button>
            </form>
        </div>
    );
};

export default AddMembershipPage;

