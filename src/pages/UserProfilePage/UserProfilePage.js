import "./UserProfilePage.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import CreateMemoryModal from "../../components/CreateMemoryModal/CreatMemoryModal";
import MemoryCardModal from "../../components/MemoryCardModal/MemoryCardModal";
import UpdateMemoryModal from "../../components/UpdateMemoryModal/UpdateMemoryModal";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserProfile = () => {
  const [memories, setMemories] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMemoryCardModalOpen, setIsMemoryCardModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);

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

  const handleOpenMemoryCardModal = (memory) => {
    setSelectedMemory(memory);
    setIsMemoryCardModalOpen(true);
  };

  const handleCloseMemoryCardModal = () => {
    setSelectedMemory(null);
    setIsMemoryCardModalOpen(false);
  };

  const handleOpenUpdateModal = (memory) => {
    setSelectedMemory(memory);

    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleMemoryCreated = () => {
    fetchUserMemories();
    setIsCreateModalOpen(false);
  };

  const handleMemoryUpdated = async (updatedMemory) => {
    try {
      const response = await axios.put(
        `${REACT_APP_SERVER_URL}/api/v1/memories/${selectedMemory.id}`,
        updatedMemory
      );

      console.log(response.data.data.memory);

      fetchUserMemories();
      setIsUpdateModalOpen(false);
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
        fetchUserMemories();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <main className="user-profile">
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

      <MemoryCardModal
        isOpen={isMemoryCardModalOpen}
        onClose={handleCloseMemoryCardModal}
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
            onCardClick={handleOpenMemoryCardModal}
            userId={userId}
          />
        ))}
      </div>
    </main>
  );
};

export default UserProfile;
