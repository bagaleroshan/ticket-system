import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHit from "../services/apiHit";

const MyProfile = () => {
  let token = localStorage.getItem("token");
  let [profile, setProfile] = useState({});
  let navigate = useNavigate();
  let getMyProfile = async () => {
    try {
      let result = await apiHit({
        url: "/registers/my-profiles",
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(result)
      setProfile(result.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getMyProfile();
  }, []);
  return (
    <div>
      <p>Full Name = {profile.fullName}</p>
      <p>Gender = {profile.gender}</p>
      <p>Date OF Birth = {new Date(profile.dob).toLocaleDateString()}</p>
      <p>Role = {profile.role}</p>
      <p>Email = {profile.email}</p>
      <button
        onClick={() => {
          navigate("/profile-update");
        }}
      >
        Update Profile
      </button>
    </div>
  );
};

export default MyProfile;
/* ***my profile***
link =>/admin/my-profile
rote=>/admin/my-profile=>AdminProfile
AdminProfile
hit api on page ;oad(useEffect)
token=>get token from local storage 



*/
