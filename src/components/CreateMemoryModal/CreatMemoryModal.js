import { useState } from "react";
import axios from "axios";
import "./CreateMemoryModal.scss";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const CreateMemoryModal = ({ isOpen, onClose, onMemoryCreated }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const createMemory = async (event) => {
    event.preventDefault();

    if (!description || !image) return;

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);

    const userId = localStorage.getItem("userId");
    if (userId) {
      formData.append("users_id", userId);
    }

    try {
      await axios.post(
        `${REACT_APP_SERVER_URL}/api/v1/memories/create-memory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDescription("");
      setImage(null);
      setImagePreviewUrl(null);

      onMemoryCreated();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-modal">
      <div className="create-modal__content">
        <h1 className="create-modal__title">Create a Memory</h1>
        <form className="create-modal__form" onSubmit={createMemory}>
          <label className="create-modal__label">
            Description:
            <textarea
              className="create-modal__textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Image:
            <input
              className="create-modal__input"
              type="file"
              onChange={handleImageChange}
              required
            />
          </label>
          <div className="create-modal__preview-wrap">
            {imagePreviewUrl && (
              <img
                className="create-modal__preview"
                src={imagePreviewUrl}
                alt="Preview"
              />
            )}
          </div>
          <button className="create-modal__submit-btn" type="submit">
            Create Memory
          </button>
        </form>
        <button className="create-modal__close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CreateMemoryModal;
