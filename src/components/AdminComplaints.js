import React, { useState, useEffect } from 'react';
import { FaInbox, FaReply, FaCheck, FaPaperPlane } from 'react-icons/fa';
import { API_URL } from '../config';

export default function AdminComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [activeReplyId, setActiveReplyId] = useState(null);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const res = await fetch(`${API_URL}/complaints`);
            const data = await res.json();
            setComplaints(data);
        } catch (err) {
            console.error(err);
        }
    };

    const sendReply = async (id) => {
        if (!replyText.trim()) return;

        try {
            const res = await fetch(`${API_URL}/complaints/${id}/reply`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reply: replyText })
            });

            if (res.ok) {
                setReplyText('');
                setActiveReplyId(null);
                fetchComplaints();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="card" style={{ maxWidth: 1000, margin: '20px auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <FaInbox style={{ color: 'var(--primary-light)' }} /> Student Complaints
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {complaints.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No complaints found.</p>
                ) : (
                    complaints.map(c => (
                        <div key={c._id} className="student-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <h4 style={{ margin: 0, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>From:</span>
                                        {c.studentName}
                                    </h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>To: Admin</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(c.date).toLocaleString()}</span>
                                    </div>
                                </div>
                                <span className={`student-badge`} style={{
                                    background: c.status === 'Replied' ? 'var(--success-light)' : '#fef3c7',
                                    color: c.status === 'Replied' ? 'var(--success)' : '#d97706',
                                    borderColor: c.status === 'Replied' ? 'var(--success)' : '#d97706'
                                }}>
                                    {c.status}
                                </span>
                            </div>

                            <div style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                                {c.message}
                            </div>

                            {c.status === 'Pending' ? (
                                <div>
                                    {activeReplyId === c._id ? (
                                        <div style={{ marginTop: '1rem' }}>
                                            <textarea
                                                className="input-field"
                                                rows="3"
                                                placeholder="Type your reply here..."
                                                value={replyText}
                                                onChange={(e) => setReplyText(e.target.value)}
                                                autoFocus
                                                style={{ marginBottom: '0.5rem' }}
                                            />
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="btn-primary" onClick={() => sendReply(c._id)}>
                                                    <FaPaperPlane style={{ marginRight: '5px' }} /> Send Reply
                                                </button>
                                                <button className="btn-secondary" onClick={() => setActiveReplyId(null)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button className="btn-primary" onClick={() => setActiveReplyId(c._id)}>
                                            <FaReply style={{ marginRight: '5px' }} /> Reply
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
                                    <strong style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                                        <FaCheck /> Reply From: Admin:
                                    </strong>
                                    {c.reply}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


