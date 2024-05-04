import React, { createContext, useState } from "react";
import MyRoutes from "./MovieTicketComponent/MyRoutes";
export let GlobalVariableContext = createContext();

const MyProject = () => {
  let [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div>
      <GlobalVariableContext.Provider value={{token:token,setToken:setToken}}>
      <MyRoutes></MyRoutes>
      </GlobalVariableContext.Provider>
    </div>
  );
};

export default MyProject;
