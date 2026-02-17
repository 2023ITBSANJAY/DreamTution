import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserGraduate, FaIdCard, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { API_URL } from '../config';

export default function StudentLogin() {
    const [studentId, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    // Ensure clean session on load
    useEffect(() => {
        logout();
    }, [logout]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/login-student`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId, password })
            });
            const data = await res.json();

            if (res.ok) {
                login({ ...data, role: 'student' });
                navigate('/student-dashboard');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ maxWidth: 450, margin: "60px auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <FaUserGraduate style={{ color: "var(--primary)" }} /> Student Login
            </h2>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                    <label>Student ID</label>
                    <div style={{ position: 'relative' }}>
                        <FaIdCard style={{ position: 'absolute', top: 12, left: 12, color: '#999' }} />
                        <input
                            type="text"
                            className="input-field"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value.toUpperCase())}
                            placeholder="e.g. DT001"
                            style={{ paddingLeft: 40 }}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                        <FaLock style={{ position: 'absolute', top: 12, left: 12, color: '#999' }} />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ paddingLeft: 40, paddingRight: 40 }}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: 12,
                                top: 12,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#999',
                                fontSize: '1rem'
                            }}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }} disabled={loading}>
                    <FaSignInAlt /> {loading ? 'Logging in...' : 'Access Student Portal'}
                </button>
            </form>
        </div>
    );
}
