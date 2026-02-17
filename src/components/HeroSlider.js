import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './HeroSlider.css';

// Import images
import slider1 from '../assets/images/slider-1.png'; // Make sure this path corresponds to your actual asset
// Fallback/Secondary image
const slider2 = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600";
const slider3 = "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600";

const slides = [
    {
        image: slider1,
        subtitle: "All the courses you need",
        title: "Welcome to our",
        highlight: "Dream Tuition",
        cta: "Get Started",
        link: "/login"
    },
    {
        image: slider2,
        subtitle: "Learn from the Best",
        title: "Expert Teachers for",
        highlight: "Bright Futures",
        cta: "View Courses",
        link: "/feature/online-courses"
    },
    {
        image: slider3,
        subtitle: "Anytime, Anywhere",
        title: "Education that",
        highlight: "Fits Your Life",
        cta: "Join Now",
        link: "/register/student"
    }
];

const HeroSlider = ({ user, isAdmin }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    // Auto-play
    useEffect(() => {
        const interval = setInterval(() => {
            prevSlide(); // Using prevSlide/nextSlide logic is fine if we use functional updates or move them in
            // But actually let's just use the direct logic to avoid extra dependencies
            setCurrent(prev => (prev === length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [length]);

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    // Determine dynamic CTA link based on user status (replaces the static data link if needed)
    const getLink = (slide) => {
        if (slide.link === "/login") {
            return user ? "/student-dashboard" : "/login";
        }
        if (isAdmin && slide.link === "/register/student") {
            return "/add-student";
        }
        return slide.link;
    };

    const getCtaText = (slide) => {
        if (slide.link === "/login" && user) return "Go to Dashboard";
        return slide.cta;
    }

    return (
        <div className="hero-slider">
            <div className="slider-arrow left" onClick={prevSlide}>
                <FaArrowLeft />
            </div>
            <div className="slider-arrow right" onClick={nextSlide}>
                <FaArrowRight />
            </div>

            {slides.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={index}
                    >
                        {index === current && (
                            <>
                                <div
                                    className="slide-image"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                />
                                <div className="slide-overlay"></div>

                                <div className="slide-content">
                                    <p className="hero-subtitle">{slide.subtitle}</p>
                                    <h1 className="hero-title">
                                        {slide.title}<br />
                                        <span className="highlight">{slide.highlight}</span>
                                    </h1>
                                    <Link to={getLink(slide)} className="btn-hero-slider">
                                        {getCtaText(slide)}
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                );
            })}

            <div className="slider-dots">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={index === current ? 'dot active' : 'dot'}
                        onClick={() => setCurrent(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
