import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';

const ReportsPage = () => {
    const { reportType } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError('');
            let url = '';
            let reportTitle = '';

            switch (reportType) {
                case 'books':
                    url = '/books';
                    reportTitle = 'Master List of Books';
                    break;
                case 'movies':
                    url = '/books?type=Movie'; // Filter books by type
                    reportTitle = 'Master List of Movies';
                    break;
                case 'memberships':
                    url = '/memberships';
                    reportTitle = 'Master List of Memberships';
                    break;
                case 'active-issues':
                    url = '/transactions/active';
                    reportTitle = 'Active Issues';
                    break;
                case 'overdue':
                    url = '/transactions/overdue';
                    reportTitle = 'Overdue Returns';
                    break;
                case 'issue-requests':
                    // Note: This endpoint is a placeholder and would need to be created on the backend.
                    // For now, it will likely show "No data available".
                    url = '/transactions/requests'; 
                    reportTitle = 'Pending Issue Requests';
                    break;
                default:
                    setError('Invalid report type.');
                    setLoading(false);
                    return;
            }
            setTitle(reportTitle);

            try {
                const res = await api.get(url);
                setData(res.data.data);
            } catch (err) {
                 // Gracefully handle cases where the endpoint doesn't exist yet
                if (err.response && err.response.status === 404) {
                    setData([]);
                } else {
                    setError('Failed to fetch report data.');
                }
            }
            setLoading(false);
        };

        fetchData();
    }, [reportType]);

    const renderTable = () => {
        if (!data || data.length === 0) return <p>No data available for this report.</p>;

        switch (reportType) {
            case 'books':
            case 'movies':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>Serial No</th>
                                <th>Name</th>
                                <th>Author/Director</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Cost</th>
                                <th>Procurement Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item._id}>
                                    <td>{item.serialNumber}</td>
                                    <td>{item.name}</td>
                                    <td>{item.author}</td>
                                    <td>{item.category}</td>
                                    <td>{item.status}</td>
                                    <td>${item.cost?.toFixed(2)}</td>
                                    <td>{new Date(item.procurementDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'memberships':
                return (
                     <table>
                        <thead>
                            <tr>
                                <th>Membership ID</th>
                                <th>Name</th>
                                <th>Contact No.</th>
                                <th>Address</th>
                                <th>Aadhar No.</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item._id}>
                                    <td>{item.membershipId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.contactNumber}</td>
                                    <td>{item.contactAddress}</td>
                                    <td>{item.aadharCardNo}</td>
                                    <td>{new Date(item.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(item.endDate).toLocaleDateString()}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'active-issues':
            case 'overdue':
                return (
                    <table>
                        <thead>
                            <tr>
                                <th>Book Name</th>
                                <th>Serial Number</th>
                                <th>User Name</th>
                                <th>Issue Date</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item._id}>
                                    <td>{item.book.name}</td>
                                    <td>{item.book.serialNumber}</td>
                                    <td>{item.user.name}</td>
                                    <td>{new Date(item.issueDate).toLocaleDateString()}</td>
                                    <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'issue-requests':
                 return (
                    <table>
                        <thead>
                            <tr>
                                <th>Membership ID</th>
                                <th>Book/Movie Name</th>
                                <th>Requested Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                         <tbody>
                            {/* This is a placeholder structure for when the backend is implemented */}
                            {data.map(item => (
                                <tr key={item._id}>
                                    <td>{item.user.name}</td>
                                    <td>{item.book.name}</td>
                                    <td>{new Date(item.requestDate).toLocaleDateString()}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Reports</h2>
            <div style={{ marginBottom: '20px' }}>
                <Link to="/reports/books">Books</Link> |{' '}
                <Link to="/reports/movies">Movies</Link> |{' '}
                <Link to="/reports/memberships">Memberships</Link> |{' '}
                <Link to="/reports/active-issues">Active Issues</Link> |{' '}
                <Link to="/reports/overdue">Overdue Returns</Link> |{' '}
                <Link to="/reports/issue-requests">Issue Requests</Link>
            </div>
            <h3>{title}</h3>
            {loading ? <p>Loading...</p> : error ? <p className="error-msg">{error}</p> : renderTable()}
        </div>
    );
};

export default ReportsPage;

