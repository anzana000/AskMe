import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AskMe.css";

const AskMe = () => {
  // const like = document.getElementById("span#like");
  // const likeClicked = () => {
  //     like.classList.add("like");
  // }

  const [data, setData] = useState([]);

  useEffect(() => {
    async function data() {
      await axios
        .get("/api/v1/ask/")
        .then((res) => {
          const value = res.data.data.data;
          //   console.log(value);
          setData(value);
        })
        .catch((err) => console.log(err));
    }
    data();
  }, []);

  //   console.log(data);
  return (
    <div className="askme">
      <input type="text" placeholder="Ask a question" />
      {/* <button type="button" class="btn btn-primary">Add</button> */}

      {data.map((d) => {
        {
          console.log(d);
        }
        return (
          <div className="questions">
            <div className="top-section">
              <img
                src="https://investuttarakhand.com/swcs/themes/utrakhand/assets/img/demo/7.jpg"
                alt=""
              />
              <h4>{d.user[0].name}</h4>
            </div>
            <h3>{d.question}</h3>
            <div className="socials">
              <span>{d.noOfLikes}</span>
              <span id="like">Like</span>
              <span>{d.answers.length}</span>
              <span>Answers</span>
              <span>Share</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AskMe;
