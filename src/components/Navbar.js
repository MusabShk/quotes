import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <h2>
          <span className="badge bg-primary">Quotes</span>
        </h2>
        <div className="d-flex">
          <ul className="nav">
            <li className="nav-item ">
              <NavLink
                className="nav-link"
                activeClassName="nav-link text-white bottom"
                to="/quotes"
              >
                Quotes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="nav-link text-white bottom"
                to="/newquote"
              >
                New Quote
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
