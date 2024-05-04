import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiHit from "../services/apiHit";

const ResetPassword = () => {
  let [password, setPassword] = useState("");

  let navigate = useNavigate();
  let [params] = useSearchParams();
  let token = params.get("token");
  let handelSubmit = async (e) => {
    e.preventDefault();
    let data = {
      password: password,
    };

    try {
      let result = await apiHit({
        url: "/registers/reset-passwords",
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/login");
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <form onSubmit={handelSubmit}>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        <button type="submit" style={{ cursor: "pointer" }}>
          Reset
        </button>
      </form>
    </>
  );
};

export default ResetPassword;
