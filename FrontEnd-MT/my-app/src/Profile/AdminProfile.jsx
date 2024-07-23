import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById } from "../Components/api.helpers";
const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    getAdminById()
      .then((res) => setAdmin(res.result))
      .catch((err) => console.log(err));
  }, []);
  // console.log(admin)
  return (
    <div>
      <Box width={"100%"} display="flex">
        <Fragment>
          {admin && (
            <Box
              flexDirection={"column"}
              justifyContent="center"
              alignItems={"center"}
              width={"30%"}
              padding={3}
            >
              <Typography
                variant="h5"
                fontFamily={"verdana"}
                textAlign="center"
                padding={2}
              >
                Admin profile
              </Typography>
              <AccountCircleIcon
                sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
              ></AccountCircleIcon>
              <Typography
                padding={1}
                width={"auto"}
                textAlign={"center"}
                boarder={"1px solid #ccc"}
              >
                {" "}
                Email:{admin.email}
              </Typography>
            </Box>
          )}
          {admin && admin.addedMovies.length > 0 && (
            <Box width={"70%"} display="flex" flexDirection={"column"}>
              <Typography
                variant="h3"
                fontFamily={"verdana"}
                textAlign="center"
                padding={2}
              >
                Added Movies
              </Typography>
              <Box
                margin={"auto"}
                display="flex"
                flexDirection={"column"}
                width="80%"
              >
                <List>
                  {admin.addedMovies.map((movie, index) => (
                    <ListItem
                      key={movie._id}
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
                        Movie:{movie.title}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      >
                        Date:{new Date(movie.releaseDate).toDateString()}
                      </ListItemText>
                      <ListItemText
                        sx={{ margin: 1, width: "auto", textAlign: "left" }}
                      >
                        Actor:{movie.actors}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}
        </Fragment>
      </Box>
    </div>
  );
};

export default AdminProfile;
