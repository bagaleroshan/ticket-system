import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Email, Password } from "@mui/icons-material";
const UserForm = ({ onSubmit, isAdmin }) => {
  const labelStyle = { mt: 1, mb: 1 };
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handelChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    // console.log(input)
    onSubmit({input,signup:isAdmin?false:isSignup});
  };
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ ml: "auto", padding: 1 }}>
        <IconButton>
          <CloseRoundedIcon></CloseRoundedIcon>
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handelSubmit}>
        <Box
          padding={2}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={300}
          margin="auto"
          alignContent={"center"}
        >
          {!isAdmin && isSignup && (
            <>
              {" "}
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={input.name}
                onChange={handelChange}
                margin="normal"
                variant="standard"
                type={"text"}
                name="name"
              ></TextField>
            </>
          )}
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={input.email}
            onChange={handelChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          ></TextField>
          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={input.password}
            onChange={handelChange}
            margin="normal"
            variant="standard"
            type={"password"}
            name="password"
          ></TextField>
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            variant="contained"
            fullWidth
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          {!isAdmin && (
            <Button
              onClick={(e) => {
                setIsSignup(!isSignup);
              }}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              switch To {isSignup ? "Login" : "Signup"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
};

export default UserForm;
