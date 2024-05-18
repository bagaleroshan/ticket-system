import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";
import Header from "./Header";
import Movies from "./Movies/Movies";
import HomePage from "./HomePage";
import User from "./User/User";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store/store";
import Booking from "./Booking/Booking";
import UserProfile from "../Profile/UserProfile";
import AddMovies from "./Movies/AddMovies";
import AdminProfile from "../Profile/AdminProfile";

const MovieRoutes = () => {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLogged", isAdminLoggedIn);
  console.log("isUserLogged", isUserLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  return (
    <div>
      <Header></Header>
      <section>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/movies" element={<Movies></Movies>}></Route>
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/admin" element={<Admin></Admin>}></Route>
              <Route path="/user" element={<User></User>}></Route>
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route
                path="/userprofile"
                element={<UserProfile></UserProfile>}
              ></Route>
              <Route path="/booking/:id" element={<Booking></Booking>}></Route>
            </>
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <>
              {" "}
              <Route path="/add" element={<AddMovies></AddMovies>}></Route>
              <Route
                path="/user-admin"
                element={<AdminProfile></AdminProfile>}
              ></Route>
            </>
          )}
        </Routes>
      </section>
    </div>
  );
};

export default MovieRoutes;
