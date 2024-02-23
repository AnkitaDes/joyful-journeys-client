import "./MemoryCard.scss";
import UpdateMemoryModal from "../UpdateMemoryModal/UpdateMemoryModal";
import { useState } from "react";

const MemoryCard = ({ memory, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  console.log(memory);
  console.log(memory.image);
  console.log(userId);
  // console.log(onUpdate);

  console.log(String(memory.users_id), userId);

  const handleDelete = async () => {
    if (String(memory.users_id) === userId) {
      onDelete(memory.id);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMemoryUpdated = (updatedMemory) => {
    onUpdate(memory.id, updatedMemory);
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div>
      <h2>Memory Card</h2>
      <img src={memory.image} alt="baby image" />
      <p>{memory.description}</p>
      <p>{memory.created_at}</p>
      {String(memory.users_id) === userId && (
        <>
          <button onClick={handleOpenModal}>Update</button>
          <UpdateMemoryModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onMemoryUpdated={handleMemoryUpdated}
            memory={memory}
          />
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default MemoryCard;
