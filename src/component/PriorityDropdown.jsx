import React, { useState, useEffect, useRef } from 'react';
import '../App.css'; // 

const PriorityDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("Select Priority");
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

const PRIORITY_OPTIONS = [
  { label: "High", color: "red" },
  { label: "Medium", color: "orange" },
  { label: "Low", color: "green" },
];
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleOptionClick = (priority) => {
    setSelectedPriority(priority);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <button
        ref={buttonRef}
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="flag-circle"
          style={{ backgroundColor: selectedPriority.color }}
        ></span>
        <span>{selectedPriority.label}</span>
      </button>

      {isOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          {PRIORITY_OPTIONS.map((priority) => (
            <div
              key={priority.label}
              className="dropdown-option"
              onClick={() => handleOptionClick(priority)}
            >
              <span
                className="flag-circle"
                style={{ backgroundColor: priority.color }}
              ></span>
              {priority.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown;
