import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiHit from "../services/apiHit";

const UpdateSpecificUser = () => {
  let [fullName, setFullName] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("male");
  let navigate = useNavigate();
  let params = useParams();
  let token = localStorage.getItem("token");
  let handelSubmit = async (e) => {
    e.preventDefault();
    let data = {
      fullName: fullName,
      dob: dob,
      gender: gender,
    };

    try {
      let result = await apiHit({
        url: `/registers/${params.id}`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/${params.id}`);
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  let genders = [
    {
      label: "Male",
      value: "male",
    },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  let getAdminUser = async () => {
    try {
      let result = await apiHit({
        url: `/registers/${params.id}`,

        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(result)
      // setUser(result.data.data)
      let data = result.data.data;
      setDob(data.dob);
      setFullName(data.fullName);
      setGender(data.gender);
    } catch (error) {}
  };
  useEffect(() => {
    getAdminUser();
  }, []);
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
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateSpecificUser;
