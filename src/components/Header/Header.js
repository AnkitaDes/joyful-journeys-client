import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContextProvider";
import "./Header.scss";

const Header = () => {
  const { user, logOut } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  const handleLogIn = () => {
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__nav-item-link" to="/">
          <p className="header__title">JoyfulJourneys</p>
        </Link>

        {user ? (
          <>
            <ul className="header__nav-list">
              <div className="header__nav-home-memories-wrap">
                <li className="header__nav-item">
                  <Link className="header__nav-item-link" to="/">
                    Home
                  </Link>
                </li>

                <li className="header__nav-item">
                  <Link className="header__nav-item-link" to="/profile">
                    Memories
                  </Link>
                </li>
              </div>

              <li className="header__nav-item">
                <div className="header__nav-btn-wrap">
                  <button
                    className="header__nav-logout-btn"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </>
        ) : (
          <div className="header__nav-login-btn-wrap">
            <button className="header__nav-login-btn" onClick={handleLogIn}>
              Login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
