import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { LoginContext, MeContext, RefreshContext } from "../../Context";

import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

import img from "./me.jpg";
import "./Me.css";

const Me = () => {
  const history = useHistory();
  const { loginStatus, setLoginStatus } = useContext(LoginContext);
  const { me, setMe } = useContext(MeContext);
  const name = useContext(MeContext).me.name;
  const email = useContext(MeContext).me.email;
  const [edit, setEdit] = useState(false);
  const [pass, setPass] = useState(false);
  const [tempPass, setTempPass] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [temp, setTemp] = useState({
    name: name,
    email: email,
  });

  const isloggedIn = useContext(LoginContext).loginStatus;
  if (!isloggedIn) history.push("/login");

  const changeData = (e) => {
    e.preventDefault();
    if (!isloggedIn) {
      history.push("/login");
    } else {
      async function fun() {
        await axios.patch("/api/v1/users/updateMe/", temp).then((res) => {
          setEdit(false);
          setMe(res.data.data.user);
        });
      }
      fun();
    }
  };

  const changePass = (e) => {
    e.preventDefault();
    if (!isloggedIn) {
      history.push("/login");
    } else {
      async function fun() {
        await axios
          .patch("/api/v1/users/updateMyPassword/", tempPass)
          .then((res) => {
            setPass(false);
            history.push("/");
            setLoginStatus(false);
          });
      }
      fun();
    }
  };

  return (
    <section className="me">
      <div className="me__container">
        <div className="me__container__left">
          {!pass ? (
            <div className="me__container__left__data">
              <div className="me__container__left__data__name">
                <PersonIcon className="me__container__left__data__name__icon" />
                {!edit ? (
                  `${name}`
                ) : (
                  <input
                    type="text"
                    name="name"
                    className="me__container__left__data__name__input"
                    value={temp.name}
                    onChange={(e) => setTemp({ ...temp, name: e.target.value })}
                  />
                )}
              </div>
              <div className="me__container__left__data__email">
                <EmailIcon className="me__container__left__data__name__icon" />
                {!edit ? (
                  `${email}`
                ) : (
                  <input
                    type="email"
                    name="email"
                    className="me__container__left__data__name__input"
                    value={temp.email}
                    onChange={(e) =>
                      setTemp({ ...temp, email: e.target.value })
                    }
                  />
                )}
              </div>
              {!edit ? (
                <span
                  onClick={(e) => (setPass(true), setEdit(!edit))}
                  className="me__link"
                >
                  Change my password
                </span>
              ) : (
                <button
                  onClick={(e) => {
                    changeData(e);
                  }}
                  className="me__btn"
                >
                  Submit
                </button>
              )}
            </div>
          ) : (
            <div className="me__container__left__data">
              <div className="me__container__left__data__name">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Old Password"
                  className="me__container__left__data__name__input ml mb"
                  onChange={(e) =>
                    setTempPass({
                      ...tempPass,
                      currentPassword: e.target.value,
                    })
                  }
                />

                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="me__container__left__data__name__input ml mb"
                  onChange={(e) =>
                    setTempPass({ ...tempPass, password: e.target.value })
                  }
                />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="me__container__left__data__name__input ml"
                  onChange={(e) =>
                    setTempPass({
                      ...tempPass,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  onClick={(e) => {
                    changePass(e);
                  }}
                  className="me__btn"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
          <div
            onClick={(e) => (setEdit(!edit), setPass(false))}
            className="me__container__left__edit"
          >
            {!edit ? <EditIcon /> : <CancelIcon />}
          </div>
        </div>
        <div className="me__container__right">
          <img className="me__container__right__img" src={img} alt="pic" />
        </div>
      </div>
    </section>
  );
};

export default Me;
