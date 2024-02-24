import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./CreateMemoryModal.scss";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

Modal.setAppElement("#root");

const CreateMemoryModal = ({ isOpen, onClose, onMemoryCreated }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!description) formErrors.description = "Description is required";
    if (!image) formErrors.image = "Image is required";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  //   setImagePreviewUrl(URL.createObjectURL(e.target.files[0]));
  // };

  const handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImage(file);
      setImagePreviewUrl(reader.result);
    };

    if (file) {
      // Make sure a file was selected
      reader.readAsDataURL(file);
    }
  };

  const createMemory = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    // Create FormData
    const formData = new FormData();
    formData.append("description", description);
    console.log("image:", image);
    formData.append("image", image);

    // Retrieve user ID from localStorage
    const userId = localStorage.getItem("userId");
    console.log(userId);
    if (userId) {
      formData.append("users_id", userId);
    }

    console.log(formData);

    // Make the API call
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/api/v1/memories/create-memory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Clear the form
      setDescription("");
      setImage(null);
      setImagePreviewUrl(null);
      setErrors({});

      // After successfully creating the memory, call onMemoryCreated
      onMemoryCreated();

      // Close the modal
      onClose();

      // // Navigate to the UserProfilePage
      // history.push("/user-profile");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      // contentLabel="Create Memory Modal"
      className="create-memory-modal"
      // overlayClassName="create-memory-modal-overlay"
    >
      <h1 className="create-memory-modal__title">Create Memory</h1>

      <form onSubmit={createMemory} className="create-memory-modal__form">
        <label className="create-memory-modal__label">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="create-memory-modal__textarea"
          />
        </label>
        {errors.description && (
          <p className="create-memory-modal__error">{errors.description}</p>
        )}
        <label className="create-memory-modal__label">
          Image:
          <input
            type="file"
            onChange={handleImageChange}
            required
            className="create-memory-modal__input"
          />
        </label>
        {errors.image && (
          <p className="create-memory-modal__error">{errors.image}</p>
        )}
        <div className="create-memory-modal__preview-wrap">
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className="create-memory-modal__preview"
            />
          )}
        </div>
        <button
          onClick={createMemory}
          type="submit"
          className="create-memory-modal__submit-btn"
        >
          Create Memory
        </button>
      </form>
      <button onClick={onClose} className="create-memory-modal__close-btn">
        Close
      </button>
    </Modal>
  );
};

export default CreateMemoryModal;
