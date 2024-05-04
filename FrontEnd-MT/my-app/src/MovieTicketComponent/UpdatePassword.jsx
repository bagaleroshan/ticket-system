import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiHit from "../services/apiHit";

const UpdatePassword = () => {
  let [oldPassword, setOldPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");

  let navigate = useNavigate();
  let token = localStorage.getItem("token");
  let handelSubmit = async (e) => {
    e.preventDefault();
    let data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      let result = await apiHit({
        url: "/registers/update-passwords",
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/admin/login");
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <form onSubmit={handelSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            id="oldPassword"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          ></input>
        </div>

        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdatePassword;
/* ***update password***
link => admin/update-password
route=>admin/update-password=>AdminUpdatePassword
AdminUpdatePassword
make a form for oldPassword , newPassword
make a update button 
hit api
logout(remove token from localStorage)
login page 


*/
