import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const { user, logOut } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__nav-item-link" to="/">
          <p className="header__title">JoyfulJourneys</p>
        </Link>

        {user && (
          <>
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link className="header__nav-item-link" to="/">
                  Home
                </Link>
              </li>

              {/* <li className="header__nav-item">
            <Link to="/create-memory">Create Memory</Link>
          </li> */}
              <li className="header__nav-item">
                <Link className="header__nav-item-link" to="/profile">
                  Memories
                </Link>
              </li>
              <li className="header__nav-item">
                <button
                  className="header__nav-item-link"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
