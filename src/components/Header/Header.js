import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <h2 className="header__title">joyfuljourneys</h2>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/create-memory">Create Memory</Link>
          </li>
          <li className="header__nav-item">
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
