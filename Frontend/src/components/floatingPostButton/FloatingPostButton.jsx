import React from 'react';
import { FaPlus } from 'react-icons/fa';
import './FloatingPostButton.css';

const FloatingPostButton = ({ onClick }) => {
  console.log("FloatingPostButton rendered");
  return (
    <button className="floating-post-button" onClick={onClick}>
      <FaPlus />
    </button>
  );
};

export default FloatingPostButton;
