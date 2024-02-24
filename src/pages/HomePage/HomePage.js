import "./HomePage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateMemoryModal from "../../components/CreateMemoryModal/CreatMemoryModal";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import { useMemory } from "../../context/MemoryContextProvider";

const HomePage = () => {
  const { memories } = useMemory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleMemoryCreated = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/profile"); // Navigate to UserProfile page
  };

  return (
    <main className="home">
      <div className="home__create-memory-btn-wrap">
        <button
          className="user-profile__create-memory-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Create Memory
        </button>
      </div>
      <CreateMemoryModal
        className="home__create-memory-modal"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMemoryCreated={handleMemoryCreated}
      />
      <div className="user-profile__card-wrap">
        {memories &&
          memories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
      </div>
    </main>
  );
};

export default HomePage;
