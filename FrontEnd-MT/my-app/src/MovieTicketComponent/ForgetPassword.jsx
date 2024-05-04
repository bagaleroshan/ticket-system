import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiHit from "../services/apiHit";

const ForgetPassword = () => {
  let [email, setEmail] = useState("");

  let handelSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
    };

    try {
      let result = await apiHit({
        url: "/registers/forget-passwords",
        method: "post",
        data: data,
      });
      setEmail("");
      toast.success("Link has been set to your email to reset password");
    } catch (error) {
      toast(error.response.data.message);
    }
  };
  return (
    <>
      <ToastContainer></ToastContainer>
      <form onSubmit={handelSubmit}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
        </div>

        <button type="submit">Forget Password</button>
      </form>
    </>
  );
};

export default ForgetPassword;
/* **forget**
forget password (button) click ("/admin/forget-password")
component ("/admin/forget-password") AdminForgetPassword
AdminForgetPassword
 email 
 
 **reset password**
Route /reset-password AdminResetPassword
AdminResetPassword
  Password
 redirect to /admin/login  

 */
