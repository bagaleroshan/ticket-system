import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addMovies } from "../api.helpers";
import { useNavigate } from "react-router-dom";
const labelProps = {
  mt: 1,
  mb: 1,
};
const AddMovies = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });
  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");
const navigate=useNavigate()
  const handelChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, actors);
    addMovies({ ...inputs, actors })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      navigate("/movies")
  };
  return (
    <div>
      <form onSubmit={handelSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin={"flex"}
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New Movie
          </Typography>
          <FormLabel sx={{ labelProps }}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handelChange}
            name="title"
            variant="standard"
            margin="normal"
          ></TextField>
          <FormLabel sx={{ labelProps }}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handelChange}
            name="description"
            variant="standard"
            margin="normal"
          ></TextField>
          <FormLabel sx={{ labelProps }}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handelChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
          ></TextField>
          <FormLabel sx={{ labelProps }}>Release Date</FormLabel>
          <TextField
            type="date"
            value={inputs.releaseDate}
            onChange={handelChange}
            name="releaseDate"
            variant="standard"
            margin="normal"
          ></TextField>
          <FormLabel sx={{ labelProps }}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              value={actor}
              onChange={(e) => setActor(e.target.value)}
              name="actor"
              variant="standard"
              margin="normal"
            ></TextField>
            <Button
              onClick={() => {
                setActors([...actors, actor]);
                setActor("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel sx={{ labelProps }}>Featured</FormLabel>
          <Checkbox
            name="featured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          ></Checkbox>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d43",
              ":hover": { bgcolor: "#121217" },
            }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddMovies;
