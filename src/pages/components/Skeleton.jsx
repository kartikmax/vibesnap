import React from "react";
import './styles.css';

function Skeleton({ className }) {
  return (
    <div className={`loading ${className}`}>
      <div className="image"></div>
    </div>
  );
}

export default Skeleton;

