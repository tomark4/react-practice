import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLogin = useAuth();
  const identity = useSelector((s) => s.user.identity);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Todo's App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {!isLogin && (
              <>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
          {isLogin && (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/todos" className="nav-link">
                  My Todo's
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link"> | Hello, {identity.name}</span>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
