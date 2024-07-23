import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteBooking,
  getBookingOfUser,
  getUserDetails,
} from "../Components/api.helpers";
const UserProfile = () => {
  const [bookings, setBookings] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    getBookingOfUser()
      .then((res) => setBookings(res.result))
      .catch((err) => console.log(err));
    getUserDetails()
      .then((res) => setUser(res.result))
      .catch((err) => console.log(err));
  }, []);
  console.log(bookings);
  console.log(user);

  const handelDelete = (id) => {
    deleteBooking(id)
      .then((res) => {
        // Update state after deletion
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {user && (
          <Box
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"left"}
              boarder={"1px solid #ccc"}
              variant="h5"
              fontFamily={"verdana"}
            >
              User Profile
            </Typography>
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "left", ml: 3 }}
            ></AccountCircleIcon>
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"left"}
              boarder={"1px solid #ccc"}
            >
              Name:{user.name}
            </Typography>
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"left"}
              boarder={"1px solid #ccc"}
            >
              {" "}
              Email:{user.email}
            </Typography>
          </Box>
        )}
        {bookings && bookings.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
            >
              Bookings
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {bookings?.map((booking) => (
                  <ListItem
                    key={booking._id}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie:{booking.movie.title}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Seat:{booking.seatNumber}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Date:{new Date(booking.date).toDateString()}
                    </ListItemText>
                    <IconButton
                      onClick={() => handelDelete(booking._id)}
                      color="error"
                    >
                      <DeleteForeverIcon color="red"></DeleteForeverIcon>
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default UserProfile;
