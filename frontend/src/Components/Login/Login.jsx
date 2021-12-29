import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import img1 from "./login.jpg";
import img2 from "./signup.jpg";

const Login = () => {
  const history = useHistory();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const send = { email: login.email, password: login.password };
    async function log() {
      await axios
        .post("/api/v1/users/login", send)
        .then((res) => {
          console.log(res.status);
          setLoginStatus(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    log();
  };
  if (loginStatus) {
    history.push("/");
  }
  return (
    <div className="login-container">
      <input type="checkbox" id="checkbox" />

      <div>
        <section className="login page">
          <div className="img">
            <img src={img1} alt="login" />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => {
                setLogin({ ...login, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setLogin({ ...login, [e.target.name]: e.target.value });
              }}
            />
            <button onClick={handleLogin} className="btn btn-primary">
              login
            </button>
          </div>
        </section>

        <section className="signup page">
          <img src={img2} alt="signup" />
        </section>
      </div>
    </div>
  );
};

export default Login;
