import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./AskMe.css";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

import { LoginContext, MeContext, RefreshContext } from "../../Context";
import AskQuestion from "../AskQuestion/AskQuestion";

const AskMe = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const { refresh, setRefresh } = useContext(RefreshContext);

  useEffect(() => {
    async function data() {
      await axios
        .get("/api/v1/ask/")
        .then((res) => {
          const value = res.data.data.data;
          // console.log(value[0].id);
          setData(value);
        })
        .catch((err) => console.log(err));
    }
    data();
  }, [refresh]);

  const deletePost = (id) => {
    async function fun() {
      await axios
        .delete(`/api/v1/ask/${id}`)
        .then((res) => {
          setRefresh(!refresh);
        })
        .catch((err) => console.log(err));
    }
    fun();
  };

  const addLike = (id) => {
    if (loginStatus) {
      async function func() {
        await axios.patch(`/api/v1/ask/${id}/likes`).then().catch();
        setRefresh(!refresh);
      }
      func();
    } else {
      history.push("/login");
    }
  };

  const id = useContext(MeContext).me._id;
  return (
    <div className="questions-container">
      {data.map((d) => {
        {
          console.log(d.likes.includes(id));
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
                <h4 className="questions__top__name">
                  {" "}
                  {d.user[0].name.charAt(0).toUpperCase() +
                    d.user[0].name.slice(1)}
                </h4>
                {id === d.user[0]._id ? (
                  <div
                    onClick={(e) => deletePost(d._id)}
                    className="questions__top__delete"
                  >
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
                <ThumbUpAltIcon
                  onClick={(e) => addLike(d._id)}
                  color={d.likes.includes(id) ? "primary" : ""}
                />
              </span>
              <span>{d.answers.length}</span>
              <span>
                <QuestionAnswerIcon color="primary" />
              </span>
            </div>
          </div>
        );
      })}
      <div className="pf">
        <AskQuestion />
      </div>
    </div>
  );
};

export default AskMe;
