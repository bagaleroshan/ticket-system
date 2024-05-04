import React from "react";
import { NavLink } from "react-router-dom";

const MyNavbar = () => {
  return (
    <div>
      <nav style={{ backgroundColor: "gray" }}>
        <NavLink to="/admin/register" style={{ marginLeft: "10px" }}>
          Admin Register
        </NavLink>
        <NavLink to="/admin/login" style={{ marginLeft: "10px" }}>
          Login
        </NavLink>
        <NavLink to="/admin/my-profile" style={{ marginLeft: "10px" }}>
          My Profile
        </NavLink>
        <NavLink to="/admin/update-password" style={{ marginLeft: "10px" }}>
          Update Password
        </NavLink>
        <NavLink to="/admin/read-all-user" style={{ marginLeft: "10px" }}>
          Read All User
        </NavLink>
        <NavLink to="/admin/logout" style={{ marginLeft: "10px" }}>
          Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default MyNavbar;
