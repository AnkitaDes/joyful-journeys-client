import React, { useState } from "react";
import MemoryContext from "./MemoryContext";

function MemoryContextProvider({ children }) {
  const [memories, setMemories] = useState([]);

  const addMemory = (memory) => {
    setMemories([...memories, memory]);
  };

  return (
    <MemoryContext.Provider value={{ memories, addMemory }}>
      {children}
    </MemoryContext.Provider>
  );
}

export default MemoryContextProvider;
