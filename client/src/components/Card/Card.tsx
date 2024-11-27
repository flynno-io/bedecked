import React from "react";

const Card = ({ title, description, onClick }) => {
  return (
    <div 
      className="card" 
      onClick={onClick} 
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "16px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
