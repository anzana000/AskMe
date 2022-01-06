import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./AskQuestion.css";
import axios from "axios";
import { LoginContext } from "../../Context";

const AskQuestion = () => {
  const history = useHistory();
  const { loginStatus, setLoginStatus } = useContext(LoginContext);

  const [question, setQuestion] = useState({
    question: "",
  });

  const [error, setError] = useState({
    status: "",
    message: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginStatus) {
      history.push("/login");
    } else {
      const newQuestion = { ...question };
      console.log(newQuestion);
      axios
        .post("/api/v1/ask", question)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          setError({
            status: err.response.data.status,
            message: err.response.data.message,
          });
          console.log(err);
        });
      setQuestion({ question: " " });
    }
  };
  return (
    <div class="container mt-5  pt-5 ask-container">
      <h3 className="h">Ask a question</h3>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <textarea
            type="text"
            class="form-control"
            name="question"
            id=""
            placeholder="Type question here..."
            onChange={(e) => setQuestion({ [e.target.name]: e.target.value })}
          ></textarea>
        </div>

        <button type="submit" class="btn btn-success btn-sm ask-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AskQuestion;
