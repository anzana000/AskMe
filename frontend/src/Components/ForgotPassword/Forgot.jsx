import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "../Login/Login.css";
import img1 from "../Login/login.jpg";

const Forgot = () => {
  const history = useHistory();
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [reset, setReset] = useState(false);
  const [text, setText] = useState("");

  const handleForgot = (e) => {
    e.preventDefault();
    async function fun() {
      await axios
        .post("/api/v1/users/forgotPassword", email)
        .then((res) => {
          if (res.data.status === "success") {
            setReset(true);
          }
          if (res.data.message) setMessage(res.data.message);
        })
        .catch((err) => {
          setMessage("No user found with this email");
        });
    }
    fun();
  };

  const handleReset = (e) => {
    e.preventDefault();
    async function fun() {
      await axios
        .post(`/api/v1/users/resetPassword/${text}`, password)
        .then((res) => {
          if (res.data.status === "success") {
            setReset(true);
          }
          if (res.data.message) setMessage(res.data.message);
          history.push("/login");
        })
        .catch((err) => {
          console.log(err);
          setMessage("Server Error");
        });
    }
    fun();
  };
  console.log(text);
  return (
    <div className="login-container">
      <div>
        <section className="login page">
          <div className="img">
            <img src={img1} alt="login" />
          </div>
          {!reset ? (
            <div>
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail({ ...email, [e.target.name]: e.target.value });
                }}
              />

              <button onClick={handleForgot} className="btn btn-primary">
                Enter
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                name="text"
                placeholder="text from email"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword({ ...password, [e.target.name]: e.target.value });
                }}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirmPassword"
                onChange={(e) => {
                  setPassword({ ...password, [e.target.name]: e.target.value });
                }}
              />

              <button onClick={handleReset} className="btn btn-primary">
                Enter
              </button>
            </div>
          )}
        </section>
        {message.length > 1 ? (setMessage(" "), alert(message)) : null}
      </div>
    </div>
  );
};

export default Forgot;
