import "./MemoryCard.scss";

const MemoryCard = ({ memory, onDelete }) => {
  const userId = localStorage.getItem("userId");
  console.log(memory);
  console.log(memory.image);
  console.log(userId);

  console.log(String(memory.users_id), userId);

  const handleDelete = async () => {
    if (String(memory.users_id) === userId) {
      onDelete(memory.id);
    }
  };

  return (
    <div>
      <h2>Memory Card</h2>
      <img src={memory.image} alt={memory.title} />
      <p>{memory.description}</p>
      <p>{memory.created_at}</p>
      {String(memory.users_id) === userId && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  );
};

export default MemoryCard;
