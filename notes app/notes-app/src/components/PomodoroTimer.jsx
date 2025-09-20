"use client";

import { useState, useEffect } from "react";

const PomodoroTimer = ({ onClose }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer has ended
            setIsActive(false);
            if (isBreak) {
              setMinutes(focusMinutes); // Back to work
              setIsBreak(false);
            } else {
              setMinutes(breakMinutes); // Start break
              setIsBreak(true);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak, focusMinutes, breakMinutes]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (isBreak) {
      setMinutes(breakMinutes);
    } else {
      setMinutes(focusMinutes);
    }
    setSeconds(0);
  };
  
  const saveSettings = (e) => {
    e.preventDefault();
    setMinutes(focusMinutes);
    setSeconds(0);
    setIsActive(false);
    setIsBreak(false);
    setShowSettings(false);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {isBreak ? "Break Time" : "Focus Time"}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.608 3.292 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {showSettings && (
          <form onSubmit={saveSettings} className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="focus-time" className="block font-medium">
                Focus Minutes
              </label>
              <input
                id="focus-time"
                type="number"
                value={focusMinutes}
                onChange={(e) => setFocusMinutes(parseInt(e.target.value))}
                className="w-20 px-3 text-black py-2 text-center rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                min="1"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="break-time" className="block font-medium">
                Break Minutes
              </label>
              <input
                id="break-time"
                type="number"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(parseInt(e.target.value))}
                className="w-20 px-3 text-black py-2 text-center rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                min="1"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Save
            </button>
          </form>
        )}

        <div className="text-center mb-6">
          <p className="text-6xl font-bold font-mono">
            {formatTime(minutes)}:{formatTime(seconds)}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="btn-primary"
          >
            {isActive ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197 2.132A1 1 0 0110 13.912V9.088a1 1 0 011.555-.832l3.197 2.132a1 1 0 010 1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="ml-2">{isActive ? "Pause" : "Start"}</span>
          </button>
          <button
            onClick={resetTimer}
            className="btn-secondary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356-2A8.001 8.001 0 004.582 9m2.356 2H20v5m-.582 2a8.001 8.001 0 01-15.356-2" />
            </svg>
            <span className="ml-2">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;