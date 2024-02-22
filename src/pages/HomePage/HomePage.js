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
    <div>
      <h1>Home Page</h1>
      <button onClick={() => setIsModalOpen(true)}>Create Memory</button>
      <CreateMemoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMemoryCreated={handleMemoryCreated}
      />
      {memories &&
        memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
    </div>
  );
};

export default HomePage;
