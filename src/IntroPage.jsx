import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";

const slides = [
  {
    id: 1,
    title: "Welcome to Vectis",
    description: "You have 20 years to build your wealth!",
  },
  {
    id: 2,
    title: "Invest Wisely",
    description: "Choose the right financial products.",
  },
  {
    id: 3,
    title: "Watch Your Growth",
    description: "Track your investments over time.",
  },
  {
    id: 4,
    title: "Stay Consistent",
    description: "Regular investing leads to great returns.",
  },
  {
    id: 5,
    title: "Learn From Mistakes",
    description: "Bad decisions teach valuable lessons.",
  },
  {
    id: 6,
    title: "Optimize Your Portfolio",
    description: "Diversify to minimize risk.",
  },
  {
    id: 7,
    title: "Start Your Journey",
    description: "Let's begin building your future!",
  },
];

const IntroPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/Layout"); // Redirect to layout page
    }
  };

  return (
    <div className="intro-container">
      <div className="slide">
        <h1>{slides[currentSlide].title}</h1>
        <p>{slides[currentSlide].description}</p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
        <button className="next-button" onClick={handleNext}>
          {currentSlide === slides.length - 1 ? "Start" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
