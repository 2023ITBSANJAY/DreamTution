import React, { useEffect, useState } from "react";
import { FaReceipt, FaUser, FaCalendar, FaDollarSign, FaPen, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { API_URL, MAIL_URL } from '../config';

export default function ReceiptForm() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [receiverSignature, setReceiverSignature] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_URL}/students`);
      const data = await res.json();
      setStudents(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
    const handler = () => fetchStudents();
    window.addEventListener("studentsChanged", handler);
    return () => window.removeEventListener("studentsChanged", handler);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!studentId) return alert("Select a student");
    if (!month) return alert("Select a month");
    if (!amount || Number(amount) <= 0) return alert("Enter valid amount");

    setSending(true);
    try {
      const res = await fetch(`${MAIL_URL}/receipts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          month,
          amount: Number(amount),
          receiverSignature,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert("Error: " + (data.error || res.statusText));
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setMonth("");
        setAmount("");
        setReceiverSignature("");
      }
    } catch (err) {
      console.error(err);
      alert("Network error: " + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 650, margin: "20px auto" }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: 30,
        color: "var(--text-main)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem"
      }}>
        <FaReceipt style={{ color: "var(--primary-light)" }} /> Create & Email Receipt
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
          <FaCheckCircle /> Receipt created and emailed successfully!
        </div>
      )}

      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Student Dropdown */}
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: 8,
            fontWeight: 500,
            color: "var(--text-secondary)"
          }}>
            <FaUser /> Select Student *
          </label>
          <select
            required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="input-field"
          >
            <option value="">-- Choose a student --</option>
            {students.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} — {s.email}
              </option>
            ))}
          </select>
        </div>

        {/* Month Dropdown */}
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: 8,
            fontWeight: 500,
            color: "var(--text-secondary)"
          }}>
            <FaCalendar /> Payment Month *
          </label>
          <select
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input-field"
          >
            <option value="">-- Select a month --</option>
            {months.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: 8,
            fontWeight: 500,
            color: "var(--text-secondary)"
          }}>
            <FaDollarSign /> Fee Amount (₹) *
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter fee amount"
            className="input-field"
          />
        </div>

        {/* Receiver signature */}
        <div>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: 8,
            fontWeight: 500,
            color: "var(--text-secondary)"
          }}>
            <FaPen /> Receiver Signature
          </label>
          <input
            type="text"
            value={receiverSignature}
            onChange={(e) => setReceiverSignature(e.target.value)}
            placeholder="Authorized person name (optional)"
            className="input-field"
          />
        </div>

        {/* Button */}
        <div style={{ marginTop: 20 }}>
          <button
            type="submit"
            className="btn-primary"
            disabled={sending}
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1.05rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem"
            }}
          >
            {sending ? (
              <>
                <div style={{
                  width: 16,
                  height: 16,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite"
                }}></div>
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane /> Create & Email Receipt
              </>
            )}
          </button>
        </div>
      </form>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

