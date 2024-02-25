import "./HomePage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateMemoryModal from "../../components/CreateMemoryModal/CreatMemoryModal";
import MemoryCardModal from "../../components/MemoryCardModal/MemoryCardModal";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import { useMemory } from "../../context/MemoryContextProvider";

const HomePage = () => {
  const { memories } = useMemory();
  const [createMemoryModalOpen, setCreateMemoryModalOpen] = useState(false);
  const [memoryCardModalOpen, setMemoryCardModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const navigate = useNavigate();

  const handleMemoryCreated = () => {
    setCreateMemoryModalOpen(false); // Close the modal
    navigate("/profile"); // Navigate to UserProfile page
  };

  const handleOpenMemoryModal = (memory) => {
    setSelectedMemory(memory);
    setMemoryCardModalOpen(true);
  };

  const handleCloseMemoryModal = () => {
    setMemoryCardModalOpen(false);
  };

  return (
    <main className="home">
      <div className="home__create-memory-btn-wrap">
        <button
          className="user-profile__create-memory-btn"
          onClick={() => setCreateMemoryModalOpen(true)}
        >
          Create a Memory
        </button>
      </div>
      <CreateMemoryModal
        className="home__create-memory-modal"
        isOpen={createMemoryModalOpen}
        onClose={() => setCreateMemoryModalOpen(false)}
        onMemoryCreated={handleMemoryCreated}
      />
      <div className="user-profile__card-wrap">
        {memories &&
          memories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onClick={() => handleOpenMemoryModal(memory)}
            />
          ))}

        {memoryCardModalOpen && (
          <MemoryCardModal
            memory={selectedMemory}
            onClose={handleCloseMemoryModal}
          />
        )}
      </div>
    </main>
  );
};

export default HomePage;
