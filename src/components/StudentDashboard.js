import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaMoneyBillWave, FaCommentMedical, FaHistory, FaCheckCircle, FaTimesCircle, FaPaperPlane, FaFileDownload } from 'react-icons/fa';
import { API_URL, MAIL_URL } from '../config';

export default function StudentDashboard() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('payments');

    return (
        <div className="container">
            <div className="section-header-center">
                <h2>Welcome, {user.name}</h2>
                <p>Access your tuition records and support</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    className={`btn ${activeTab === 'payments' ? 'primary' : ''}`}
                    onClick={() => setActiveTab('payments')}
                >
                    <FaMoneyBillWave /> My Payments
                </button>
                <button
                    className={`btn ${activeTab === 'complaints' ? 'primary' : ''}`}
                    onClick={() => setActiveTab('complaints')}
                >
                    <FaCommentMedical /> My Complaints
                </button>
            </div>

            {activeTab === 'payments' ? <MyPayments studentId={user._id} /> : <MyComplaints />}
        </div>
    );
}

function MyPayments({ studentId }) {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await fetch(`${API_URL}/student-history/${studentId}`);
                if (res.ok) {
                    const data = await res.json();
                    setPayments(data);
                } else {
                    console.error("Fetch failed:", res.status, res.statusText);
                }
            } catch (err) {
                console.error("Error fetching payments", err);
            } finally {
                setLoading(false);
            }
        };

        if (studentId) {
            fetchPayments();
        }
    }, [studentId]);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                <div style={{
                    width: 40, height: 40, margin: '0 auto 1rem',
                    border: "3px solid rgba(99,102,241,0.2)", borderTop: "3px solid var(--primary)",
                    borderRadius: "50%", animation: "spin 0.8s linear infinite"
                }}></div>
                Loading history...
            </div>
        );
    }

    if (payments.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <FaHistory style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '1rem' }} />
                <h3>No Payment History</h3>
                <p className="muted">You haven't made any payments yet.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3><FaHistory /> Payment History</h3>
            <div className="table-responsive" style={{ marginTop: '1rem' }}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Month</th>
                            <th style={{ textAlign: 'right' }}>Amount</th>
                            <th style={{ textAlign: 'center' }}>Status</th>
                            <th style={{ textAlign: 'center' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p._id}>
                                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                                <td style={{ fontWeight: '500' }}>{p.month}</td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold' }}>₹{p.amount}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <span style={{
                                        background: 'var(--success-light)',
                                        color: 'var(--success)',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}>
                                        <FaCheckCircle size={12} /> Paid
                                    </span>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <button
                                        onClick={() => window.open(`${MAIL_URL}/receipts/${p._id}/download`, '_blank')}
                                        className="btn-secondary"
                                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                                    >
                                        <FaFileDownload /> Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .table th, .table td {
                    padding: 1rem;
                    text-align: left;
                    border-bottom: 1px solid var(--border);
                }
                .table th {
                    font-weight: 600;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                }
                .table tr:last-child td {
                    border-bottom: none;
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

function MyComplaints() {
    const { user } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const res = await fetch(`${API_URL}/complaints/student/${user._id}`);
            const data = await res.json();
            setComplaints(data);
        } catch (err) {
            console.error(err);
        }
    };

    const submitComplaint = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/complaints`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: user._id,
                    studentName: user.name,
                    message
                })
            });
            if (res.ok) {
                setMessage('');
                fetchComplaints();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {/* Submit Form */}
            <div className="card" style={{ marginBottom: '2rem' }}>
                <h3><FaPaperPlane /> Submit a New Complaint</h3>
                <form onSubmit={submitComplaint} style={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginTop: '1rem' }}>
                    <textarea
                        className="input-field"
                        rows="4"
                        placeholder="Describe your issue..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button className="btn-primary" disabled={loading} style={{ alignSelf: 'flex-end' }}>
                        {loading ? 'Submitting...' : 'Submit Complaint'}
                    </button>
                </form>
            </div>

            {/* History */}
            <div className="card">
                <h3><FaHistory /> Complaint History</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {complaints.length === 0 ? (
                        <p className="muted">No complaints submitted yet.</p>
                    ) : (
                        complaints.map(c => (
                            <div key={c._id} style={{
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                padding: '1rem',
                                background: 'var(--bg-surface)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                                    <div>
                                        <div style={{ fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>From:</span> Me
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>To: Admin</span>
                                            <span>•</span>
                                            <span>{new Date(c.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <span style={{
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        background: c.status === 'Replied' ? 'var(--success-light)' : '#fef3c7',
                                        color: c.status === 'Replied' ? 'var(--success)' : '#d97706',
                                        border: `1px solid ${c.status === 'Replied' ? 'var(--success)' : '#d97706'}`
                                    }}>
                                        {c.status}
                                    </span>
                                </div>
                                <p style={{ margin: '0 0 1rem 0' }}>{c.message}</p>

                                {c.reply && (
                                    <div style={{
                                        marginTop: '1rem',
                                        padding: '1rem',
                                        background: 'white',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid var(--primary)'
                                    }}>
                                        <strong style={{ display: 'block', color: 'var(--primary)', marginBottom: '0.25rem' }}>Reply From: Admin:</strong>
                                        {c.reply}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
