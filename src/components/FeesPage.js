import React, { useState } from "react";
import { FaDollarSign, FaCalendar, FaCheckCircle, FaTimesCircle, FaChartBar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { API_URL } from '../config';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function PaidPage() {
  const { user } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [payable, setPayable] = useState([]);
  const [nonPayable, setNonPayable] = useState([]);
  const [loading, setLoading] = useState(false);

  const isAdmin = user && user.role === 'admin';

  const handleMonthClick = async (month) => {
    setSelectedMonth(month);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/students-payment?month=${month}`);
      const data = await res.json();

      if (res.ok) {
        setPayable(data.payable);
        setNonPayable(data.nonPayable);
      } else {
        alert(data.message || "Error fetching data");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const totalStudents = payable.length + nonPayable.length;
  const paymentRate = totalStudents > 0 ? ((payable.length / totalStudents) * 100).toFixed(1) : 0;

  return (
    <div className="card" style={{ maxWidth: 1100, margin: "20px auto" }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: 30,
        color: "var(--text-main)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem"
      }}>
        <FaDollarSign style={{ color: "var(--primary-light)" }} /> Monthly Payment Status
      </h2>

      {/* Month Selection */}
      <div style={{ marginBottom: 30 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
          color: "var(--text-secondary)",
          fontSize: "0.95rem"
        }}>
          <FaCalendar />
          <span>Select a month to view payment details</span>
        </div>
        <div className="month-grid">
          {months.map((m) => (
            <button
              key={m}
              className={`month-btn ${selectedMonth === m ? "active" : ""}`}
              onClick={() => handleMonthClick(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{
          textAlign: "center",
          padding: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem"
        }}>
          <div style={{
            width: 40,
            height: 40,
            border: "3px solid rgba(99,102,241,0.2)",
            borderTop: "3px solid var(--primary)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
          }}></div>
          <span style={{ color: "var(--text-muted)" }}>Loading payment data...</span>
        </div>
      )}

      {/* STUDENT VIEW */}
      {!loading && selectedMonth && !isAdmin && (
        <div style={{ marginTop: 20 }}>
          <div style={{ textAlign: "center", padding: "2rem", background: "var(--bg-surface)", borderRadius: "12px", border: "1px solid var(--border)" }}>
            <h3>Status for {selectedMonth}</h3>

            {(() => {
              // Check if student is in the 'payable' (Paid) list
              // The API returns distinct objects, so we check by studentId or Name match logic
              // The API returns: { studentId: "...", studentName: "..." } in the lists.
              // Let's match by Name since that's what we have available from the API response structure easily,
              // BUT better to check ID if available. 
              // Wait, studentPayments.js returns { studentId: r.student.studentId, studentName: r.student.name } for payable.
              // For nonPayable it returns { studentId: s.studentId, studentName: s.name }

              const isPaid = payable.some(p => p.studentId === user.studentId);
              const isUnpaid = nonPayable.some(p => p.studentId === user.studentId);

              if (isPaid) {
                return (
                  <div style={{ color: "var(--success)", fontSize: "1.5rem", fontWeight: "bold", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <FaCheckCircle size={40} />
                    <span>Paid</span>
                  </div>
                );
              } else if (isUnpaid) {
                return (
                  <div style={{ color: "var(--danger)", fontSize: "1.5rem", fontWeight: "bold", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <FaTimesCircle size={40} />
                    <span>Unpaid</span>
                  </div>
                );
              } else {
                return <p>Status unavailable for this month.</p>;
              }
            })()}
          </div>
        </div>
      )}

      {/* ADMIN VIEW */}
      {!loading && selectedMonth && isAdmin && (
        <div style={{ marginTop: 20 }}>
          {/* Summary Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
            padding: "1.5rem",
            background: "var(--bg-input)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--success-light)" }}>
                {payable.length}
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Paid Students</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--danger)" }}>
                {nonPayable.length}
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Unpaid Students</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--accent-light)" }}>
                {totalStudents}
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Total Students</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary-light)" }}>
                {paymentRate}%
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Payment Rate</div>
            </div>
          </div>

          <h3 style={{
            textAlign: "center",
            marginBottom: 30,
            color: "var(--text-main)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem"
          }}>
            <FaChartBar /> {selectedMonth} Payment Summary
          </h3>

          <div className="payment-summary">
            {/* Payable List */}
            <div className="payment-box" style={{ borderLeft: "4px solid var(--success)" }}>
              <h4 style={{
                color: "var(--success-light)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <FaCheckCircle /> Paid Students
              </h4>
              {payable.length > 0 ? (
                <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
                  {payable.map((s, i) => (
                    <li key={i} style={{
                      padding: "0.875rem",
                      background: "var(--bg-surface)",
                      borderRadius: "var(--radius-sm)",
                      marginBottom: "0.5rem",
                      color: "var(--text-secondary)",
                      borderLeft: "3px solid var(--success)",
                      transition: "var(--transition-fast)",
                      cursor: "pointer"
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "var(--bg-elevated)";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "var(--bg-surface)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {s.studentName}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px dashed var(--border)"
                }}>
                  No paid students for this month
                </div>
              )}
            </div>

            {/* Non-Payable List */}
            <div className="payment-box" style={{ borderLeft: "4px solid var(--danger)" }}>
              <h4 style={{
                color: "var(--danger)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}>
                <FaTimesCircle /> Unpaid Students
              </h4>
              {nonPayable.length > 0 ? (
                <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
                  {nonPayable.map((s, i) => (
                    <li key={i} style={{
                      padding: "0.875rem",
                      background: "var(--bg-surface)",
                      borderRadius: "var(--radius-sm)",
                      marginBottom: "0.5rem",
                      color: "var(--text-secondary)",
                      borderLeft: "3px solid var(--danger)",
                      transition: "var(--transition-fast)",
                      cursor: "pointer"
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "var(--bg-elevated)";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "var(--bg-surface)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      {s.studentName}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                  background: "var(--bg-surface)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px dashed var(--border)"
                }}>
                  All students have paid for this month
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {!loading && !selectedMonth && (
        <div style={{
          textAlign: "center",
          padding: "4rem 2rem",
          color: "var(--text-muted)"
        }}>
          <FaCalendar style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }} />
          <p style={{ fontSize: "1.1rem" }}>Select a month to view payment status</p>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

