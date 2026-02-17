import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserPlus, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { API_URL } from '../config';

export default function AdminRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/auth/register-admin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await res.json();
            if (res.ok) {
                alert("Admin Registered Successfully! Please login.");
                navigate('/login/admin');
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            alert("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card" style={{ maxWidth: 450, margin: "60px auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <FaUserPlus style={{ color: "var(--primary)" }} /> Admin Registration
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                    <label>Full Name</label>
                    <div style={{ position: 'relative' }}>
                        <FaUser style={{ position: 'absolute', top: 12, left: 12, color: '#999' }} />
                        <input
                            type="text"
                            className="input-field"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="John Doe"
                            style={{ paddingLeft: 40 }}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label>Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <FaEnvelope style={{ position: 'absolute', top: 12, left: 12, color: '#999' }} />
                        <input
                            type="email"
                            className="input-field"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="admin@dream.com"
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
                            type="password"
                            className="input-field"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            style={{ paddingLeft: 40 }}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label>Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                        <FaLock style={{ position: 'absolute', top: 12, left: 12, color: '#999' }} />
                        <input
                            type="password"
                            className="input-field"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="••••••••"
                            style={{ paddingLeft: 40 }}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }} disabled={loading}>
                    {loading ? 'Registering...' : 'Register as Admin'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                Already have an account? <Link to="/login/admin">Login here</Link>
            </div>
        </div>
    );
}
