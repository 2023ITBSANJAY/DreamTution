import React, { useEffect, useState } from "react";
import { FaUsers, FaSearch, FaEdit, FaTrash, FaSave, FaTimes, FaEnvelope, FaPhone, FaIdBadge, FaLock } from "react-icons/fa";
import { API_URL } from '../config';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", mobile: "", password: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true); // Keep this here to show loading state on re-fetch
      const res = await fetch(`${API_URL}/students`);
      const data = await res.json();

      // Use real data directly
      setStudents(data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to load students"); // Keep the alert for user feedback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    const handler = () => fetchStudents();
    window.addEventListener("studentsChanged", handler);
    return () => window.removeEventListener("studentsChanged", handler);
  }, []);

  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchStudents();
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  const startEdit = (student) => {
    setEditingStudent(student._id);
    setEditData({
      name: student.name,
      email: student.email,
      mobile: student.mobile,
      password: ""
    });
  };

  const saveUpdate = async (id) => {
    try {
      const res = await fetch(`${API_URL}/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingStudent(null);
        fetchStudents();
      } else {
        alert(data.error || "Update failed");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  const cancelEdit = () => setEditingStudent(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card" style={{ maxWidth: 1000, margin: "20px auto" }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: 30,
        color: "var(--text-main)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem"
      }}>
        <FaUsers style={{ color: "var(--primary-light)" }} /> Student Directory
      </h2>

      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: 30 }}>
        <FaSearch style={{
          position: "absolute",
          left: "1rem",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
          fontSize: "1rem"
        }} />
        <input
          type="text"
          placeholder="Search by name, email, mobile, or ID (DT001)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
          style={{ paddingLeft: "2.75rem" }}
        />
      </div>

      {/* Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
        padding: "1.5rem",
        background: "var(--bg-input)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--primary-light)" }}>
            {students.length}
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Total Students</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", fontWeight: "800", color: "var(--accent-light)" }}>
            {filteredStudents.length}
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Search Results</div>
        </div>
      </div>

      {loading ? (
        <div style={{
          textAlign: "center",
          color: "var(--text-muted)",
          padding: 60,
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
          Loading students...
        </div>
      ) : filteredStudents.length === 0 ? (
        <div style={{
          textAlign: "center",
          color: "var(--text-muted)",
          padding: 60,
          background: "var(--bg-input)",
          borderRadius: "var(--radius-lg)",
          border: "1px dashed var(--border)"
        }}>
          <FaUsers style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }} />
          <div style={{ fontSize: "1.1rem" }}>No students found</div>
          <div style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}>
            {searchTerm ? "Try adjusting your search" : "Add your first student to get started"}
          </div>
        </div>
      ) : (
        <div className="student-grid">
          {filteredStudents.map((s) => (
            <div key={s._id} className="student-item">
              {editingStudent === s._id ? (
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
                  <input
                    type="text"
                    value={editData.name}
                    placeholder="Name"
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    placeholder="Email"
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="text"
                    value={editData.mobile}
                    placeholder="Mobile"
                    onChange={(e) => setEditData({ ...editData, mobile: e.target.value })}
                    className="input-field"
                  />
                  <div style={{ position: 'relative' }}>
                    <FaLock style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                      type="password"
                      value={editData.password}
                      placeholder="New Password (leave blank to keep current)"
                      onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                      className="input-field"
                      style={{ paddingLeft: '2.5rem' }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
                    <button
                      onClick={() => saveUpdate(s._id)}
                      className="btn-primary"
                      style={{
                        background: "linear-gradient(135deg, var(--success) 0%, var(--success-light) 100%)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.75rem 1.5rem"
                      }}
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="btn-secondary"
                      style={{
                        padding: "0.75rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}
                    >
                      <FaTimes /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="student-info">
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "1.25rem",
                        color: "var(--primary-dark)",
                        fontWeight: 700,
                        cursor: "pointer",
                        transition: "var(--transition)"
                      }}
                      onClick={() => setSelectedStudent(s)}
                      onMouseOver={(e) => e.currentTarget.style.color = "var(--primary)"}
                      onMouseOut={(e) => e.currentTarget.style.color = "var(--primary-dark)"}
                      title="View Details"
                    >
                      {s.name}
                    </h4>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <FaEnvelope style={{ color: "var(--text-muted)" }} />
                        {s.email}
                      </div>
                      {s.mobile && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <FaPhone style={{ color: "var(--text-muted)" }} />
                          {s.mobile}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="student-actions">
                    <button
                      onClick={() => startEdit(s)}
                      className="btn-icon"
                      title="Edit Student"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteStudent(s._id)}
                      className="btn-icon"
                      title="Delete Student"
                      style={{ borderColor: "var(--danger)" }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                        e.currentTarget.style.color = "var(--danger)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* 🚀 Premium Student Details Popup */}
      {selectedStudent && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedStudent(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1.5rem",
            animation: "fadeIn 0.3s ease"
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "28px",
              padding: "3rem",
              width: "100%",
              maxWidth: "500px",
              position: "relative",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              animation: "scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <button
              onClick={() => setSelectedStudent(null)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "var(--bg-input)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "var(--transition)",
                color: "var(--text-secondary)"
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "#fee2e2"}
              onMouseOut={(e) => e.currentTarget.style.background = "var(--bg-input)"}
            >
              <FaTimes />
            </button>

            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{
                width: "100px",
                height: "100px",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
                borderRadius: "32px",
                margin: "0 auto 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                color: "white",
                boxShadow: "0 10px 20px -5px rgba(124, 179, 66, 0.4)"
              }}>
                {selectedStudent.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: "2rem", fontWeight: "800", color: "var(--text-main)", marginBottom: "0.5rem" }}>
                {selectedStudent.name}
              </h3>
              <span className="student-badge" style={{ fontSize: "1rem", padding: "0.5rem 1rem" }}>
                <FaIdBadge style={{ marginRight: "0.5rem" }} />
                {selectedStudent.studentId}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1rem",
                background: "var(--bg-input)",
                borderRadius: "16px",
                border: "1px solid var(--border)"
              }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "white", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--primary)" }}>
                  <FaEnvelope />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "2px" }}>Email Address</div>
                  <div style={{ fontWeight: "600", color: "var(--text-main)" }}>{selectedStudent.email}</div>
                </div>
              </div>

              {selectedStudent.mobile && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  background: "var(--bg-input)",
                  borderRadius: "16px",
                  border: "1px solid var(--border)"
                }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "white", display: "flex", alignItems: "center", justifyCenter: "center", color: "var(--accent)" }}>
                    <FaPhone />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "2px" }}>Mobile Number</div>
                    <div style={{ fontWeight: "600", color: "var(--text-main)" }}>{selectedStudent.mobile}</div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
              <button
                className="btn-primary"
                onClick={() => setSelectedStudent(null)}
                style={{ width: "100%", padding: "1.25rem", fontSize: "1.1rem", borderRadius: "16px" }}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

