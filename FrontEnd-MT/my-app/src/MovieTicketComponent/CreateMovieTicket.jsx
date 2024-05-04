import React, { useEffect } from "react";
import MovieTicket from "./MovieTicket";
import { useCreateMovieTicketMutation } from "../services/api/movieTicketServices";

const CreateMovieTicket = () => {
  let [
    CreateMovieTicket,
    {
      isLoading: isLoadingCreateData,
      isSuccess: isSuccessCreateData,
      isError: isErrorCreateData,
      error: errorCreateData,
      data: dataCreateData,
    },
  ] = useCreateMovieTicketMutation();
  useEffect(() => {
    if (isSuccessCreateData) {
      console.log("successFully create.");
    }
  }, [isSuccessCreateData]);
  useEffect(() => {
    if (isErrorCreateData) {
      console.log(errorCreateData.error);
    }
  }, [isErrorCreateData, errorCreateData]);
  let onSubmit = async (values, other) => {
    let body = values;
    CreateMovieTicket(body);
  };
  return (
    <div
      style={{
        border: "solid red 2px",
        marginTop: "12px",
        marginBottom: "5px",
      }}
    >
      <MovieTicket
        buttonName="ok"
        onSubmit={onSubmit}
        isLoading={isLoadingCreateData}
      ></MovieTicket>
    </div>
  );
};

export default CreateMovieTicket;
