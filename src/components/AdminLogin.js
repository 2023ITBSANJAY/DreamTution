import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserShield, FaKey, FaSignInAlt } from 'react-icons/fa';
import { API_URL } from '../config';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/auth/login-admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                login({ ...data, role: 'admin' });
                navigate('/');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }
    };

    return (
        <div className="card" style={{ maxWidth: 450, margin: "60px auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <FaUserShield style={{ color: "var(--text-main)" }} /> Admin Login
            </h2>

            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@dream.com"
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                        <FaKey style={{ position: 'absolute', top: 12, left: 12, color: '#999' }} />
                        <input
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{ paddingLeft: 40 }}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                    <FaSignInAlt /> Login to Dashboard
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                New System Admin? <Link to="/register/admin" style={{ color: 'var(--primary)' }}>Register here</Link>
            </div>
        </div>
    );
}
