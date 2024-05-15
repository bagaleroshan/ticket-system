import React from "react";
import UserForm from "./UserForm";
import { sendUserAuthRequest } from "../api.helpers";

const User = () => {
  const getData = (data) => {
    console.log("user", data);
    sendUserAuthRequest(data.input, data.signup).then((res) =>
      console.log(res).catch((err) => console.log(err))
    );
  };
  return (
    <div>
      <UserForm onSubmit={getData} isAdmin={false}></UserForm>
    </div>
  );
};

export default User;
