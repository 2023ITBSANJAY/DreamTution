import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaUserGraduate } from 'react-icons/fa';

export default function LoginSelection() {
    return (
        <div className="card" style={{ maxWidth: 800, margin: "40px auto", textAlign: 'center' }}>
            <h2 style={{ marginBottom: 40, color: "var(--text-main)" }}>Select Login Type</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {/* Admin Card */}
                <Link to="/login/admin" style={{ textDecoration: 'none' }}>
                    <div className="feature-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        height: '100%',
                        justifyContent: 'center'
                    }}>
                        <div className="feature-icon-wrapper" style={{ background: 'linear-gradient(135deg, #1e293b, #334155)' }}>
                            <FaUserShield />
                        </div>
                        <h3>Admin Login</h3>
                        <p>For tuition center administrators to manage students, fees, and complaints.</p>
                    </div>
                </Link>

                {/* Student Card */}
                <Link to="/login/student" style={{ textDecoration: 'none' }}>
                    <div className="feature-card" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                        height: '100%',
                        justifyContent: 'center'
                    }}>
                        <div className="feature-icon-wrapper" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                            <FaUserGraduate />
                        </div>
                        <h3>Student Login</h3>
                        <p>For students to view their payment history and submit complaints.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
