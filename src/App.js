import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/UserContextProvider";
import { MemoryContextProvider } from "./context/MemoryContextProvider";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const App = () => {
  return (
    <>
      <UserContextProvider>
        <MemoryContextProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </MemoryContextProvider>
      </UserContextProvider>
    </>
  );
};

export default App;
