import React, { useEffect, useState } from "react";
// import { useUser } from "../../context/UserContextProvider";
import axios from "axios";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import CreateMemoryModal from "../../components/CreateMemoryModal/CreatMemoryModal";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserProfile = () => {
  const [memories, setMemories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [newMemoryAdded, setNewMemoryAdded] = useState(false);

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const fetchUserMemories = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_SERVER_URL}/api/v1/memories/user/${userId}`
      );

      console.log(response.data.data.memories);

      setMemories(response.data.data.memories);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMemoryCreated = () => {
    fetchUserMemories(); // Refresh the memories when a new one is created
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    fetchUserMemories();
  }, [userId]);

  const deleteMemory = async (id) => {
    try {
      await axios.delete(`${REACT_APP_SERVER_URL}/api/v1/memories/${id}`);
      fetchUserMemories(); // Refresh the memories after one is deleted
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <button onClick={handleOpenModal}>Create Memory</button>
      <CreateMemoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onMemoryCreated={handleMemoryCreated}
      />
      {memories.map((memory) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          onDelete={deleteMemory}
          userId={userId}
        />
      ))}
    </div>
  );
};

export default UserProfile;
