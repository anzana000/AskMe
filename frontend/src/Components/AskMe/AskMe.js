import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./AskMe.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

import { MeContext } from "../../Context";

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
  const id = useContext(MeContext).me._id;
  return (
    <div className="questions-container">
      {data.map((d) => {
        {
          console.log(d.user[0]._id);
        }
        return (
          <div className="questions">
            <div className="questions__top">
              <div className="questions__top__img">
                <img
                  src="https://investuttarakhand.com/swcs/themes/utrakhand/assets/img/demo/7.jpg"
                  alt=""
                />
              </div>
              <div className="delete__container df">
                <h4 className="questions__top__name"> {d.user[0].name}</h4>
                {id === d.user[0]._id ? (
                  <div className="questions__top__delete">
                    <DeleteForeverIcon />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <h3 className="questions__question">{d.question}</h3>
            <div className="questions__socials">
              <span>{d.noOfLikes}</span>
              <span id="like">
                <ThumbUpAltIcon color="primary" />
              </span>
              <span>{d.answers.length}</span>
              <span>
                <QuestionAnswerIcon color="primary" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AskMe;
