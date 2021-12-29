import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import img1 from "./login.jpg";
import img2 from "./signup.jpg";

const Login = () => {
  const history = useHistory();

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState(false);

  ////////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////////
  const handleSignup = (e) => {
    e.preventDefault();
    const send = {
      name: signup.name,
      email: signup.email,
      password: signup.password,
      confirmPassword: signup.confirmPassword,
    };
    async function log() {
      await axios
        .post("/api/v1/users/signup", send)
        .then((res) => {
          console.log(res.status);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    log();
  };
  ////////////////////////////////////////////////////////////////

  if (loginStatus) {
    history.push("/");
  }
  console.log(signup);
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
          <div className="img">
            <img src={img2} alt="signup" />
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={(e) => {
                setSignup({ ...signup, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={(e) => {
                setSignup({ ...signup, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setSignup({ ...signup, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirmPassword"
              onChange={(e) => {
                setSignup({ ...signup, [e.target.name]: e.target.value });
              }}
            />
            <button onClick={handleSignup} className="btn btn-primary">
              Signup
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
