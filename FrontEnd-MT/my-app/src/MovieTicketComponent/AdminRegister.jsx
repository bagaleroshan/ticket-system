// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import apiHit from "../services/apiHit";
// import axios from "axios";

import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import apiHit from "../services/apiHit";

const AdminRegister = () => {
  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("male");
  let handelSubmit = async (e) => {
    e.preventDefault();
    let data = {
      fullName: fullName,
      email: email,
      password: password,
      dob: dob,
      gender: gender,
    };
    data = {
      ...data,
      role: "admin",
    };
    try {
      let result = await apiHit({
        url: "/registers",
        method: "post",
        data: data,
      });
      // console.log(result, "**********");
      toast(
        "A Link has been sent to your email. Please click the give link to verify your account."
      );
    } catch (error) {
      toast(error.response.data.message);
      // console.log(error.message)
    }
    setFullName("");
    setEmail("");
    setPassword("");
    setDob("");
    setGender("male");
  };

  let genders = [
    {
      label: "Male",
      value: "male",
    },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  return (
    <>
      <ToastContainer></ToastContainer>
      <form onSubmit={handelSubmit}>
        <div>
          <label htmlFor="fullName">Full Name :</label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          ></input>
        </div>

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
        <div>
          <label htmlFor="password">Password :</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="dob">DOB :</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
          ></input>
        </div>

        <div>
          <label>Gender :</label>
          {genders.map((item, i) => {
            return (
              <span key={i}>
                <label htmlFor={item.value}>{item.label}</label>
                <input
                  type="radio"
                  id={item.value}
                  value={item.value}
                  checked={gender === item.value}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                ></input>
              </span>
            );
          })}
        </div>
        <button type="submit">send</button>
      </form>
    </>
  );
};

export default AdminRegister;
