import "./MemoryCard.scss";
import UpdateMemoryModal from "../UpdateMemoryModal/UpdateMemoryModal";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import deleteIcon from "../../assets/icons/delete-button-svgrepo-com.svg";

const MemoryCard = ({ memory, onDelete, onUpdate, onClick, onCardClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  console.log(memory);
  console.log(memory.image);
  console.log(userId);
  // console.log(onUpdate);

  console.log(String(memory.users_id), userId);

  const handleDelete = async (event) => {
    event.stopPropagation();

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

  function getTimeAgo(timestamp) {
    const date = new Date(timestamp);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  const handleCardClick = () => {
    if (onClick) onClick();
    if (onCardClick) onCardClick(memory);
  };

  return (
    <section className="memory-card" onClick={handleCardClick}>
      <div className="memory-card__image-wrap">
        <img
          className="memory-card__image"
          src={memory.image}
          alt="baby image"
        />
      </div>
      <div className="memory-card__description-wrap">
        <p className="memory-card__description">{memory.description}</p>
      </div>

      {String(memory.users_id) === userId && (
        <>
          {/* <button onClick={handleOpenModal}>Update</button>
          <UpdateMemoryModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onMemoryUpdated={handleMemoryUpdated}
            memory={memory}
          /> */}
          <div className="memory-card__timeago-deletebtn-wrap">
            <div className="memory-card__timeago-wrap">
              <p className="memory-card__timeago">
                {getTimeAgo(memory.created_at)}
              </p>
            </div>
            <div className="memory-card__delete-btn-wrap">
              <img
                onClick={handleDelete}
                className="memory-card__delete-btn"
                src={deleteIcon}
                alt="delete-button"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default MemoryCard;
