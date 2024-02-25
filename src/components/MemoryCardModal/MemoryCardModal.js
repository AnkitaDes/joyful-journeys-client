import e from "express";
import "./MemoryCardModal.scss";
import { useEffect, useRef } from "react";

const MemoryCardModal = ({ memory, onClose }) => {
  console.log(onClose);
  const isMounted = useRef(true);

  // useEffect(() => {
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  const handleClose = (event) => {
    event.stopPropagation();
    console.log("Close button clicked");
    if (isMounted.current && onClose) {
      console.log("Calling onClose function");
      onClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!memory) return null;
  return (
    <div className="modal" onClick={handleBackdropClick}>
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
