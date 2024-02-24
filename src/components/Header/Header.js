import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__nav-item-link" to="/">
          <p className="header__title">joyfuljourneys</p>
        </Link>

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
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
