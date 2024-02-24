import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContextProvider";
import { MemoryContextProvider } from "./context/MemoryContextProvider";
// import PrivateRoute from "./PrivateRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
// import RegisterPage from "./RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import CreateMemoryPage from "./pages/CreateMemoryPage/CreateMemoryPage";
// import EditMemoryPage from "./EditMemoryPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// import NotFoundPage from "./NotFoundPage";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <MemoryContextProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              {/* <Route path="/" exact element={<RegisterPage/>} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/create-memory" element={<CreateMemoryPage />} />
              {/* <PrivateRoute path="/edit-memory/:id" element={<EditMemoryPage/>} />  */}
              <Route path="/profile" element={<UserProfilePage />} />
              {/* <Route element={<NotFoundPage/>} />  */}
            </Routes>
            <Footer />
          </BrowserRouter>
        </MemoryContextProvider>
      </UserContextProvider>
    </>
  );
};

export default App;

// import "./App.scss";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/HomePage/HomePage";
// import AddMemory from "./pages/AddMemoryPage/AddMemoryPage";
// import Memories from "./pages/MemoriesPage/MemoriesPage";
// import MemoryContextProvider from "./context/MemoryContextProvider";

// function App() {
//   return (
//     <MemoryContextProvider>
//       <div className="App">
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/addmemory" element={<AddMemory />} />
//             <Route path="/memories" element={<Memories />} />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </MemoryContextProvider>
//   );
// }

// export default App;
