import { useState, useEffect } from "react";
import Modal from "react-modal";

const UpdateMemoryModal = ({ isOpen, onClose, onMemoryUpdated, memory }) => {
  const [updatedMemory, setUpdatedMemory] = useState(memory);

  useEffect(() => {
    setUpdatedMemory(memory);
  }, [memory]);

  const handleImageChange = (e) => {
    setUpdatedMemory({
      ...updatedMemory,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onMemoryUpdated(updatedMemory);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h1>Update Memory</h1>
        <textarea
          value={updatedMemory?.description}
          onChange={(e) =>
            setUpdatedMemory({ ...updatedMemory, description: e.target.value })
          }
        />
        <input type="file" onChange={handleImageChange} />
        {updatedMemory?.image && <img src={updatedMemory.image} alt="Memory" />}
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default UpdateMemoryModal;
