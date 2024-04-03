import React from "react";
import { Link } from "react-router-dom";
import './MainMenu.scss';

function MainMenu() {
  return (
    <nav className="nav-menu">
      <Link className="nav-link" to="/">Tasks</Link>
      <Link className="nav-link" to="/add">Add Tasks</Link>
      <Link className="nav-link" to="/help">Help</Link>
    </nav>
  );
}

export default MainMenu;
