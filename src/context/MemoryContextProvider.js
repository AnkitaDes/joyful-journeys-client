import { useEffect, useState, createContext, useContext } from "react";

import axios from "axios";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const MemoryContext = createContext();

export const MemoryContextProvider = ({ children }) => {
  const [memories, setMemories] = useState([]);

  const fetchMemories = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_SERVER_URL}/api/v1/memories/`
      );
      console.log(response);

      setMemories(response.data.data.memories);
      console.log(response.data.data.memories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <MemoryContext.Provider value={{ memories }}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemory = () => {
  return useContext(MemoryContext);
};
