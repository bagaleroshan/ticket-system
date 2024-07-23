import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/store";
import { sendUserAuthRequest } from "../api.helpers";
import UserForm from "./UserForm";
import { useNavigate } from "react-router-dom";
//443
const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceive = (data) => {
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId", data.result._id);
    // localStorage.setItem("token", data.token);
    navigate("/");
  };
  const getData = (data) => {
    console.log("user", data);
    sendUserAuthRequest(data.input, data.signup)
      .then(onResReceive)

      .catch((err) => console.log(err));
  };
  return (
    <div>
      <UserForm onSubmit={getData} isAdmin={false}></UserForm>
    </div>
  );
};

export default User;
