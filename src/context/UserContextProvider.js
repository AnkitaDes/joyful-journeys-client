import { createContext, useContext, useState } from "react";
import axios from "axios";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const logIn = async (email, password) => {
    try {
      const response = await axios.post(
        `${REACT_APP_SERVER_URL}/api/v1/users/login`,
        { email, password }
      );

      if (response.data.data && response.data.data.user) {
        console.log(response.data.data.user);
        setUser(response.data.data.user);

        setUserId(response.data.data.user.id);
        localStorage.setItem("userId", response.data.data.user.id);
        console.log(response.data.data.user.id);
      } else {
        console.error(
          "Server response does not contain a user object:",
          response
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setUser(null);
    setUserId(null);
    localStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider value={{ user, userId, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
