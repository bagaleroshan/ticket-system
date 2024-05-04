import React, { useEffect, useState } from "react";
import apiHit from "../services/apiHit";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ViewMovieTicket = () => {
  let [movieTicket, setMovieTicket] = useState({});
  let params = useParams();
  let navigate = useNavigate();
  let getMovieTicket = async () => {
    try {
      let output = await apiHit({
        method: "get",
        url: `/movie-tickets/${params.id}`,
      });
      console.log(output);
      setMovieTicket(output.data.result);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getMovieTicket();
  }, []);

  let buttonClick = () => {
    toast("Movie Ticket Buy Successfully.");
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <p style={{ border: "solid green 2px" }}>
        Movie Name:{movieTicket?.movieName}
      </p>
      <p style={{ border: "solid green 2px" }}>Person:{movieTicket?.person}</p>
      <p style={{ border: "solid green 2px" }}>Price:{movieTicket?.price}</p>
      <button
        onClick={buttonClick}
        style={{ background: "gray", color: "black" }}
      >
        Buy Ticket
      </button>
    </div>
  );
};

export default ViewMovieTicket;
