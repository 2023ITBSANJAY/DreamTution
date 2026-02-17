import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import { FaBars, FaTimes, FaGraduationCap, FaUserPlus, FaUsers, FaReceipt, FaDollarSign, FaHome, FaPhone, FaEnvelope, FaTag, FaUserCircle, FaSignOutAlt, FaInbox, FaPlayCircle, FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
import ReviewDetails, { reviews as reviewData } from "./components/ReviewDetails";

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
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaEnvelope style={{ color: 'var(--primary)' }} />
                  <span>dreamtuition@gmail.com</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FaPhone style={{ color: 'var(--primary)' }} />
                  <span>8110054961</span>
                </div>
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
              <h4>🎓 Pre-KG to 12th Class All Courses!</h4>
              <p>Enroll now and get a flat <strong>25% DISCOUNT</strong> on tuition fees!</p>

              <div className="course-scroll-container">
                <div className="course-chip">Pre-KG / LKG / UKG</div>
                <div className="course-chip">1st to 5th Class</div>
                <div className="course-chip">6th to 8th Class</div>
                <div className="course-chip">9th Class</div>
                <div className="course-chip">10th Class (SSLC)</div>
                <div className="course-chip">11th Class</div>
                <div className="course-chip">12th Class (HSC)</div>
                <div className="course-chip">CBSE All Classes</div>
                <div className="course-chip">ICSE All Classes</div>
                <div className="course-chip">State Board All Classes</div>
                <div className="course-chip">Hindi Prachar Sabha</div>
                <div className="course-chip">Abacus & Vedic Maths</div>
                <div className="course-chip">Handwriting & Calligraphy</div>
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
            <Route path="/review/:id" element={<ReviewDetails />} />

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

  // --- 🎠 Review Carousel Logic ---
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const reviews = reviewData;

  const nextSlide = React.useCallback(() => setCurrentSlide((prev) => (prev + 1) % reviews.length), [reviews.length]);
  const prevSlide = React.useCallback(() => setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length), [reviews.length]);

  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

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

      {/* 📹 Student Reviews Section (Success Stories) */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header-center">
            <div className="section-tag">SUCCESS STORIES</div>
            <h2>Our Students, Our Pride</h2>
            <p>Experience the impact of Dream Tuition through those who've lived it.</p>
          </div>

          <div
            className="carousel-wrapper"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="carousel-track-container">
              <div
                className="carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {reviews.map((review) => (
                  <div key={review.id} className="carousel-slide">
                    <Link to={`/review/${review.id}`} className="review-card-link">
                      <div className="review-card featured-video">
                        <div className="video-container">
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={review.poster}
                            className="autoplay-video"
                          >
                            <source src={review.video} type="video/mp4" />
                          </video>
                          <div className="review-overlay-play">
                            <FaPlayCircle />
                            <span>Full Story</span>
                          </div>
                        </div>
                        <div className="review-content">
                          <div className="rating">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                          </div>
                          <FaQuoteLeft className="quote-icon" />
                          <p>"{review.quote}"</p>
                          <div className="reviewer-info">
                            <strong>{review.name}</strong>
                            <span>{review.role}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous slide">
              <FaChevronLeft />
            </button>
            <button className="carousel-btn next" onClick={nextSlide} aria-label="Next slide">
              <FaChevronRight />
            </button>

            {/* Pagination Dots */}
            <div className="carousel-dots">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
