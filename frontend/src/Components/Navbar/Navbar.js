import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import user from "./user.png";

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
          <Link class="navbar-brand" to="/">
            AskMe
          </Link>

          <div class="navbar" id="navbarSupportedContent ">
            {!loginStatus ? (
              <Link class="navbar-brand" to="/login">
                Login/Signup
              </Link>
            ) : (
              <Link onClick={(e) => logout(e)} class="navbar-brand" to="/login">
                Logout
              </Link>
            )}

            <form class="d-flex form df">
              <div class="mx-5 user">
                <Link to="/me">
                  {" "}
                  <img src={user} alt="user" id="mt-5" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
