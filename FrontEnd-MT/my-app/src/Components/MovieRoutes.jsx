import React from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin/Admin";
import Header from "./Header";
import Movies from "./Movies/Movies";
import HomePage from "./HomePage";
import User from "./User/User";

const MovieRoutes = () => {
  return (
    <div>
      <Header></Header>
      <section>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/movies" element={<Movies></Movies>}></Route>
          <Route path="/admin" element={<Admin></Admin>}></Route>
        <Route path="/user" element={<User></User>}></Route>
        </Routes>
      </section>
    </div>
  );
};

export default MovieRoutes;
