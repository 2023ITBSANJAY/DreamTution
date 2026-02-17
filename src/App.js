import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import { FaBars, FaTimes, FaGraduationCap, FaUserPlus, FaUsers, FaReceipt, FaDollarSign, FaHome, FaPhone, FaEnvelope, FaTag, FaUserCircle, FaSignOutAlt, FaInbox } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";

import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import ReceiptForm from "./components/ReceiptForm";
import FeesPage from "./components/FeesPage";
import LoginSelection from "./components/LoginSelection";
import AdminLogin from "./components/AdminLogin";
import AdminRegister from "./components/AdminRegister";
import StudentLogin from "./components/StudentLogin";
import StudentDashboard from "./components/StudentDashboard";
import AdminComplaints from "./components/AdminComplaints";
import FeatureDetails from "./components/FeatureDetails";

import "./App.css";
// import heroBg from "./assets/images/slider-1.png"; // Moved to HeroSlider
import HeroSlider from "./components/HeroSlider";

export default function App() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const isAdmin = user && user.role === 'admin';
  const isStudent = user && user.role === 'student';
  const [showDiscountToast, setShowDiscountToast] = useState(false);

  React.useEffect(() => {
    if (!isAdmin) {
      const timer = setTimeout(() => setShowDiscountToast(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAdmin]);

  return (
    <Router>
      <div className="app">
        {/* Top Header Bar */}
        <div className="top-header">
          <div className="top-header-container">
            <div className="top-header-left">
              <Link to="/" className="logo">
                <FaGraduationCap className="logo-icon" />
                <span className="logo-text">DREAM TUITION</span>
              </Link>
            </div>
            <div className="top-header-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {user ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontWeight: '500', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>Hi, {user.name}</span>
                  <button onClick={logout} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="auth-link">
                  <FaUserCircle style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="navbar-container">
            {/* Desktop Navigation */}
            <div className="navbar-links">
              <NavLink to="/" className="nav-link" onClick={closeDrawer}>HOME</NavLink>

              {isAdmin && (
                <>
                  <NavLink to="/students" className="nav-link" onClick={closeDrawer}>STUDENTS</NavLink>
                  <NavLink to="/add-student" className="nav-link" onClick={closeDrawer}>ADD STUDENT</NavLink>
                  <NavLink to="/receipt" className="nav-link" onClick={closeDrawer}>RECEIPT</NavLink>
                  <NavLink to="/fees" className="nav-link" onClick={closeDrawer}>FEES</NavLink>
                  <NavLink to="/admin-complaints" className="nav-link" onClick={closeDrawer}>COMPLAINTS</NavLink>
                </>
              )}

              {isStudent && (
                <NavLink to="/student-dashboard" className="nav-link" onClick={closeDrawer}>MY DASHBOARD</NavLink>
              )}
            </div>

            {/* Contact Banner */}
            <div className="contact-banner">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span className="contact-text">8110054961</span>
              </div>
              <div className="contact-divider" />
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span className="contact-text">dreamtuition@gmail.com</span>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="menu-toggle" onClick={toggleDrawer}>
              {drawerOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <div className={`drawer ${drawerOpen ? "open" : ""}`}>
          <div className="drawer-header">
            <div className="drawer-brand">
              <FaGraduationCap />
              <span>Dream Tuition</span>
            </div>
            <button className="drawer-close" onClick={closeDrawer}>
              <FaTimes />
            </button>
          </div>
          <div className="drawer-links">
            <NavLink to="/" onClick={closeDrawer}><FaHome /> Home</NavLink>

            {isAdmin && (
              <>
                <NavLink to="/students" onClick={closeDrawer}><FaUsers /> Students</NavLink>
                <NavLink to="/add-student" onClick={closeDrawer}><FaUserPlus /> Add Student</NavLink>
                <NavLink to="/receipt" onClick={closeDrawer}><FaReceipt /> Receipt</NavLink>
                <NavLink to="/fees" onClick={closeDrawer}><FaDollarSign /> Fees</NavLink>
                <NavLink to="/admin-complaints" onClick={closeDrawer}><FaInbox /> Complaints</NavLink>
              </>
            )}

            {isStudent && (
              <NavLink to="/student-dashboard" onClick={closeDrawer}><FaHome /> My Dashboard</NavLink>
            )}

            {!user && <Link to="/login" onClick={closeDrawer}><FaUserCircle /> Login</Link>}

            <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                <FaPhone style={{ color: 'var(--primary)' }} />
                <span>8110054961</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                <FaEnvelope style={{ color: 'var(--primary)' }} />
                <span>dreamtuition@gmail.com</span>
              </div>
            </div>

            {user && (
              <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', marginTop: 'auto' }}>
                <div style={{ marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                  Hi, {user.name}
                </div>
                <button
                  onClick={() => { logout(); closeDrawer(); }}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Overlay */}
        {drawerOpen && <div className="overlay" onClick={closeDrawer}></div>}

        {/* 🏷️ Discount Toast Alert */}
        {showDiscountToast && (
          <div className="discount-toast">
            <div className="toast-icon-wrapper">
              <FaTag />
            </div>
            <div className="toast-content">
              <div className="toast-tag">LIMITED OFFER</div>
              <h4>🎓 College Course Discounts!</h4>
              <p>Get <strong>25% OFF</strong> on all these courses:</p>

              <div className="course-scroll-container">
                <div className="course-chip">B.E / B.Tech</div>
                <div className="course-chip">BCA (Applications)</div>
                <div className="course-chip">B.Sc Computer Science</div>
                <div className="course-chip">B.Sc IT</div>
                <div className="course-chip">B.Sc Mathematics</div>
                <div className="course-chip">B.Com</div>
                <div className="course-chip">BBA</div>
                <div className="course-chip">BA (Eng/Tam/His/Eco)</div>
                <div className="course-chip">MBBS</div>
                <div className="course-chip">BDS</div>
                <div className="course-chip">B.Sc Nursing</div>
                <div className="course-chip">B.Pharm</div>
                <div className="course-chip">Allied Health Sciences</div>
                <div className="course-chip">LLB (Law)</div>
                <div className="course-chip">B.Arch</div>
                <div className="course-chip">B.Des</div>
                <div className="course-chip">Hotel Management</div>
                <div className="course-chip">Visual Communication</div>
                <div className="course-chip">Animation & Multimedia</div>
                <div className="course-chip">Agriculture (B.Sc Agri)</div>
                <div className="course-chip">Biotechnology</div>
                <div className="course-chip">Psychology</div>
                <div className="course-chip">Social Work (BSW)</div>
                <div className="course-chip">Aviation Courses</div>
                <div className="course-chip">Fashion Designing</div>
              </div>

              <Link to="/feature/student-management" className="toast-action" onClick={() => setShowDiscountToast(false)}>
                Claim Your Discount Now →
              </Link>
            </div>
            <button className="toast-close" onClick={() => setShowDiscountToast(false)} aria-label="Close">
              <FaTimes />
            </button>
          </div>
        )}

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feature/:id" element={<FeatureDetails />} />

            {/* Auth Routes */}
            <Route path="/login" element={!user ? <LoginSelection /> : <Navigate to="/" />} />
            <Route path="/login/admin" element={!user ? <AdminLogin /> : <Navigate to="/" />} />
            <Route path="/register/admin" element={!user ? <AdminRegister /> : <Navigate to="/" />} />
            <Route path="/login/student" element={!user ? <StudentLogin /> : <Navigate to="/" />} />

            {/* Protected Admin Routes */}
            <Route path="/add-student" element={isAdmin ? <AddStudent /> : <Navigate to="/login" />} />
            <Route path="/students" element={isAdmin ? <StudentList /> : <Navigate to="/login" />} />
            <Route path="/receipt" element={isAdmin ? <ReceiptForm /> : <Navigate to="/login" />} />
            <Route path="/fees" element={user ? <FeesPage /> : <Navigate to="/login" />} />
            <Route path="/admin-complaints" element={isAdmin ? <AdminComplaints /> : <Navigate to="/login" />} />

            {/* Protected Student Routes */}
            <Route path="/student-dashboard" element={isStudent ? <StudentDashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4><FaGraduationCap /> Dream Tuition</h4>
              <p>Excellence in education management</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>📍 Door No 50, 1st floor, Pachaiyapan Nagar</p>
              <p>1st street, Rakkiyapalayam pirvu</p>
              <p>Tiruppur - 641606</p>
              <p>📞 8110054961</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              {isAdmin && <Link to="/add-student">Add Student</Link>}
              {isAdmin && <Link to="/students">View Students</Link>}
              {isStudent && <Link to="/student-dashboard">My Dashboard</Link>}
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Dream Tuition. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function HomePage() {
  const { user } = useAuth();
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="homepage">
      {/* Hero Slider */}
      <HeroSlider user={user} isAdmin={isAdmin} />

      {/* Content Section */}
      <section className="content-section">
        <div className="container">
          <div className="section-header-center">
            <h2>Manage Your Tuition Like Never Before</h2>
            <p>Streamline student management, track fees effortlessly, and generate instant receipts</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaUserPlus />
              </div>
              <h3>Easy Student Management</h3>
              <p>Add, edit, and organize student records with a beautiful and intuitive interface.</p>
              <Link to="/feature/student-management" className="feature-link">Learn More →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaDollarSign />
              </div>
              <h3>Smart Fee Tracking</h3>
              <p>Monitor monthly payments and track pending dues with instant insights.</p>
              <Link to="/feature/smart-fees" className="feature-link">Learn More →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaReceipt />
              </div>
              <h3>Instant Receipts</h3>
              <p>Generate professional PDF receipts and email them to students instantly.</p>
              <Link to="/feature/instant-receipts" className="feature-link">Learn More →</Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <FaUsers />
              </div>
              <h3>Student Directory</h3>
              <p>Search, filter, and manage your complete student database with ease.</p>
              <Link to="/feature/student-directory" className="feature-link">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
