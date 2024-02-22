import React from "react";

const MemoryCard = ({ memory }) => {
  console.log(memory);
  console.log(memory.image);
  return (
    <div>
      <h2>Memory Card</h2>
      <img src={memory.image} alt={memory.title} />
      <p>{memory.description}</p>
      <p>{memory.created_at}</p>
    </div>
  );
};

export default MemoryCard;
