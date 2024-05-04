import React, { useEffect, useState } from "react";
import apiHit from "../services/apiHit";
import { useNavigate } from "react-router-dom";
import showAlert from "../utils/showAlert";

const ReadAllMovieTicket = () => {
  let [movieTickets, setMovieTickets] = useState([]);
  let navigate = useNavigate();
  let getAllMovieTickets = async () => {
    try {
      let output = await apiHit({
        url: "/movie-tickets",
        method: "get",
      });
      //   console.log(output);
      setMovieTickets(output.data.result);
    } catch (error) {}
  };
  useEffect(() => {
    getAllMovieTickets();
  }, []);
  let handelView = (item) => {
    return () => {
      navigate(`/movie-tickets/${item._id}`);
    };
  };
  let handelEdit = (item) => {
    return () => {
      
      navigate(`/movie-tickets/update/${item._id}`);
    };
  };
  let handelClick = () => {
    console.log("Button is Clicked.");
  };
  return (
    <div>
      {movieTickets?.map((item, i) => {
        return (
          <div
            style={{
              border: "solid green 5px",
              marginTop: "12px",
              marginBottom: "5px",
            }}
          >
            movie name:{item.movieName}
            <br></br>
            person:{item.person}
            <br></br>
            price:{item.price}
            <br></br>
            {/* <button
              onClick={async () => {
                try {
                  await apiHit({
                    method: "delete",
                    url: `/movie-tickets/${item._id}`,
                  });
                  getAllMovieTickets();
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Delete Movie
            </button> */}
            <button
              onClick={() => {
                showAlert(
                  getAllMovieTickets,
                  `http://localhost:8000/movie-tickets/${item._id}`
                );
              }}
            >Delete</button>
            <button onClick={handelView(item)}>View movie ticket</button>
            <button onClick={handelEdit(item)}>Edit movie ticket</button>
            <button onClick={handelClick}>Click ME</button>
          </div>
        );
      })}
    </div>
  );
};

export default ReadAllMovieTicket;
