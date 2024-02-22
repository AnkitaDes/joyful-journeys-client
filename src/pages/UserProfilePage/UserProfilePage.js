import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContextProvider";
import axios from "axios";
import MemoryCard from "../../components/MemoryCard/MemoryCard";

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserProfile = () => {
  const [memories, setMemories] = useState([]);
  const [newMemoryAdded, setNewMemoryAdded] = useState(false);

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const fetchUserMemories = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_SERVER_URL}/api/v1/memories/user/${userId}`
      );

      console.log(response.data.data.memories);

      if (response.data.data.success) {
        setMemories(response.data.data.memories);
      } else {
        console.error("Server response indicates an error:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserMemories();
  }, [userId]);

  return (
    <div>
      <h1>User Profile</h1>
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} /> // Use the MemoryCard component to render each memory
      ))}
    </div>
  );
};

export default UserProfile;
