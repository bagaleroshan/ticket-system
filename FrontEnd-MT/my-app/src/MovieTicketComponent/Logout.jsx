import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../MyProject";

const Logout = () => {
  let global = useContext(GlobalVariableContext);
  localStorage.removeItem("token");
  let navigate = useNavigate();
  useEffect(() => {
    global.setToken(null);
    navigate("/");
  }, []);
  return <div>logout</div>;
};

export default Logout;

/* ***logout***
link /admin/logout
Route /admin/logout   AdminLogout
AdminLogout
remove token from localStorage
redirect to /



*/
