import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminActions } from "../../store/store";
import UserForm from "../User/UserForm";
import { sendAdminAuthRequest } from "../api.helpers";
const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceive = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.result._id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };
  const getData = (data) => {
    console.log("admin", data);
    sendAdminAuthRequest(data.input)
      .then(onResReceive)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <UserForm onSubmit={getData} isAdmin={true}></UserForm>
    </div>
  );
};

export default Admin;
