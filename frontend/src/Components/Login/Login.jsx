import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import img1 from "./login.jpg";
import img2 from "./signup.jpg";
import { LoginContext, MeContext } from "../../Context";

const Login = () => {
  const history = useHistory();

  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const { me, setMe } = useContext(MeContext);

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

  ////////////////////////////////////////////////////////////////
  const handleLogin = (e) => {
    e.preventDefault();
    const send = { email: login.email, password: login.password };
    async function log() {
      await axios
        .post("/api/v1/users/login", send)
        .then((res) => {
          setLoginStatus(true);
          async function fun() {
            await axios.get("/api/v1/users/getMe/").then((res) => {
              setMe(res.data.data);
            });
          }
          fun();
        })
        .catch((err) => {
          alert("Invalid Credentials");
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
          history.push("/login");
        })
        .catch((err) => {
          alert("Invalid Credentials");
        });
    }
    log();
  };
  ////////////////////////////////////////////////////////////////

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
            <label for="checkbox">
              Not a user? <span>Signup</span>
            </label>
            <label>
              <Link to="/forgot">Don't remember your password?</Link>
            </label>
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
            <label for="checkbox">
              Already a user? <span>Login</span>
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
