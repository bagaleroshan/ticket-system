import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ title, posterUrl, releaseDate, id }) => {
  return (
    // <Card
    //   sx={{
    //     margin: 2,
    //     Width: 250,
    //     height: 320,
    //     borderRadius: 5,
    //     ":hover": {
    //       boxShadow: "10px 10px 20px #ccc",
    //     },
    //   }}
    // >
    //   <img height={"50%"} width="100%" src={posterUrl} alt={title}></img>
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       {title}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       {new Date(releaseDate).toDateString()}
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button
    //       variant="contained"
    //       fullWidth
    //       LinkComponent={Link}
    //       to={`/bookings/${id}`}
    //       sx={{ Margin: "auto", ":hover": { bgcolor: "#121217" } }}
    //       size="small"
    //     >
    //       Book
    //     </Button>
    //   </CardActions>
    // </Card>
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        alt={title}
        height="140"
        image={posterUrl} // Ensure this URL is correct
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          LinkComponent={Link}
          to={`/bookings/${id}`}
          sx={{ Margin: "auto", ":hover": { bgcolor: "#121217" } }}
          size="small"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
