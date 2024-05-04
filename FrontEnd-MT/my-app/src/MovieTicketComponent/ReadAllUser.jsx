import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiHit from "../services/apiHit";

const ReadAllUser = () => {
  let [users, setUser] = useState([]);
  let navigate = useNavigate();

  let getAllUsers = async () => {
    try {
      let result = await apiHit({
        url: "/registers",
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(result.data.result);
      // console.log(result)
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <ToastContainer></ToastContainer>
      {users.map((item, i) => {
        return (
          <div
            key={i}
            style={{ border: "solid red 3px", marginBottom: "20px" }}
          >
            <p>Name is {item.fullName}</p>
            <p>Email is {item.email}</p>
            <p>Gender is {item.gender}</p>
            <button
              onClick={() => {
                navigate(`/${item._id}`);
              }}
            >
              View
            </button>
            <button
              onClick={() => {
                navigate(`/update/${item._id}`);
              }}
            >
              Edit
            </button>
            <button
              onClick={async () => {
                //hit api to delete
                let result = await apiHit({
                  url: `/registers/${item._id}`,
                  method: "delete",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                });
                getAllUsers();
                toast(result.data.message);
                //console.log(result)
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default ReadAllUser;
