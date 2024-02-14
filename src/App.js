import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import AddMemory from "./pages/AddMemoryPage/AddMemoryPage";
import Memories from "./pages/MemoriesPage/MemoriesPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addmemory" element={<AddMemory />} />
          <Route path="/memories" element={<Memories />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
