import React from "react";

const MemoryCard = ({ memory }) => {
  return (
    <div>
      <h2>Memory Card</h2>
      <img src={memory.imageUrl} alt={memory.title} />
      <p>{memory.description}</p>
      <p>{memory.created_at}</p>
    </div>
  );
};

export default MemoryCard;
