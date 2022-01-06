import React, { useContext } from "react";
import "./Navbar.css";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import user from "./user.png";
import { Link } from "react-router-dom";

import { LoginContext, MeContext } from "../../Context";

const Navbar = () => {
  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const { me, setMe } = useContext(MeContext);

  const logout = (e) => {
    setLoginStatus(false);
    setMe({});
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            AskMe
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav m-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  class="nav-link active present linkk"
                  aria-current="page"
                  to="/"
                >
                  <HomeIcon />
                </Link>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link linkk"
                  aria-current="page"
                  href="./index.html"
                >
                  <Link to="/notification" className="links">
                    <NotificationsIcon />
                  </Link>
                </a>
              </li>
            </ul>
            {!loginStatus ? (
              <Link class="navbar-brand" to="/login">
                Login/Signup
              </Link>
            ) : (
              <Link onClick={(e) => logout(e)} class="navbar-brand" to="/login">
                Logout
              </Link>
            )}

            <form class="d-flex form">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success search-button"
                type="submit"
              >
                <SearchIcon />
              </button>
              <div class="mx-5 user">
                <img src={user} alt="user" />
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
