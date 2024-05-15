import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api.helpers";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [result, setResult] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setResult(data.result))
      .catch((err) => console.log(err));
  }, []);
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
        justifyContent="center"
        flexWrap={"wrap"}
      >
        {result &&
          result.map((result, index) => (
            <MovieItem
              key={index}
              id={result.id}
              posterUrl={result.posterUrl}
              releaseDate={result.releaseDate}
              title={result.title}
            ></MovieItem>
          ))}
      </Box>
    </Box>
  );
};

export default Movies;
