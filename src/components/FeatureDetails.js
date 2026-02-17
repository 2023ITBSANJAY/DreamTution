import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUserPlus, FaDollarSign, FaReceipt, FaUsers, FaArrowLeft, FaLaptopCode, FaChalkboardTeacher, FaHeadset } from 'react-icons/fa';

export default function FeatureDetails() {
    const { id } = useParams();

    const features = {
        'student-management': {
            title: "Easy Student Management",
            icon: <FaUserPlus />,
            description: "Streamline your administrative tasks with our comprehensive student management system.",
            details: [
                "Add new students with detailed profiles including contact info and joining dates.",
                "Edit existing student records instantly.",
                "View complete academic and payment history in one place.",
                "Secure data storage ensures student information is always safe and accessible."
            ],
            color: "#10b981"
        },
        'smart-fees': {
            title: "Smart Fee Tracking",
            icon: <FaDollarSign />,
            description: "Never lose track of payments again with our intelligent fee monitoring system.",
            details: [
                "Dashboard overview of paid vs pending fees for the current month.",
                "Filter students by 'Payable' and 'Non-Payable' status.",
                "Visual indicators for payment status.",
                "Historical fee records for financial auditing."
            ],
            color: "#f59e0b"
        },
        'instant-receipts': {
            title: "Instant Receipts",
            icon: <FaReceipt />,
            description: "Generate professional, branded receipts in seconds and email them directly.",
            details: [
                "One-click PDF generation for tuition fees.",
                "Automatic email delivery to students.",
                "Customizable receipt templates with your center's branding.",
                "Digital signature support for authenticity."
            ],
            color: "#6366f1"
        },
        'student-directory': {
            title: "Student Directory",
            icon: <FaUsers />,
            description: "Access your entire student database with powerful search and filter tools.",
            details: [
                "Search students by Name or ID.",
                "Quick actions to Call or Email directly from the directory.",
                "Sortable lists for easy organization.",
                "Mobile-responsive view for access on the go."
            ],
            color: "#8b5cf6"
        },
        // NEW SERVICE PAGES
        'online-courses': {
            title: "World-Class Online Courses",
            icon: <FaLaptopCode />,
            description: "Access a library of high-quality courses designed to help you master new skills from anywhere.",
            details: [
                "Comprehensive curriculum covering Math, Science, and Languages.",
                "Self-paced learning modules with interactive quizzes.",
                "Downloadable study materials and cheat sheets.",
                "Certificate of completion for every course."
            ],
            color: "#3b82f6"
        },
        'amazing-teachers': {
            title: "Learn from Expert Teachers",
            icon: <FaChalkboardTeacher />,
            description: "Our instructors are industry experts with years of teaching experience.",
            details: [
                "Dedicated mentorship and 1-on-1 doubt clearing sessions.",
                "Live interactive classes with real-time Q&A.",
                "Personalized feedback on assignments and tests.",
                "Inspiring teaching methods that make learning fun."
            ],
            color: "#ef4444"
        },
        'great-support': {
            title: "24/7 Dedicated Support",
            icon: <FaHeadset />,
            description: "We are here to help you every step of the way with our round-the-clock support team.",
            details: [
                "Instant chat support for technical issues.",
                "Academic counseling anytime you feel stuck.",
                "Active community forums for peer-to-peer learning.",
                "Guaranteed response within 24 hours for email queries."
            ],
            color: "#84cc16"
        }
    };

    const feature = features[id];

    if (!feature) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Feature Not Found</h2>
                <Link to="/" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Go Home</Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', textDecoration: 'none', color: 'var(--text-secondary)' }}>
                <FaArrowLeft /> Back to Home
            </Link>

            <div className="card" style={{ maxWidth: '900px', margin: '0 auto', overflow: 'hidden' }}>
                <div style={{
                    background: `linear-gradient(135deg, ${feature.color}, #1f2937)`,
                    padding: '3rem 2rem',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.9 }}>
                        {feature.icon}
                    </div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.title}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                        {feature.description}
                    </p>
                </div>

                <div style={{ padding: '3rem' }}>
                    <h3 style={{ borderBottom: '2px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Key Features & Benefits
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {feature.details.map((detail, index) => (
                            <div key={index} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{
                                    background: `${feature.color}20`,
                                    color: feature.color,
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                }}>
                                    {index + 1}
                                </div>
                                <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{detail}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <Link to="/login" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                            Get Started Now
                        </Link>
                    </div>

                    {id === 'student-management' && (
                        <div className="course-discount-section">
                            <div className="discount-header">
                                <div className="discount-badge">SPECIAL OFFER</div>
                                <h2>🎓 Pre-KG to 12th Class All Courses</h2>
                                <p>Enroll now and get a flat <strong>25% DISCOUNT</strong> on tuition fees for all these classes!</p>
                            </div>

                            <div className="course-grid">
                                {[
                                    "Pre-KG / LKG / UKG", "1st to 5th Class", "6th to 8th Class",
                                    "9th Class", "10th Class (SSLC)", "11th Class", "12th Class (HSC)",
                                    "CBSE All Classes", "ICSE All Classes", "State Board All Classes",
                                    "Hindi Prachar Sabha", "Abacus & Vedic Maths", "Handwriting & Calligraphy"
                                ].map((course, idx) => (
                                    <div key={idx} className="course-item-card">
                                        <div className="course-disc-badge">25% OFF</div>
                                        <span>{course}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
