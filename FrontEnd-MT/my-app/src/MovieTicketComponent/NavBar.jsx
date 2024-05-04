import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalVariableContext } from "../MyProject";

const NavBar = () => {
  let global = useContext(GlobalVariableContext);
  return (
    <div>
      <nav style={{ backgroundColor: "gray" }}>
        <NavLink to="/" style={{ marginLeft: "10px", color: "black" }}>
          Home
        </NavLink>

        <NavLink
          to="/admin/register"
          style={{ marginLeft: "10px", color: "black" }}
        >
          Register
        </NavLink>
        {global.token ? (
          <>
            <NavLink
              to="/movie-tickets"
              style={{ marginLeft: "10px", color: "black" }}
            >
              Movie Tickets
            </NavLink>
            <NavLink
              to="/create-movie-ticket"
              style={{ marginLeft: "10px", color: "black" }}
            >
              Create Movie Ticket
            </NavLink>
            <NavLink
              to="/admin/my-profile"
              style={{ marginLeft: "10px", color: "black" }}
            >
              My Profile
            </NavLink>
            <NavLink
              to="/admin/update-password"
              style={{ marginLeft: "10px", color: "black" }}
            >
              Update Password
            </NavLink>
            <NavLink
              to="/admin/read-all-user"
              style={{ marginLeft: "10px", color: "black" }}
            >
              Read All User
            </NavLink>
            <NavLink
              to="/admin/logout"
              style={{ marginLeft: "10px", color: "black" }}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/admin/login"
              style={{ marginLeft: "10px", color: "black" }}
            >
              Login
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
