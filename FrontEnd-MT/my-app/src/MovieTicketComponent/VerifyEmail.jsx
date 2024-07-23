import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiHit from "../services/apiHit";

const VerifyEmail = () => {
  let [query] = useSearchParams();
  let token = query.get("token");

  let navigate = useNavigate();

  let emailVerify = async () => {
    try {
      let result = await apiHit({
        url: "/registers/verify-emails",
        // /registers/verify-emails
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // navigate("/admin/login");
      navigate("/login")
    } catch (error) {}
  };
  useEffect(() => {
    emailVerify();
  }, []);
  return <div></div>;
};

export default VerifyEmail;
