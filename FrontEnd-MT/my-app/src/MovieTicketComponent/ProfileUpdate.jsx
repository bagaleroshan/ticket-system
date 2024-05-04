import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiHit from "../services/apiHit";
import htmlDateFormat from "../utils/dateFormat";

const ProfileUpdate = () => {
  let [fullName, setFullName] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("male");
  let navigate = useNavigate();
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
        url: "/registers/profile-updates",
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/my-profile");
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

  let getAdminProfile = async () => {
    try {
      let result = await apiHit({
        url: "/registers/my-profiles",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(result)
      // setProfile(result.data.data)
      let data = result.data.data;
      setDob(data.dob);
      setFullName(data.fullName);
      setGender(data.gender);
    } catch (error) {}
  };
  useEffect(() => {
    getAdminProfile();
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
            value={htmlDateFormat(dob)}
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

export default ProfileUpdate;
/* ***update profile**
make update profile button on my profile when clicked link to admin/profile-update
route admin/profile-update UpdateProfile
UpdateProfile
make a form email* ,password*, role*
button=>Update (hit api)
for data populate=> get myProfile api on page load and set data

 
*/
