import "./MemoryCardModal.scss";

const MemoryCardModal = ({ memory, onClose }) => {
  const handleClose = (event) => {
    event.stopPropagation();
    if (onClose) {
      onClose();
    }
  };

  if (!memory) return null;
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__img-wrap">
          <img className="modal__img" src={memory.image} alt="memory" />
        </div>
        <div className="modal__description-wrap">
          <p className="modal__description">{memory.description}</p>
        </div>
        <div className="modal__close-btn-wrap">
          <button className="modal__close-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryCardModal;
