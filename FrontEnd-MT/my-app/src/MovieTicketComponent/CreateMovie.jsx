import React from "react";
import { useNavigate } from "react-router-dom";
import apiHit from "../services/apiHit";
import MovieTicket from "./MovieTicket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateMovie = () => {
  let navigate = useNavigate();
  let onSubmit = async (values, other) => {
    console.log(values);
    try {
      let output = await apiHit({
        method: "post",
        url: "/movies",
        data: values,
      });
      // console.log(output, "******");
      toast(output.data.message);
      navigate("/movies");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      style={{
        border: "solid red 2px",
        marginTop: "12px",
        marginBottom: "5px",
      }}
    >
      <ToastContainer></ToastContainer>
      <MovieTicket
        buttonName="Create Movie Ticket"
        onSubmit={onSubmit}
      ></MovieTicket>
    </div>
  );
};

export default CreateMovie;
