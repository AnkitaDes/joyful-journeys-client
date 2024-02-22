import "./HomePage.scss";
import MemoryCard from "../../components/MemoryCard/MemoryCard";
import { useMemory } from "../../context/MemoryContextProvider";

const HomePage = () => {
  const { memories } = useMemory();
  console.log(memories);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page</p>
      {memories &&
        memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
    </div>
  );
};

export default HomePage;
