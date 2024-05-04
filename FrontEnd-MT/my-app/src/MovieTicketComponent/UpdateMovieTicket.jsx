import React, { useEffect, useState } from "react";
import MovieTicket from "./MovieTicket";
import apiHit from "../services/apiHit";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdateMovieTicket = () => {
  let params = useParams();
  let [movieTicket, setMovieTicket] = useState({});
  let navigate = useNavigate();
  let getMovieTicket = async () => {
    try {
      let output = await apiHit({
        method: "get",
        url: `/movie-tickets/${params.id}`,
      });
      setMovieTicket(output.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getMovieTicket();
  }, []);
  let onSubmit = async (values, other) => {
    try {
      let output = await apiHit({
        method: "patch",
        url: `/movie-tickets/${params.id}`,
        data: values,
      });
      // console.log("*********",output);
      toast(output.data.message);
      navigate(`/movie-tickets/${params.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        border: "solid red 2px",
        marginTop: "20px",
        marginBottom: "5px",
      }}
    >
      <ToastContainer></ToastContainer>
      <MovieTicket
        buttonName="update ticket"
        onSubmit={onSubmit}
        movieTicket={movieTicket}
      ></MovieTicket>
    </div>
  );
};

export default UpdateMovieTicket;
