import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api.helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movie, setMovie] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovie(data.result))
      .catch((err) => console.log(err));
  }, []);
  // console.log(movie);

  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        textAlign={"center"}
        bgcolor={"#900c3f"}
        color="white"
      >
        All Movies
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop="10px"
        // display="flex-start"
        display={"flex"}
        justifyContent="flex-star"
        flexWrap={"wrap"}
      >
        {movie &&
          movie.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            ></MovieItem>
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
