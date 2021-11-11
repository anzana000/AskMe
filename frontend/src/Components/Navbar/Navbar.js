import React from "react";
import "./Navbar.css";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import HelpIcon from "@material-ui/icons/Help";
import SearchIcon from "@material-ui/icons/Search";
import user from "./user.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userProfile = () => {
    const userProf = document.getElementById("user-prof");
    userProf.classList.toggle("display");
  }
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
              <a
                class="nav-link active present"
                aria-current="page"
                href="./index.html"
              >
                <HomeIcon />
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link "
                aria-current="page"
                href="./askquestion.html"
              >
                <Link to = "/askquestion" className = "links"><HelpIcon /></Link>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link " aria-current="page" href="./index.html">
                <Link to  = "/notification" className = "links"><NotificationsIcon /></Link>
              </a>
            </li>
          </ul>
          <form class="d-flex form">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success search-button" type="submit">
              <SearchIcon />
            </button>
            <div class="mx-5 user">
              <img src={user} alt="user" onClick={userProfile} />
              
            </div>

          </form>
        </div>
      </div>
    </nav>
    <div className="user-profile" id = "user-prof">
                <ul>
                  <li><a href="">Your profile</a></li>
                  <li><a href="">something</a></li>
                  <li><a href="">Help</a></li>
                  <li><a href="">Settings</a></li>
                 
                </ul>
              </div>
    </div>
  );
};

export default Navbar;
