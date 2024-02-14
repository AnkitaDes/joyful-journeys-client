import React, { useState } from "react";
import "./AddMemoryPage.scss";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/images/icons/arrow_back-24px.svg";

function AddMemoryPage() {
  const navigate = useNavigate();

  const [memory, setMemory] = useState({
    creator: "",
    title: "",
    description: "",
    tags: "",
  });

  const handleInputChange = (e) => {
    setMemory({ ...memory, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Your upload was successful!");
    navigate("/");
    // Here you can handle the submit logic (e.g., send a POST request to your server)
    console.log(memory);
  };

  const handleCancel = () => {
    setMemory({
      creator: "",
      title: "",
      message: "",
      tags: "",
    });
  };

  return (
    <section className="add-memory">
      <div className="add-memory__title-container">
        <img
          src={BackArrow}
          className="back-arrow"
          alt="Back Arrow"
          onClick={handleCancel}
        />
        <h1 className="add-memory__title">Create New Memory</h1>
      </div>
      <form className="add-memory__form">
        <div className="add-memory__details">
          <label className="add-memory__label">Creator Name</label>
          <input
            placeholder="Creator Name"
            className="add-memory__input"
            type="text"
            id="memory_name"
            name="memory_name"
            value={memory.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-memory__details-image">
          <img src={memory.image} alt="Memory" className="add-memory__image" />
        </div>
        <div className="add-memory__details">
          <label className="add-memory__label">Title</label>
          <input
            placeholder="Title"
            className="add-memory__input"
            type="text"
            id="memory_title"
            name="memory_title"
            value={memory.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label className="add-memory__label">Description</label>
          <textarea
            placeholder="Description"
            className="add-memory__input add-memory__input--textarea"
            id="memory_description"
            name="memory_description"
            value={memory.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-memory__details">
          <label className="add-memory__label">Tags</label>
          <input
            placeholder="Tags"
            className="add-memory__input"
            type="text"
            id="memory_tags"
            name="memory_tags"
            value={memory.tags}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="add-memory__buttons">
        <button className="add-memory__button-cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="add-memory__button-add-memory"
          onClick={handleSubmit}
        >
          Add Memory
        </button>
      </div>
    </section>
  );
}

export default AddMemoryPage;
