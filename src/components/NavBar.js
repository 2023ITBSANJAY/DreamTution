import React from "react";

export default function NavBar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar">
      <h2 className="navbar-title">🎓 Dream Tuition Center</h2>

      <div className="navbar-buttons">
        <button
          onClick={() => setCurrentPage("list")}
          className={`nav-btn ${currentPage === "list" ? "active" : ""}`}
        >
          Students List
        </button>
        <button
          onClick={() => setCurrentPage("add")}
          className={`nav-btn ${currentPage === "add" ? "active" : ""}`}
        >
          Add Student
        </button>
      </div>
    </nav>
  );
}
