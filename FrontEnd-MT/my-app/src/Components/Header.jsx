import {
  AppBar,
  Autocomplete,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import { Box } from "@mui/system";
// import CreateMovie from "../MovieTicketComponent/CreateMovie";
import { Link } from "react-router-dom";
import { getAllMovies } from "./api.helpers";

const Header = () => {
  // const dummyArray = ["nepali", "english", "hindi", "chinese"];
  const [value, setValue] = useState(0);
  const [result, setResult] = useState([]);
  useEffect(() => {
    getAllMovies()
      // .then((data) => console.log(data))
      .then((data) => setResult(data.result))
      .catch((err) => console.log(err));
  }, []);
  return (
    <AppBar position="sticky" sx={{bgcolor: "#2b2d42",  }}>
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon></MovieIcon>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={result.map((option) => option.title)}
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
            <Tab LinkComponent={Link} to="/admin" label="admin"></Tab>
            <Tab LinkComponent={Link} to="/user" label="user"></Tab>
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
