import React, { useState, useEffect } from 'react';
import './Time.css'; // We'll create this CSS file next

const TimeSimulation = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // Start at Jan 2025
  const [isPlaying, setIsPlaying] = useState(false);
  const [yearProgress, setYearProgress] = useState(0);
  const [speed, setSpeed] = useState(1); // Default speed multiplier
  const [completedYears, setCompletedYears] = useState(0);
  
  const startDate = new Date(2025, 0, 1);
  const totalYears = 20;
  const monthsPerYear = 12;
  const baseTimePerMonth = 10000; // 10 seconds in milliseconds
  
  // Calculate the month within the current year (0-11)
  const currentMonth = currentDate.getMonth();
  
  // Calculate overall progress
  const totalMonths = totalYears * monthsPerYear;
  const overallMonthsElapsed = completedYears * monthsPerYear + currentMonth;
  
  // Update every interval based on speed
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(() => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        
        // If we've completed a year, reset to January of next year
        if (newDate.getMonth() === 0) {
          setCompletedYears(prev => {
            // If we've reached 20 years, reset completely
            if (prev >= totalYears - 1) {
              newDate.setFullYear(startDate.getFullYear());
              return 0;
            }
            return prev + 1;
          });
        }
        
        setCurrentDate(newDate);
      }, baseTimePerMonth / speed); // Adjust time based on speed
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentDate, speed, completedYears]);
  
  // Update progress percentage for current year
  useEffect(() => {
    setYearProgress((currentMonth / (monthsPerYear - 1)) * 100);
  }, [currentMonth]);
  
  const togglePlay = () => {
    if (completedYears >= totalYears) {
      setCurrentDate(new Date(2025, 0, 1));
      setCompletedYears(0);
    }
    setIsPlaying(!isPlaying);
  };
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  };
  
  // Calculate the width for progress bars
  const yearBarWidth = `${yearProgress}%`;
  const totalBarWidth = `${(overallMonthsElapsed / totalMonths) * 100}%`;
  
  return (
    <div className="time-simulation"> 
      <div className="date-display">
        <div className="current-date">{formatDate(currentDate)}</div>
        <div className="progress-text">
          Month {currentMonth + 1}/{monthsPerYear} of Year {completedYears + 1}/{totalYears}
        </div>
      </div>
      
      {/* Current Year Bar */}
      <div className="progress-container">
        <div className="progress-labels">
          <span>Jan {2025 + completedYears}</span>
          <span>Dec {2025 + completedYears}</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: yearBarWidth }}
          ></div>
          <div className="progress-percentage">
            {Math.round(yearProgress)}%
          </div>
        </div>
      </div>
      
      {/* Overall progress bar */}
      <div className="progress-container">
        <div className="progress-labels">
          <span>2025</span>
          <span>2045</span>
        </div>
        <div className="total-progress-bar-container">
          <div 
            className="total-progress-bar-fill"
            style={{ width: totalBarWidth }}
          ></div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="controls">
        <button 
          onClick={togglePlay}
          className="play-button"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        
        <div className="speed-control">
          <span>Speed:</span>
          <select 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="speed-select"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimeSimulation;