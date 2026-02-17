import React, { useState } from 'react';
// No navigation imports needed
import { FaUser, FaEnvelope, FaPhone, FaUserPlus, FaCheckCircle } from 'react-icons/fa';
import { API_URL } from '../config';

// Local Assets
import boyGif from '../assets/boy.gif';
import girlGif from '../assets/gril.gif';

export default function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert('Please fill all required fields');

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setName('');
        setEmail('');
        setMobile('');
        window.dispatchEvent(new Event('studentsChanged'));
      } else {
        alert(data.error || 'Error adding student');
      }
    } catch (err) {
      alert('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-page">
      <div className="side-illustration left-side real-img">
        <img src={boyGif} alt="Boy Student" />
      </div>

      <div className="add-student-card" style={{ maxWidth: 580, width: '100%', margin: "20px auto", position: 'relative', zIndex: 2 }}>
        <h2>
          <FaUserPlus style={{ color: "var(--primary)" }} /> Add New Student
        </h2>

        {success && (
          <div style={{
            padding: "1rem",
            background: "rgba(16, 185, 129, 0.1)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "var(--radius-md)",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            color: "var(--success-light)",
            animation: "slideUp 0.3s ease"
          }}>
            <FaCheckCircle /> Student added successfully!
          </div>
        )}

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column" }}>
          <div className="form-group">
            <label>
              <FaUser /> Full Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter student's full name"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>
              <FaEnvelope /> Email Address *
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="student@example.com"
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>
              <FaPhone /> Mobile Number
            </label>
            <input
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="input-field"
              type="tel"
            />
          </div>

          <div className="form-note">
            <strong>Note:</strong> The default password will be the generated <strong>Student ID</strong> (e.g., DT001).
          </div>

          <div style={{ marginTop: 24 }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                padding: "1.25rem",
                fontSize: "1.1rem",
                justifyContent: "center"
              }}
            >
              {loading ? (
                <>
                  <div className="spinner"></div> Saving...
                </>
              ) : (
                <>
                  <FaUserPlus /> Add Student
                </>
              )}
            </button>
          </div>
        </form>

        <style>{`
          .spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      <div className="side-illustration right-side real-img">
        <img src={girlGif} alt="Girl Student" />
      </div>
    </div>
  );
}

