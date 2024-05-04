// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useDeleteMovieTicketMutation,
//   useReadMovieTicketQuery,
// } from "../services/api/movieTicketServices";

import { useEffect, useState } from "react";
import { useDeleteMovieTicketMutation, useReadMovieTicketQuery } from "../services/api/movieTicketServices";
import { useNavigate } from "react-router-dom";

const ShowAllMovieTicket = () => {
  let [deleteId, setDeleteId] = useState("");
  let {
    isError: isErrorReadMovieTicket,
    // isSuccess: isSuccessReadMovieTicket,
    isLoading: isLoadingReadMovieTicket,
    data: dataReadMovieTicket,
    error: errorReadMovieTicket,
  } = useReadMovieTicketQuery();
  console.log(dataReadMovieTicket,"******************************");
  let [
  deleteMovieTicket,
  {
    isError: isErrorDeleteMovieTicket,
    isSuccess: isSuccessDeleteMovieTicket,
    isLoading: isLoadingDeleteMovieTicket,
    data: dataDeleteMovieTicket,
    error: errorDeleteMovieTicket,
  },
  ] = useDeleteMovieTicketMutation();
    console.log(dataDeleteMovieTicket)
  useEffect(() => {
    if (isErrorReadMovieTicket) {
      console.log("****", errorReadMovieTicket?.error);
    }
  }, [isErrorReadMovieTicket, errorReadMovieTicket?.error]);

  useEffect(() => {
    if (isErrorDeleteMovieTicket) {
      console.log("****", errorDeleteMovieTicket?.error);
    }
  }, [isErrorDeleteMovieTicket, errorDeleteMovieTicket]);

  useEffect(() => {
    if (isSuccessDeleteMovieTicket) {
      console.log("movieTicket is deleted successfully");
    }
  }, [isSuccessDeleteMovieTicket]);

                 //                       let movieTickets = dataReadMovieTicket?.data?.result;
  let movieTickets = dataReadMovieTicket?.result || [];
  console.log("*******", movieTickets);
  let navigate = useNavigate();
  let handelView = (item) => {
    return () => {
       navigate(`/movieTickets/${item._id}`);
    };
  };
//   let handleClick = () => {
//     console.log("button is clicked");
//   };
  let handelEdit = (item) => {
    return () => {
       navigate(`/movieTickets/update/${item._id}`);
    };
  };

  return (
    <div>
      {isLoadingReadMovieTicket ? (
        <div>
          <h1>...Loading</h1>
        </div>
      ) : (
        <div>
          {movieTickets?.map((item, i) => {
            return (
              <div
                style={{
                  border: "solid red 5px",
                  marginTop: "12px",
                  marginBottom: "5px",
                }}
              >
                name:{item.movieName}
                <br></br>
                person:{item.person}
                price:{item.price}
                <br></br>
                <button
                  onClick={(e) => {
                    deleteMovieTicket(item._id);
                    setDeleteId(item._id);
                  }}
                >
                  {isLoadingDeleteMovieTicket && item._id === deleteId
                  ? "Deleting..."
                    : "Delete MovieTicket"}
                </button>
                <button onClick={handelView(item)}>View MovieTicket</button>
                <button onClick={handelEdit(item)}>Edit MovieTicket</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShowAllMovieTicket;

