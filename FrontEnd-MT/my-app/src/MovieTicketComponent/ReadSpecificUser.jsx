import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiHit from "../services/apiHit";

const ReadSpecificUser = () => {
  let token = localStorage.getItem("token");
  let [user, setProfile] = useState({});
  let navigate = useNavigate();
  let params = useParams;
  let getAdminProfile = async () => {
    try {
      let result = await apiHit({
        url: "/registers/${params.id",
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
    getAdminProfile();
  }, []);
  return (
    <div>
      <p>Full Name = {user.fullName}</p>
      <p>Gender = {user.gender}</p>
      <p>Date OF Birth = {new Date(user.dob).toLocaleDateString()}</p>
      <p>Role = {user.role}</p>
      <p>Email = {user.email}</p>
      <button
        onClick={() => {
          navigate("/user-update");
        }}
      >
        Update User
      </button>
    </div>
  );
};

export default ReadSpecificUser;
