import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-emoji">🍋</span>
        <span className="brand-name">
          recipe<span>book</span>
        </span>
      </Link>

      <nav className="navbar-links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          Explore
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          Favorites
        </NavLink>

        <Link to="/add" className="add-recipe-btn">
          <span>+</span> Add recipe
        </Link>
      </nav>
    </header>
  );
}