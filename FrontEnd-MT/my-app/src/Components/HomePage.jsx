import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "./api.helpers";

const HomePage = () => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setResult(data.result))
      .catch((err) => console.log(err));
  }, []);
  //   console.log(result);
  return (
    <Box width={"100%"} height="100%" marginTop={2} margin="auto">
      <Box margin={"auto"} width="80%" padding={2}>
        <img
        
          src="https://img.freepik.com/free-vector/cinema-realistic-poster-with-illuminated-bucket-popcorn-drink-3d-glasses-reel-tickets-blue-background-with-tapes-vector-illustration_1284-77070.jpg?w=740&t=st=1715591960~exp=1715592560~hmac=e2ae45d3b1791f7e70d9261c8bc4e686c29b9bcb3694f0d68cf66fc1d98c0fcb"
          alt="pasupatiparsad"
          width={"100%"}
          height={"40vh"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h3" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {result.slice(0, 4).map((movie, index) => (
          <MovieItem
            id={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            releaseDate={movie.releaseDate}
            key={index}
          ></MovieItem>
        ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/movies"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2b42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
