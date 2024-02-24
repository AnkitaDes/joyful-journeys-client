import { useEffect, useState } from "react";
// import { useUser } from "../../context/UserContextProvider";
import axios from "axios";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import CreateMemoryModal from "../../components/CreateMemoryModal/CreatMemoryModal";
import UpdateMemoryModal from "../../components/UpdateMemoryModal/UpdateMemoryModal";
import { useMemory } from "../../context/MemoryContextProvider";
import "./UserProfilePage.scss";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserProfile = () => {
  const [memories, setMemories] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);

  // const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenUpdateModal = (memory) => {
    setSelectedMemory(memory);

    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleMemoryCreated = () => {
    fetchUserMemories(); // Refresh the memories when a new one is created
    setIsCreateModalOpen(false); // Close the modal
  };

  const handleMemoryUpdated = async (updatedMemory) => {
    try {
      const response = await axios.put(
        `${REACT_APP_SERVER_URL}/api/v1/memories/${selectedMemory.id}`,
        updatedMemory
      );

      console.log(response.data.data.memory);

      fetchUserMemories(); // Refresh the memories after one is updated
      setIsUpdateModalOpen(false); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserMemories();
  }, [userId]);

  useEffect(() => {
    console.log(selectedMemory);
  }, [selectedMemory]);

  const deleteMemory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this memory?"
    );

    if (!confirmDelete) return;

    if (confirmDelete) {
      try {
        await axios.delete(`${REACT_APP_SERVER_URL}/api/v1/memories/${id}`);
        fetchUserMemories(); // Refresh the memories after one is deleted
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="user-profile">
      {/* <h1>User Profile</h1> */}
      <div className="user-profile__create-memory-btn-wrap">
        <button
          className="user-profile__create-memory-btn"
          onClick={handleOpenCreateModal}
        >
          Create a Memory
        </button>
      </div>
      <CreateMemoryModal
        className="user-profile__create-memory-modal"
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onMemoryCreated={handleMemoryCreated}
      />
      <UpdateMemoryModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        onMemoryUpdated={handleMemoryUpdated}
        memory={selectedMemory}
      />
      <div className="user-profile__card-wrap">
        {memories.map((memory) => (
          <MemoryCard
            className="user-profile__card"
            key={memory.id}
            memory={memory}
            onDelete={deleteMemory}
            onUpdate={handleOpenUpdateModal}
            userId={userId}
          />
        ))}
      </div>
    </main>
  );
};

export default UserProfile;
