import MovieIcon from "@mui/icons-material/Movie";
import {
  AppBar,
  Autocomplete,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
// import CreateMovie from "../MovieTicketComponent/CreateMovie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { adminActions, userActions } from "../store/store";
import { getAllMovies } from "./api.helpers";

const Header = () => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // const dummyArray = ["nepali", "english", "hindi", "chinese"];
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedMovie, setSelectedMovie] = useState();
  useEffect(() => {
    getAllMovies()
      // .then((data) => console.log(data))
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };
  const handelChange = (e, val) => {
    setSelectedMovie(val);
    const movie = movies.find((m) => m.title === val);
    // console.log(movie)
    if (isUserLoggedIn) {
      navigate(`/bookings/${movie._id}`);
    }
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <MovieIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            onChange={handelChange}
            id="free-solo-demo"
            freeSolo
            options={movies?.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                placeholder="Search Across Movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, value) => setValue(value)}
          >
            <Tab LinkComponent={Link} to="/movies" label="movies"></Tab>
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/admin" label="admin"></Tab>
                <Tab LinkComponent={Link} to="/user" label="user"></Tab>
              </>
            )}
            {isUserLoggedIn && (
              <>
                <Tab
                  LinkComponent={Link}
                  to="/userprofile"
                  label="User Profile"
                ></Tab>
                <Tab
                  onClick={() => logout(false)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                ></Tab>
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab LinkComponent={Link} to="/add" label="Add Movie"></Tab>
                <Tab
                  LinkComponent={Link}
                  to="/user-admin"
                  label="Profile"
                ></Tab>
                <Tab
                  onClick={() => logout(true)}
                  LinkComponent={Link}
                  to="/"
                  label="Logout"
                ></Tab>
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
