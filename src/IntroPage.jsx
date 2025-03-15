import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./IntroPage.css";

const slides = [
  { 
    id: 1, 
    title: "Start Your Financial Journey", 
    description: "You begin with a steady income. Your goal? Grow your wealth over 20 years through smart investments." 
  },
  { 
    id: 2, 
    title: "The Path to Wealth", 
    description: "There are 7 types of investments. Each unlocks as you gain experience and invest wisely." 
  },
  { 
    id: 3, 
    title: "Level Up Your Investments", 
    description: "Your early investments determine what opportunities open up. Strong choices unlock higher-reward options." 
  },
  { 
    id: 4, 
    title: "Risk vs Reward", 
    description: "Not all investments are equal. Some offer stability, others high rewards with higher risks." 
  },
  { 
    id: 5, 
    title: "Strategize and Adapt", 
    description: "Each investment type will be explained before you make a choice. Adapt to market conditions to stay ahead." 
  },
  { 
    id: 6, 
    title: "Unlock Your Full Potential", 
    description: "Your financial decisions shape your future. Will you play it safe or take bold risks?" 
  },
  { 
    id: 7, 
    title: "Your 20-Year Journey Begins", 
    description: "Make smart choices, track your progress, and watch your wealth grow!" 
  },
];


const IntroPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/Layout"); // Redirect after the last slide
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="intro-container">
      <div className="slide">
        <h1>{slides[currentSlide].title}</h1>
        <p>{slides[currentSlide].description}</p>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button className="prev-button" onClick={handlePrevious} disabled={currentSlide === 0}>
            Previous
          </button>
          <button className="next-button" onClick={handleNext}>
            {currentSlide === slides.length - 1 ? "Start" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
