import React, { useState } from "react";
import "./AskQuestion.css";
import axios from "axios";

const AskQuestion = () => {
  const [question, setQuestion] = useState({
    question: "",
  });

  const [error, setError] = useState({
    status: "",
    message: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = { ...question };

    axios
      .post("/api/v1/ask", newQuestion)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        setError({
          status: err.response.data.status,
          message: err.response.data.message,
        });
      });
    setQuestion({ question: " " });
  };
  return (
    <div class="container mt-5  pt-5 ask-container">
      <h3>Ask a question</h3>
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
