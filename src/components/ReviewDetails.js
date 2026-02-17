import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaQuoteLeft, FaArrowLeft } from 'react-icons/fa';

export const reviews = [
    {
        id: 1,
        name: "Sanjay Kumar",
        role: "Class XII Student",
        video: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-laptop-34440-large.mp4",
        poster: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200",
        quote: "The coaching here is exceptional. I've improved my math skills significantly in just three months! The teachers provide personalized attention to every student.",
        extendedStory: "Joining Dream Tuition was the best decision for my board exam preparation. The way they explain complex calculus and physics concepts is incredibly intuitive. I went from a 70% average to consistently scoring above 90% in my practice tests."
    },
    {
        id: 2,
        name: "Priya Dharshini",
        role: "Class X Student",
        video: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-on-a-laptop-outside-42173-large.mp4",
        poster: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200",
        quote: "The management system makes it so easy to track my fees and download receipts instantly. Transparent and efficient!",
        extendedStory: "As a student, I value transparency. Dream Tuition's app helps me stay updated with my attendance and payment history. My parents are also very happy as they get instant SMS notifications for every fee payment."
    },
    {
        id: 3,
        name: "Anish Raj",
        role: "College Student",
        video: "https://assets.mixkit.co/videos/preview/mixkit-student-sitting-with-a-laptop-in-a-library-42171-large.mp4",
        poster: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1200",
        quote: "I love the learning environment and the teachers are very supportive and knowledgeable. Best place for advanced learning.",
        extendedStory: "I'm currently taking advanced programming and math courses here. The practical approach to learning and the 24/7 support for doubt clearing are what set Dream Tuition apart from other coaching centers in the city."
    }
];

export default function ReviewDetails() {
    const { id } = useParams();
    const review = reviews.find(r => r.id === parseInt(id));

    if (!review) {
        return (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
                <h2>Review Not Found</h2>
                <Link to="/" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Go Home</Link>
            </div>
        );
    }

    return (
        <div className="review-details-page">
            <div className="container" style={{ padding: '4rem 1rem' }}>
                <Link to="/" className="back-link">
                    <FaArrowLeft /> Back to Success Stories
                </Link>

                <div className="review-main-card">
                    <div className="video-hero-section">
                        <video
                            controls
                            autoPlay
                            className="main-review-video"
                            poster={review.poster}
                        >
                            <source src={review.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="video-overlay-info">
                            <span className="success-tag">Success Story #{review.id}</span>
                        </div>
                    </div>

                    <div className="review-story-content">
                        <div className="story-header">
                            <div className="reviewer-meta">
                                <h1>{review.name}</h1>
                                <span className="student-role">{review.role}</span>
                                <div className="rating-stars">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                            </div>
                            <FaQuoteLeft className="story-quote-icon" />
                        </div>

                        <div className="story-text">
                            <p className="highlight-quote">"{review.quote}"</p>
                            <div className="extended-story">
                                <h3>The Journey</h3>
                                <p>{review.extendedStory}</p>
                            </div>
                        </div>

                        <div className="cta-section">
                            <h3>Ready to start your success story?</h3>
                            <Link to="/login" className="btn-primary">Enroll Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
